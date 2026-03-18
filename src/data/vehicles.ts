export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year: number;
  image: string;
  price: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
  };
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Ferrari',
    name: '812 Competizione',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000',
    price: 'Upon Request',
    specs: {
      engine: '6.5L V12',
      power: '819 HP',
      acceleration: '2.8s 0-100',
    },
  },
  {
    id: '2',
    brand: 'Porsche',
    name: '911 GT3 RS',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000',
    price: '$223,800',
    specs: {
      engine: '4.0L Flat-Six',
      power: '518 HP',
      acceleration: '3.2s 0-100',
    },
  },
  {
    id: '3',
    brand: 'Aston Martin',
    name: 'Valkyrie',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000',
    price: '$3,200,000',
    specs: {
      engine: '6.5L V12 Hybrid',
      power: '1,140 HP',
      acceleration: '2.5s 0-100',
    },
  },
  {
    id: '4',
    brand: 'Lamborghini',
    name: 'Revuelto',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000',
    price: 'Upon Request',
    specs: {
      engine: '6.5L V12 PHEV',
      power: '1,001 HP',
      acceleration: '2.5s 0-100',
    },
  },
];
