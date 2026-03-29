import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/admin/vehicles.json');

function getVehicles() {
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(data);
}

function saveVehicles(vehicles: any[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(vehicles, null, 2));
}

// GET: List all vehicles
export async function GET() {
  try {
    const vehicles = getVehicles();
    return NextResponse.json(vehicles);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

// POST: Create new vehicle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vehicles = getVehicles();
    
    const newVehicle = {
      ...body,
      id: body.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    
    vehicles.unshift(newVehicle);
    saveVehicles(vehicles);
    
    return NextResponse.json(newVehicle);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create asset' }, { status: 500 });
  }
}

// PUT: Update existing vehicle
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const vehicles = getVehicles();
    const index = vehicles.findIndex((v: any) => v.id === body.id);
    
    if (index === -1) return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    
    vehicles[index] = { ...vehicles[index], ...body };
    saveVehicles(vehicles);
    
    return NextResponse.json(vehicles[index]);
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE: Remove vehicle
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  try {
    const vehicles = getVehicles();
    const filtered = vehicles.filter((v: any) => v.id !== id);
    saveVehicles(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}
