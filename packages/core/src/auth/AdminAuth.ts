import { AdminSchema } from '../config/admin'
import jwt from 'jsonwebtoken'

export class AdminAuth {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
  private static readonly TOKEN_EXPIRY = '24h'

  static async validateAdmin(credentials: {
    username: string
    password: string
  }) {
    // In production, replace with secure database lookup
    const isValid = credentials.username === 'superadmin' && 
                    credentials.password === process.env.ADMIN_PASSWORD
    
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    return this.generateToken(credentials.username)
  }

  static generateToken(username: string) {
    return jwt.sign(
      { username, role: 'SUPER_ADMIN' },
      this.JWT_SECRET,
      { expiresIn: this.TOKEN_EXPIRY }
    )
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}