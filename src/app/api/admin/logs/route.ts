import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/admin/jwt';

const LOGS_PATH = path.join(process.cwd(), 'src/data/admin/logs.json');

function getLogs() {
  try {
    const data = fs.readFileSync(LOGS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const logs = getLogs();
  return NextResponse.json(logs);
}
