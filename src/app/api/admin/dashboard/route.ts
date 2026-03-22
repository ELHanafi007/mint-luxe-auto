import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/admin/jwt';

const VEHICLES_PATH = path.join(process.cwd(), 'src/data/admin/vehicles.json');
const LOGS_PATH = path.join(process.cwd(), 'src/data/admin/logs.json');
const INQUIRIES_PATH = path.join(process.cwd(), 'src/data/admin/inquiries.json');

function getInquiries() {
  try {
    const data = fs.readFileSync(INQUIRIES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function getVehicles() {
  try {
    const data = fs.readFileSync(VEHICLES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

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

  const vehicles = getVehicles();
  const logs = getLogs();
  const inquiries = getInquiries();

  const totalVehicles = vehicles.length;
  
  // Calculate total inventory value
  const totalValue = vehicles.reduce((sum: number, v: any) => {
    const priceNum = parseInt(v.price.replace(/[^0-9]/g, '')) || 0;
    return sum + priceNum;
  }, 0);

  // Format total value (e.g., "$12.4M")
  let formattedValue = `$${(totalValue / 1000000).toFixed(1)}M`;
  if (totalValue < 1000000) {
    formattedValue = `$${(totalValue / 1000).toFixed(0)}K`;
  }

  // Count active inquiries (Status "New")
  const activeInquiries = inquiries.filter((i: any) => i.status === 'New').length;

  // Calculate trends (mock for now)
  const stats = [
    { 
      name: 'Total Vehicles', 
      value: totalVehicles.toString(), 
      change: '+2 this month', 
      trend: 'up', 
      color: '#3b82f6'
    },
    { 
      name: 'Inventory Value', 
      value: formattedValue, 
      change: '+15.2%', 
      trend: 'up', 
      color: '#10b981'
    },
    { 
      name: 'Active Inquiries', 
      value: activeInquiries.toString(), 
      change: activeInquiries > 0 ? `+${activeInquiries} new` : 'No new', 
      trend: activeInquiries > 0 ? 'up' : 'neutral', 
      color: '#f59e0b'
    },
    { 
      name: 'Total Sales', 
      value: vehicles.filter((v: any) => v.status === 'Sold').length.toString(), 
      change: '+4 this month', 
      trend: 'up', 
      color: '#8b5cf6'
    },
  ];

  // Get recent activity
  const recentActivity = logs.slice(0, 5).map((log: any) => ({
    id: log.id,
    user: log.user,
    action: log.action,
    timestamp: log.timestamp,
    type: log.action.includes('Created') ? 'create' : log.action.includes('Deleted') ? 'delete' : 'update'
  }));

  // Get recent inquiries
  const recentInquiries = inquiries
    .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 4);

  // Mock system health
  const systemHealth = {
    storage: 42,
    latency: 124,
    status: 'operational'
  };

  return NextResponse.json({
    stats,
    recentActivity,
    recentInquiries,
    systemHealth
  });
}
