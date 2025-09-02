// Repository Service - Handles GitHub repository operations
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

interface RepoInput {
  businessName: string;
  templateId: string;
  githubUrl: string;
}

class RepoService {
  // Get root directory (parent of backend directory)
  private getRootDir(): string {
    return path.join(process.cwd(), '..');
  }

  // Get templates directory in root
  private getTemplatesDir(): string {
    return path.join(this.getRootDir(), 'templates');
  }

  // Ensure templates directory exists
  private async ensureTemplatesDir(): Promise<void> {
    const templatesDir = this.getTemplatesDir();
    try {
      await fs.mkdir(templatesDir, { recursive: true });
      console.log(`📁 Templates directory ready: ${templatesDir}`);
    } catch (error) {
      console.error('Error creating templates directory:', error);
      throw new Error('Failed to create templates directory');
    }
  }

  // Clone GitHub repository to root/templates directory
  async cloneRepository(input: RepoInput, pageId: string): Promise<string> {
    try {
      await this.ensureTemplatesDir();
      
      const repoDir = path.join(this.getTemplatesDir(), `${pageId}`);
      
      console.log(`🔄 Cloning repository: ${input.githubUrl}`);
      console.log(`📍 Target directory: ${repoDir}`);
      
      await execAsync(`git clone ${input.githubUrl} ${repoDir}`);
      
      console.log(`✅ Repository cloned successfully to: ${repoDir}`);
      return repoDir;
    } catch (error) {
      console.error('Error cloning repository:', error);
      throw new Error(`Failed to clone repository: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Install dependencies in the cloned repository
  async installDependencies(repoDir: string): Promise<void> {
    try {
      console.log(`📦 Installing dependencies in: ${repoDir}`);
      
      // Check if package.json exists
      const packageJsonPath = path.join(repoDir, 'package.json');
      try {
        await fs.access(packageJsonPath);
      } catch {
        console.warn('⚠️  No package.json found, skipping dependency installation');
        return;
      }

      // Install dependencies using npm
      await execAsync('npm install', { cwd: repoDir });
      console.log('✅ Dependencies installed successfully');
    } catch (error) {
      console.error('Error installing dependencies:', error);
      throw new Error(`Failed to install dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Build the template project
  async buildTemplate(repoDir: string): Promise<void> {
    try {
      console.log(`🔨 Building template in: ${repoDir}`);
      
      // Check if package.json has build script
      const packageJsonPath = path.join(repoDir, 'package.json');
      try {
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
        if (!packageJson.scripts || !packageJson.scripts.build) {
          console.warn('⚠️  No build script found in package.json, skipping build');
          return;
        }
      } catch {
        console.warn('⚠️  Cannot read package.json, skipping build');
        return;
      }

      // Run build command
      await execAsync('npm run build', { cwd: repoDir });
      console.log('✅ Template built successfully');
    } catch (error) {
      console.error('Error building template:', error);
      throw new Error(`Failed to build template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Clean up repository directory
  async cleanupRepo(repoDir: string): Promise<void> {
    try {
      await execAsync(`rm -rf ${repoDir}`);
      console.log(`🗑️  Cleaned up directory: ${repoDir}`);
    } catch (error) {
      console.warn('Error cleaning up repo:', error);
    }
  }

  // Get repository status and info
  async getRepoInfo(repoDir: string): Promise<{ exists: boolean; hasPackageJson: boolean; hasBuildScript: boolean }> {
    try {
      // Check if directory exists
      await fs.access(repoDir);
      
      // Check for package.json
      const packageJsonPath = path.join(repoDir, 'package.json');
      let hasPackageJson = false;
      let hasBuildScript = false;
      
      try {
        await fs.access(packageJsonPath);
        hasPackageJson = true;
        
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
        hasBuildScript = !!(packageJson.scripts && packageJson.scripts.build);
      } catch {
        // Package.json doesn't exist or is invalid
      }
      
      return {
        exists: true,
        hasPackageJson,
        hasBuildScript
      };
    } catch {
      return {
        exists: false,
        hasPackageJson: false,
        hasBuildScript: false
      };
    }
  }
}

export const repoService = new RepoService();
