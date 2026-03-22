import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/admin/jwt';
import fs from 'fs';
import path from 'path';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@mint0lux.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('mint0lux-default-pass', 10);

function logAction(action: string, user: string) {
  const logsPath = path.join(process.cwd(), 'src/data/admin/logs.json');
  try {
    const logs = JSON.parse(fs.readFileSync(logsPath, 'utf8'));
    logs.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      user,
      action
    });
    fs.writeFileSync(logsPath, JSON.stringify(logs.slice(0, 100), null, 2));
  } catch (err) {
    console.error('Error logging action:', err);
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ email });
    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200, // 2 hours
      path: '/',
    });

    logAction('Admin logged in', email);

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
