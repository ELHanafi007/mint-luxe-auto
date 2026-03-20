export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year: number;
  image: string;
  price: string;
  status: "Available" | "Sold" | "Reserved";
  isFeatured?: boolean;
  isBestSeller?: boolean;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    mileage: string;
    exteriorColor: string;
    interiorColor: string;
    driveTrain: string;
    fuelType: string;
  };
  description: string;
  gallery?: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: "ferrari-296-gtb-black-edition-2025",
    brand: "Ferrari",
    name: "296 GTB Black Edition",
    year: 2025,
    image: "/images/inventory/ferrari-296-gtb/ferrari-296-1.jpg",
    price: "$385,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "3.0L V6 Twin-Turbo Hybrid",
      power: "830 PS",
      acceleration: "2.9s 0-100 km/h",
      topSpeed: "330 km/h",
      transmission: "8-Speed Dual-Clutch",
      mileage: "12 km",
      exteriorColor: "Nero Daytona",
      interiorColor: "Nero Alcantara",
      driveTrain: "RWD",
      fuelType: "Hybrid"
    },
    description: "The Ferrari 296 GTB Black Edition represents a paradigm shift in the world of high-performance supercars. This late 2025 model, imported as new, features the first-ever V6 engine in a production Ferrari, combined with a powerful electric motor to deliver a staggering 830 PS. This specific Black Edition is finished in the deep, metallic Nero Daytona with a full carbon fiber package, offering a stealthy and aggressive presence on the road.",
    gallery: [
      "/images/inventory/ferrari-296-gtb/ferrari-296-2.jpg",
      "/images/inventory/ferrari-296-gtb/ferrari-296-3.jpg",
      "/images/inventory/ferrari-296-gtb/ferrari-296-4.jpg",
      "/images/inventory/ferrari-296-gtb/ferrari-296-5.jpg",
      "/images/inventory/ferrari-296-gtb/ferrari-296-6.jpg",
      "/images/inventory/ferrari-296-gtb/ferrari-296-7.jpg",
      "/images/inventory/ferrari-296-gtb/ferrari-296-8.jpg",
      "/images/inventory/ferrari-296-gtb/ferrari-296-9.jpg"
    ]
  },
  {
    id: "bentley-continental-gt-v8-hybrid-azure-2025",
    brand: "Bentley",
    name: "Continental GT V8 Hybrid Azure",
    year: 2025,
    image: "/images/inventory/bentley-continental/bentley-continental-1.jpg",
    price: "$345,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: true,
    specs: {
      engine: "4.0L V8 Twin-Turbo Hybrid",
      power: "782 PS",
      acceleration: "3.2s 0-100 km/h",
      topSpeed: "335 km/h",
      transmission: "8-Speed Dual-Clutch",
      mileage: "5,000 km",
      exteriorColor: "Azure Blue",
      interiorColor: "Linen / Imperial Blue",
      driveTrain: "AWD",
      fuelType: "Hybrid"
    },
    description: "A masterpiece of luxury and performance. This 2025 Bentley Continental GT V8 Hybrid Azure combines the effortless power of a twin-turbo V8 with advanced hybrid technology. Imported as new and with only 5,000km, it represents the pinnacle of grand touring, finished in the exclusive Azure specification for ultimate comfort and elegance.",
    gallery: [
      "/images/inventory/bentley-continental/bentley-continental-2.jpg",
      "/images/inventory/bentley-continental/bentley-continental-3.jpg",
      "/images/inventory/bentley-continental/bentley-continental-4.jpg",
      "/images/inventory/bentley-continental/bentley-continental-5.jpg",
      "/images/inventory/bentley-continental/bentley-continental-6.jpg",
      "/images/inventory/bentley-continental/bentley-continental-7.jpg",
      "/images/inventory/bentley-continental/bentley-continental-8.jpg",
      "/images/inventory/bentley-continental/bentley-continental-9.jpg",
      "/images/inventory/bentley-continental/bentley-continental-10.jpg",
      "/images/inventory/bentley-continental/bentley-continental-11.jpg"
    ]
  },
  {
    id: "lamborghini-urus-performante-2024",
    brand: "Lamborghini",
    name: "Urus Performante (Akrapovič Edition)",
    year: 2024,
    image: "/images/inventory/lamborghini-urus/urus-1.jpg",
    price: "$310,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "4.0L V8 Twin-Turbo",
      power: "666 PS",
      acceleration: "3.3s 0-100 km/h",
      topSpeed: "306 km/h",
      transmission: "8-Speed Automatic",
      mileage: "1,200 km",
      exteriorColor: "Grigio Telesto",
      interiorColor: "Nero Cosmus Alcantara",
      driveTrain: "AWD",
      fuelType: "Petrol"
    },
    description: "The Urus Performante raises the bar for Super SUV performance. This specific unit features the full Akrapovič titanium exhaust system, delivering an unmatched acoustic experience and increased performance. With its aggressive carbon fiber aero and track-tuned suspension, it is the ultimate expression of the Lamborghini SUV.",
    gallery: [
      "/images/inventory/lamborghini-urus/urus-2.jpg",
      "/images/inventory/lamborghini-urus/urus-3.jpg",
      "/images/inventory/lamborghini-urus/urus-4.jpg",
      "/images/inventory/lamborghini-urus/urus-5.jpg",
      "/images/inventory/lamborghini-urus/urus-6.jpg"
    ]
  },
  {
    id: "porsche-911-turbo-s-2023",
    brand: "Porsche",
    name: "911 Turbo S (992)",
    year: 2023,
    image: "/images/inventory/porsche-911/porsche-911-1.jpg",
    price: "$230,000",
    status: "Available",
    isFeatured: false,
    isBestSeller: true,
    specs: {
      engine: "3.7L Flat-6 Twin-Turbo",
      power: "650 PS",
      acceleration: "2.7s 0-100 km/h",
      topSpeed: "330 km/h",
      transmission: "8-Speed PDK",
      mileage: "1,930 km",
      exteriorColor: "GT Silver Metallic",
      interiorColor: "Bordeaux Red",
      driveTrain: "AWD",
      fuelType: "Petrol"
    },
    description: "Unmatched performance combined with daily usability. The 911 Turbo S remains the benchmark for all-weather, all-purpose supercars, offering a level of refinement that few can match.",
    gallery: [
      "/images/inventory/porsche-911/porsche-911-2.jpg",
      "/images/inventory/porsche-911/porsche-911-3.jpg"
    ]
  },
  {
    id: "aston-valkyrie-2021",
    brand: "Aston Martin",
    name: "Valkyrie",
    year: 2021,
    image: "https://images.unsplash.com/photo-1600706432502-77a0e2e3277e?auto=format&fit=crop&q=80&w=2070",
    price: "$3,200,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "6.5L V12 Naturally Aspirated",
      power: "1160 PS",
      acceleration: "2.5s 0-100 km/h",
      topSpeed: "402 km/h",
      transmission: "7-Speed Single-Clutch",
      mileage: "45 km",
      exteriorColor: "British Racing Green",
      interiorColor: "Pure Black Alcantara",
      driveTrain: "RWD",
      fuelType: "Hybrid"
    },
    description: "An F1 car for the road. The Valkyrie is the result of a partnership between Aston Martin and Red Bull Racing, designed by Adrian Newey to achieve aerodynamic performance previously thought impossible for a road car.",
    gallery: [
      "https://images.unsplash.com/photo-1600706432502-77a0e2e3277e?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1600706432502-77a0e2e3277e?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1600706432502-77a0e2e3277e?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "mercedes-amg-one-2023",
    brand: "Mercedes-AMG",
    name: "ONE",
    year: 2023,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070",
    price: "$2,750,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "1.6L V6 Turbo Hybrid (F1)",
      power: "1063 PS",
      acceleration: "2.9s 0-100 km/h",
      topSpeed: "352 km/h",
      transmission: "7-Speed Automated Manual",
      mileage: "24 km",
      exteriorColor: "High-Tech Silver",
      interiorColor: "Carbon Black",
      driveTrain: "AWD",
      fuelType: "Hybrid"
    },
    description: "The Mercedes-AMG ONE brings the world's most advanced racing technology to the street. With a genuine Formula 1 powertrain, it represents the most ambitious engineering project in AMG history.",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "rolls-royce-spectre-2025",
    brand: "Rolls-Royce",
    name: "Spectre",
    year: 2025,
    image: "/images/inventory/rolls-royce-spectre/spectre-1.jpg",
    price: "$420,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "Dual-Motor Electric",
      power: "584 PS",
      acceleration: "4.5s 0-100 km/h",
      topSpeed: "250 km/h",
      transmission: "Single-Speed",
      mileage: "16 km",
      exteriorColor: "Twilight Purple",
      interiorColor: "Grace White",
      driveTrain: "AWD",
      fuelType: "Electric"
    },
    description: "The first ultra-luxury electric super coupé. Spectre is a Rolls-Royce first, and an electric car second. It offers the same legendary ride quality with the silent, instant torque of electric propulsion.",
    gallery: [
      "/images/inventory/rolls-royce-spectre/spectre-2.jpg"
    ]
  },
  {
    id: "bugatti-chiron-pur-sport-2022",
    brand: "Bugatti",
    name: "Chiron Pur Sport",
    year: 2022,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070",
    price: "$3,600,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "8.0L W16 Quad-Turbo",
      power: "1500 PS",
      acceleration: "2.3s 0-100 km/h",
      topSpeed: "350 km/h",
      transmission: "7-Speed Dual-Clutch",
      mileage: "312 km",
      exteriorColor: "Atlantic Blue",
      interiorColor: "Beluga Black",
      driveTrain: "AWD",
      fuelType: "Petrol"
    },
    description: "Designed for lateral acceleration. The Chiron Pur Sport is the most agile member of the Chiron family, featuring shorter gear ratios and significant weight savings for unparalleled performance on winding roads.",
    gallery: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "mclaren-p1-2014",
    brand: "McLaren",
    name: "P1",
    year: 2014,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070",
    price: "$1,850,000",
    status: "Sold",
    isFeatured: false,
    isBestSeller: false,
    specs: {
      engine: "3.8L V8 Twin-Turbo Hybrid",
      power: "916 PS",
      acceleration: "2.8s 0-100 km/h",
      topSpeed: "350 km/h",
      transmission: "7-Speed SSG",
      mileage: "2,450 km",
      exteriorColor: "Volcano Orange",
      interiorColor: "Carbon Black",
      driveTrain: "RWD",
      fuelType: "Hybrid"
    },
    description: "The McLaren P1 was designed to be the best driver's car in the world on both road and track. As one of the 'Holy Trinity' of hypercars, it redefined what was possible with hybrid technology.",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "bentley-mulliner-bacalar-2021",
    brand: "Bentley",
    name: "Mulliner Bacalar",
    year: 2021,
    image: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&q=80&w=2070",
    price: "$1,900,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "6.0L W12 TSI",
      power: "659 PS",
      acceleration: "3.5s 0-100 km/h",
      topSpeed: "322 km/h",
      transmission: "8-Speed Dual-Clutch",
      mileage: "85 km",
      exteriorColor: "Yellow Flame",
      interiorColor: "Grey Tweed",
      driveTrain: "AWD",
      fuelType: "Petrol"
    },
    description: "The rarest two-door Bentley of the modern era. The Bacalar is a roofless Barchetta that marks a return to bespoke coachbuilding for Bentley Mulliner, with only 12 examples ever produced.",
    gallery: [
      "https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&q=80&w=2070"
    ]
  }

];
