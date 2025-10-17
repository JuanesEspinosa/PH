import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Usuario } from '../types';

export class UserModel {
  static async findById(id: number): Promise<Usuario | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? (rows[0] as Usuario) : null;
  }

  static async findByEmail(email: string): Promise<Usuario | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows.length > 0 ? (rows[0] as Usuario) : null;
  }

  static async create(data: {
    nombre: string;
    email: string;
    password: string;
    rol?: 'admin' | 'usuario';
    avatar?: string;
  }): Promise<Usuario> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO usuarios (nombre, email, password, rol, avatar) VALUES (?, ?, ?, ?, ?)',
      [data.nombre, data.email, data.password, data.rol || 'usuario', data.avatar || null]
    );

    const user = await this.findById(result.insertId);
    if (!user) throw new Error('Error al crear usuario');
    return user;
  }

  static async updateResetToken(
    userId: number,
    resetToken: string | null,
    resetTokenExpiry: Date | null
  ): Promise<void> {
    await pool.query(
      'UPDATE usuarios SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      [resetToken, resetTokenExpiry, userId]
    );
  }

  static async findByResetToken(token: string): Promise<Usuario | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expiry > NOW()',
      [token]
    );
    return rows.length > 0 ? (rows[0] as Usuario) : null;
  }

  static async updatePassword(userId: number, newPassword: string): Promise<void> {
    await pool.query(
      'UPDATE usuarios SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
      [newPassword, userId]
    );
  }

  static async addTokenToBlacklist(
    token: string,
    userId: number,
    expiresAt: Date
  ): Promise<void> {
    await pool.query(
      'INSERT INTO token_blacklist (token, user_id, expires_at) VALUES (?, ?, ?)',
      [token, userId, expiresAt]
    );
  }
}

