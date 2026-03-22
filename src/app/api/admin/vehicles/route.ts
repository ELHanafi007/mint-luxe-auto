import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/admin/jwt';

const VEHICLES_PATH = path.join(process.cwd(), 'src/data/admin/vehicles.json');
const LOGS_PATH = path.join(process.cwd(), 'src/data/admin/logs.json');

function getVehicles() {
  try {
    const data = fs.readFileSync(VEHICLES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveVehicles(vehicles: any) {
  fs.writeFileSync(VEHICLES_PATH, JSON.stringify(vehicles, null, 2));
}

function logAction(action: string, user: string) {
  try {
    const logs = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf8'));
    logs.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      user,
      action
    });
    fs.writeFileSync(LOGS_PATH, JSON.stringify(logs.slice(0, 100), null, 2));
  } catch (err) {}
}

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vehicles = getVehicles();
  return NextResponse.json(vehicles);
}

export async function POST(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  const payload = token ? await verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const vehicle = await request.json();
    const vehicles = getVehicles();
    
    const newVehicle = {
      ...vehicle,
      id: vehicle.id || `${vehicle.brand.toLowerCase()}-${vehicle.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    vehicles.push(newVehicle);
    saveVehicles(vehicles);
    
    logAction(`Created vehicle: ${newVehicle.brand} ${newVehicle.name}`, (payload as any).email);
    
    return NextResponse.json(newVehicle);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  const payload = token ? await verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedVehicle = await request.json();
    let vehicles = getVehicles();
    
    const index = vehicles.findIndex((v: any) => v.id === updatedVehicle.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    
    vehicles[index] = { ...vehicles[index], ...updatedVehicle, updatedAt: new Date().toISOString() };
    saveVehicles(vehicles);
    
    logAction(`Updated vehicle: ${updatedVehicle.brand} ${updatedVehicle.name}`, (payload as any).email);
    
    return NextResponse.json(vehicles[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  const payload = token ? await verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    let vehicles = getVehicles();
    const vehicle = vehicles.find((v: any) => v.id === id);
    
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    
    vehicles = vehicles.filter((v: any) => v.id !== id);
    saveVehicles(vehicles);
    
    logAction(`Deleted vehicle: ${vehicle.brand} ${vehicle.name}`, (payload as any).email);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
