import bcrypt from 'bcrypt';
import { db } from '../lib/db.js';
import { AppError } from '../lib/app-error.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from '../middlewares/auth.js';

const SALT_ROUNDS = 12;

export async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }

  const payload = { userId: user.id, email: user.email };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
    user: { id: user.id, email: user.email, name: user.name },
  };
}

export async function refresh(refreshToken: string) {
  try {
    const payload = verifyToken(refreshToken);
    const user = await db.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      throw new AppError('User not found', 401, 'UNAUTHORIZED');
    }
    const newPayload = { userId: user.id, email: user.email };
    return {
      accessToken: signAccessToken(newPayload),
      refreshToken: signRefreshToken(newPayload),
    };
  } catch {
    throw new AppError('Invalid refresh token', 401, 'INVALID_TOKEN');
  }
}

export async function getMe(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  });
  if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  return user;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}
