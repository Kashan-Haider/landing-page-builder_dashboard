// Environment Service - Handles .env file generation and management
import fs from 'fs/promises';
import path from 'path';

class EnvService {
  // Generate .env file content with required variables
  generateEnvContent(templateId: string, pageId: string): string {
    return `DATABASE_URL=postgresql://admin:admin@localhost:5432/cms_dashboard_db?schema=public
PORT=3000
NEXT_PUBLIC_TEMPLATE_ID=${templateId}
NEXT_PUBLIC_ID=${pageId}
`;
  }

  // Write .env file to specified directory
  async writeEnvFile(repoDir: string, templateId: string, pageId: string): Promise<void> {
    try {
      const envContent = this.generateEnvContent(templateId, pageId);
      const envPath = path.join(repoDir, '.env');
      await fs.writeFile(envPath, envContent, 'utf8');
      console.log(`✅ .env file created at: ${envPath}`);
    } catch (error) {
      console.error('Error writing .env file:', error);
      throw new Error(`Failed to create .env file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const envService = new EnvService();
