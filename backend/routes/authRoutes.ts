// Authentication routes for admin login
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ApiResponse } from '../types';
import { handleServiceError } from '../middleware/errorHandler';

const router = express.Router();
const prisma = new PrismaClient();

// Admin login endpoint
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        error: 'Email and password are required',
        message: 'Missing credentials'
      };
      return res.status(400).json(response);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        message: 'User not found'
      };
      return res.status(401).json(response);
    }

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied',
        message: 'Admin access required'
      };
      return res.status(403).json(response);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        message: 'Incorrect password'
      };
      return res.status(401).json(response);
    }

    // Generate role-specific JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        tokenType: 'ADMIN'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const response: ApiResponse = {
      success: true,
      message: 'Admin login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Admin login error:', error);
    handleServiceError(error, res, 'Admin login failed');
  }
});

// Employee login endpoint
router.post('/employee/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        error: 'Email and password are required',
        message: 'Missing credentials'
      };
      return res.status(400).json(response);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        message: 'User not found'
      };
      return res.status(401).json(response);
    }

    // Check if user is employee
    if (user.role !== 'EMPLOYEE') {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied',
        message: 'Employee access required'
      };
      return res.status(403).json(response);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        message: 'Incorrect password'
      };
      return res.status(401).json(response);
    }

    // Generate role-specific JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        tokenType: 'EMPLOYEE'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const response: ApiResponse = {
      success: true,
      message: 'Employee login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Employee login error:', error);
    handleServiceError(error, res, 'Employee login failed');
  }
});

// Client login endpoint
router.post('/client/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        error: 'Email and password are required',
        message: 'Missing credentials'
      };
      return res.status(400).json(response);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        message: 'User not found'
      };
      return res.status(401).json(response);
    }

    // Check if user is client
    if (user.role !== 'CLIENT') {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied',
        message: 'Client access required'
      };
      return res.status(403).json(response);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        message: 'Incorrect password'
      };
      return res.status(401).json(response);
    }

    // Generate role-specific JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        tokenType: 'CLIENT'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const response: ApiResponse = {
      success: true,
      message: 'Client login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Client login error:', error);
    handleServiceError(error, res, 'Client login failed');
  }
});

// Create admin user endpoint (for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        error: 'Email and password are required',
        message: 'Missing credentials'
      };
      return res.status(400).json(response);
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      const response: ApiResponse = {
        success: false,
        error: 'Admin already exists',
        message: 'Only one admin user is allowed'
      };
      return res.status(409).json(response);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Admin user created successfully',
      data: {
        user: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        }
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create admin error:', error);
    handleServiceError(error, res, 'Failed to create admin user');
  }
});

// Token verification endpoint
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
        message: 'Authorization header missing'
      };
      return res.status(401).json(response);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Check if token is empty or malformed
    if (!token || token.trim() === '') {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid token',
        message: 'Token is empty'
      };
      return res.status(401).json(response);
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    } catch (jwtError: any) {
      console.error('JWT verification error:', jwtError.message);
      const response: ApiResponse = {
        success: false,
        error: 'JWT malformed',
        message: `Token verification failed: ${jwtError.message}`
      };
      return res.status(401).json(response);
    }

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found',
        message: 'User associated with token no longer exists'
      };
      return res.status(401).json(response);
    }

    // Validate token type matches user role
    if (decoded.tokenType !== user.role) {
      const response: ApiResponse = {
        success: false,
        error: 'Token role mismatch',
        message: 'Token role does not match user role'
      };
      return res.status(401).json(response);
    }

    console.log('Token verification successful for user:', { id: user.id, email: user.email, role: user.role });
    
    const response: ApiResponse<{ user: { id: string; email: string; role: string } }> = {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    };
    res.json(response);

  } catch (error) {
    console.error('Token verification error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Invalid token',
      message: 'Token verification failed'
    };
    res.status(401).json(response);
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
        message: 'Authorization header missing'
      };
      return res.status(401).json(response);
    }

    const token = authHeader.substring(7);
    
    // Check if token is empty or malformed
    if (!token || token.trim() === '') {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid token',
        message: 'Token is empty'
      };
      return res.status(401).json(response);
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    } catch (jwtError: any) {
      console.error('JWT verification error:', jwtError.message);
      const response: ApiResponse = {
        success: false,
        error: 'JWT malformed',
        message: `Token verification failed: ${jwtError.message}`
      };
      return res.status(401).json(response);
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied',
        message: 'Admin access required'
      };
      return res.status(403).json(response);
    }

    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Users retrieved successfully',
      data: { users }
    };

    res.json(response);
  } catch (error) {
    console.error('Get users error:', error);
    handleServiceError(error, res, 'Failed to retrieve users');
  }
});

