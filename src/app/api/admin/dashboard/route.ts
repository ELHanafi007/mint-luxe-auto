import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a slight delay for luxury skeleton loaders
  await new Promise((resolve) => setTimeout(resolve, 800));

  const data = {
    stats: [
      { name: "Asset Value Under Management", value: "$47.2M", change: "+12%", trend: "up", color: "#C5A165" },
      { name: "Active Inventory", value: "23", change: "+2", trend: "up", color: "#C5A165" },
      { name: "Active Inquiries", value: "14", change: "-3", trend: "down", color: "#C5A165" },
      { name: "Sales Velocity (30d)", value: "$8.4M", change: "+22%", trend: "up", color: "#C5A165" }
    ],
    globalValuationTicker: "$47,200,842",
    weeklySales: [
      { day: "Mon", sales: 320000 },
      { day: "Tue", sales: 450000 },
      { day: "Wed", sales: 120000 },
      { day: "Thu", sales: 890000 },
      { day: "Fri", sales: 2300000 },
      { day: "Sat", sales: 1100000 },
      { day: "Sun", sales: 950000 }
    ],
    inventoryByBrand: [
      { brand: "Ferrari", count: 8 },
      { brand: "Lamborghini", count: 5 },
      { brand: "Porsche", count: 4 },
      { brand: "Aston Martin", count: 3 },
      { brand: "Bugatti", count: 3 }
    ],
    inventoryStatus: { showroom: 12, inTransit: 6, sourcing: 3, reserved: 2 },
    recentActivity: [
      { id: "1", action: "Inventory Updated", user: "Julian Vance", timestamp: "12 mins ago", type: "update" },
      { id: "2", action: "New Inquiry: SF90", user: "Lead Gen", timestamp: "45 mins ago", type: "create" },
      { id: "3", action: "Asset Sold: 911 GT3", user: "Julian Vance", timestamp: "2 hours ago", type: "delete" },
      { id: "4", action: "Valuation Adjusted", user: "System", timestamp: "4 hours ago", type: "update" }
    ],
    recentInquiries: [
      { id: "101", name: "Alexander Sterling", interest: "Ferrari Valkyrie", timestamp: "2026-03-29T10:00:00Z", status: "New", phone: "+44 20 7946 0123", email: "a.sterling@private.com" },
      { id: "102", name: "Isabella Rossi", interest: "Lambo Revuelto", timestamp: "2026-03-29T09:15:00Z", status: "New", phone: "+39 02 1234 5678", email: "i.rossi@luxury.it" },
      { id: "103", name: "Kenji Tanaka", interest: "Bugatti Mistral", timestamp: "2026-03-28T22:30:00Z", status: "Replied", phone: "+81 3 4567 8901", email: "tanaka@heritage.jp" }
    ],
    systemHealth: { storage: 34, latency: 87, status: "operational" },
    maintenanceAlerts: [
      { vehicle: "2022 Ferrari SF90", alert: "Battery tender required" },
      { vehicle: "2024 Rolls Royce Spectre", alert: "Tire pressure check" }
    ]
  };

  return NextResponse.json(data);
}
