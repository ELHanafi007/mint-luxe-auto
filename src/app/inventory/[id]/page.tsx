import { Metadata } from 'next';
import { vehicles } from '@/data/vehicles';
import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Mint0lux',
    };
  }

  return {
    title: `${vehicle.year} ${vehicle.brand} ${vehicle.name} | Mint0lux`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.year} ${vehicle.brand} ${vehicle.name}`,
      description: vehicle.description,
      images: [vehicle.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const vehicleIndex = vehicles.findIndex((v) => v.id === id);
  const vehicle = vehicles[vehicleIndex];

  if (!vehicle) {
    notFound();
  }

  const prevVehicle = vehicles[vehicleIndex - 1] || vehicles[vehicles.length - 1];
  const nextVehicle = vehicles[vehicleIndex + 1] || vehicles[0];

  return <ProductPageClient vehicle={vehicle} prevVehicle={prevVehicle} nextVehicle={nextVehicle} />;
}