// Create new user (admin only)
router.post('/users', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
        message: 'Authorization header missing'
      };
      return res.status(401).json(response);
    }

    const token = authHeader.substring(7);
    
    // Check if token is empty or malformed
    if (!token || token.trim() === '') {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid token',
        message: 'Token is empty'
      };
      return res.status(401).json(response);
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    } catch (jwtError: any) {
      console.error('JWT verification error:', jwtError.message);
      const response: ApiResponse = {
        success: false,
        error: 'JWT malformed',
        message: `Token verification failed: ${jwtError.message}`
      };
      return res.status(401).json(response);
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied',
        message: 'Admin access required'
      };
      return res.status(403).json(response);
    }

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields',
        message: 'Email, password, and role are required'
      };
      return res.status(400).json(response);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        error: 'User already exists',
        message: 'A user with this email already exists'
      };
      return res.status(409).json(response);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'User created successfully',
      data: { user: newUser }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create user error:', error);
    handleServiceError(error, res, 'Failed to create user');
  }
});

// Update user (admin only)
router.put('/users/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
        message: 'Authorization header missing'
      };
      return res.status(401).json(response);
    }

    const token = authHeader.substring(7);
    
    // Check if token is empty or malformed
    if (!token || token.trim() === '') {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid token',
        message: 'Token is empty'
      };
      return res.status(401).json(response);
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    } catch (jwtError: any) {
      console.error('JWT verification error:', jwtError.message);
      const response: ApiResponse = {
        success: false,
        error: 'JWT malformed',
        message: `Token verification failed: ${jwtError.message}`
      };
      return res.status(401).json(response);
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied',
        message: 'Admin access required'
      };
      return res.status(403).json(response);
    }

    const { id } = req.params;
    const { email, role, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found',
        message: 'User does not exist'
      };
      return res.status(404).json(response);
    }

    // Prepare update data
    const updateData: any = {};
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'User updated successfully',
      data: { user: updatedUser }
    };

    res.json(response);
  } catch (error) {
    console.error('Update user error:', error);
    handleServiceError(error, res, 'Failed to update user');
  }
});

// Delete user (admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
        message: 'Authorization header missing'
      };
      return res.status(401).json(response);
    }

    const token = authHeader.substring(7);
    
    // Check if token is empty or malformed
    if (!token || token.trim() === '') {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid token',
        message: 'Token is empty'
      };
      return res.status(401).json(response);
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    } catch (jwtError: any) {
      console.error('JWT verification error:', jwtError.message);
      const response: ApiResponse = {
        success: false,
        error: 'JWT malformed',
        message: `Token verification failed: ${jwtError.message}`
      };
      return res.status(401).json(response);
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied',
        message: 'Admin access required'
      };
      return res.status(403).json(response);
    }

    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === decoded.userId) {
      const response: ApiResponse = {
        success: false,
        error: 'Cannot delete yourself',
        message: 'You cannot delete your own account'
      };
      return res.status(400).json(response);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found',
        message: 'User does not exist'
      };
      return res.status(404).json(response);
    }

    // Delete user
    await prisma.user.delete({
      where: { id }
    });

    const response: ApiResponse = {
      success: true,
      message: 'User deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Delete user error:', error);
    handleServiceError(error, res, 'Failed to delete user');
  }
});

// Change password (authenticated user)
router.put('/change-password', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
        message: 'Authorization header missing'
      };
      return res.status(401).json(response);
    }

    const token = authHeader.substring(7);
    
    // Check if token is empty or malformed
    if (!token || token.trim() === '') {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid token',
        message: 'Token is empty'
      };
      return res.status(401).json(response);
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    } catch (jwtError: any) {
      console.error('JWT verification error:', jwtError.message);
      const response: ApiResponse = {
        success: false,
        error: 'JWT malformed',
        message: `Token verification failed: ${jwtError.message}`
      };
      return res.status(401).json(response);
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields',
        message: 'Current password and new password are required'
      };
      return res.status(400).json(response);
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found',
        message: 'User does not exist'
      };
      return res.status(404).json(response);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid current password',
        message: 'Current password is incorrect'
      };
      return res.status(400).json(response);
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedNewPassword }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Password changed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Change password error:', error);
    handleServiceError(error, res, 'Failed to change password');
  }
});

export default router;
