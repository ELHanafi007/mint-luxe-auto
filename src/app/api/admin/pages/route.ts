import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/admin/jwt';

const PAGES_PATH = path.join(process.cwd(), 'src/data/admin/pages.json');

function getPages() {
  try {
    const data = fs.readFileSync(PAGES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function savePages(pages: any) {
  fs.writeFileSync(PAGES_PATH, JSON.stringify(pages, null, 2));
}

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pages = getPages();
  return NextResponse.json(pages);
}

export async function PUT(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  const payload = token ? await verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key, data } = await request.json();
    const pages = getPages();
    
    pages[key] = data;
    savePages(pages);
    
    return NextResponse.json(pages[key]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}
