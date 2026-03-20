import { NextResponse } from 'next/server';
import { vehicles } from '@/data/vehicles';

export async function GET(request: Request) {
  const password = request.headers.get('x-admin-password');
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(vehicles);
}

export async function POST(request: Request) {
  const password = request.headers.get('x-admin-password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vehicle = await request.json();
  // In a real app with Supabase, you would perform an INSERT here.
  // For now, we'll simulate success since data is currently static.
  console.log('New Acquisition Protocol:', vehicle);
  
  return NextResponse.json({ success: true, vehicle });
}

export async function PUT(request: Request) {
  const password = request.headers.get('x-admin-password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vehicle = await request.json();
  console.log('Asset Update Protocol:', vehicle);
  
  return NextResponse.json({ success: true, vehicle });
}

export async function DELETE(request: Request) {
  const password = request.headers.get('x-admin-password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();
  console.log('Asset Decommission Protocol:', id);
  
  return NextResponse.json({ success: true });
}
