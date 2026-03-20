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
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070",
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
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "ferrari-sf90-stradale-2023",
    brand: "Ferrari",
    name: "SF90 Stradale",
    year: 2023,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2070",
    price: "$625,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: true,
    specs: {
      engine: "4.0L V8 Twin-Turbo Hybrid",
      power: "1000 PS",
      acceleration: "2.5s 0-100 km/h",
      topSpeed: "340 km/h",
      transmission: "8-Speed Dual-Clutch",
      mileage: "720 km",
      exteriorColor: "Rosso Corsa",
      interiorColor: "Nero Alcantara",
      driveTrain: "AWD",
      fuelType: "Hybrid"
    },
    description: "The SF90 Stradale is the first ever Ferrari to feature PHEV (Plug-in Hybrid Electric Vehicle) architecture. This masterpiece of engineering represents the ultimate expression of technology and performance, delivering unprecedented power for a series-production car.",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "lambo-aventador-svj-2023",
    brand: "Lamborghini",
    name: "Aventador SVJ",
    year: 2023,
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=2070",
    price: "$520,000",
    status: "Reserved",
    isFeatured: true,
    isBestSeller: true,
    specs: {
      engine: "6.5L V12",
      power: "770 PS",
      acceleration: "2.8s 0-100 km/h",
      topSpeed: "350 km/h",
      transmission: "7-Speed ISR",
      mileage: "195 km",
      exteriorColor: "Giallo Orion",
      interiorColor: "Nero Ade",
      driveTrain: "AWD",
      fuelType: "Petrol"
    },
    description: "The Aventador SVJ is the most iconic member of the Aventador family. The 'Superveloce Jota' designation signifies its track-focused performance, holding the Nürburgring Nordschleife record for production cars at launch.",
    gallery: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "porsche-911-turbo-s-2023",
    brand: "Porsche",
    name: "911 Turbo S (992)",
    year: 2023,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070",
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
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&q=80&w=2070"
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
    image: "https://images.unsplash.com/photo-1631214524020-5e1839765171?auto=format&fit=crop&q=80&w=2070",
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
      "https://images.unsplash.com/photo-1631214524020-5e1839765171?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1631214524020-5e1839765171?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1631214524020-5e1839765171?auto=format&fit=crop&q=80&w=2070"
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
