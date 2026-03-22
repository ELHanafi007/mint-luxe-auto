import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/admin/jwt';

const INQUIRIES_PATH = path.join(process.cwd(), 'src/data/admin/inquiries.json');

function getInquiries() {
  try {
    const data = fs.readFileSync(INQUIRIES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveInquiries(inquiries: any) {
  fs.writeFileSync(INQUIRIES_PATH, JSON.stringify(inquiries, null, 2));
}

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

export async function PUT(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    let inquiries = getInquiries();
    
    const index = inquiries.findIndex((i: any) => i.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    
    inquiries[index].status = status;
    saveInquiries(inquiries);
    
    return NextResponse.json(inquiries[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    let inquiries = getInquiries();
    inquiries = inquiries.filter((i: any) => i.id !== id);
    saveInquiries(inquiries);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
