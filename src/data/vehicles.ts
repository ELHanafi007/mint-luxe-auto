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
    transmission?: string;
    mileage?: string;
    exteriorColor?: string;
    interiorColor?: string;
  };
  description: string;
  gallery?: string[];
}

export const vehicles: Vehicle[] = [
  // FERRARI
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
      engine: "4.0L V8 Hybrid",
      power: "986 HP",
      acceleration: "2.4s",
      topSpeed: "211 mph",
      transmission: "8-Speed DCT",
      mileage: "450 miles",
      exteriorColor: "Rosso Corsa",
      interiorColor: "Nero"
    },
    description: "The SF90 Stradale is the first ever Ferrari to feature PHEV (Plug-in Hybrid Electric Vehicle) architecture which sees the internal combustion engine integrated with three electric motors. This masterpiece of engineering represents the ultimate expression of technology and performance."
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
      power: "759 HP",
      acceleration: "2.6s",
      topSpeed: "217 mph",
      transmission: "7-Speed ISR",
      mileage: "120 miles",
      exteriorColor: "Giallo Orion",
      interiorColor: "Alcantara Nero"
    },
    description: "Lamborghini created the Aventador SVJ to embrace challenges head-on, combining cutting-edge technology with extraordinary design. The SVJ stands for Superveloce Jota, a name that signifies speed and track performance dominance."
  },
  {
    id: "porsche-911-turbo-s-2023",
    brand: "Porsche",
    name: "911 Turbo S",
    year: 2023,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070",
    price: "$230,000",
    status: "Available",
    isFeatured: false,
    isBestSeller: true,
    specs: {
      engine: "3.7L Flat-6",
      power: "640 HP",
      acceleration: "2.6s",
      topSpeed: "205 mph",
      transmission: "8-Speed PDK",
      mileage: "1,200 miles",
      exteriorColor: "GT Silver",
      interiorColor: "Bordeaux Red"
    },
    description: "The Porsche 911 Turbo S is the benchmark for the everyday supercar. Exceptional performance meets daily usability in a package that has been refined over six decades."
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
      engine: "6.5L V12 Hybrid",
      power: "1146 HP",
      acceleration: "2.3s",
      topSpeed: "250 mph",
      transmission: "7-Speed Single Clutch",
      mileage: "0 miles",
      exteriorColor: "Aston Martin Racing Green",
      interiorColor: "Pure Black"
    },
    description: "Designed by Adrian Newey, the Valkyrie is an F1 car for the road. It uses an incredibly high-revving naturally aspirated V12 paired with a hybrid system for unparalleled performance."
  },
  {
    id: "mercedes-amg-one-2023",
    brand: "Mercedes",
    name: "AMG ONE",
    year: 2023,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070",
    price: "$2,750,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "1.6L V6 Hybrid",
      power: "1063 HP",
      acceleration: "2.6s",
      topSpeed: "219 mph",
      transmission: "7-Speed Automated Manual",
      mileage: "15 miles",
      exteriorColor: "High-Tech Silver",
      interiorColor: "Dinamica Microfiber"
    },
    description: "The Mercedes-AMG ONE brings current Formula 1 hybrid technology directly to the street. It features the actual engine from the championship-winning F1 car."
  },
  {
    id: "rolls-royce-spectre-2025",
    brand: "Rolls Royce",
    name: "Spectre",
    year: 2025,
    image: "https://images.unsplash.com/photo-1631214524020-5e1839765171?auto=format&fit=crop&q=80&w=2070",
    price: "$420,000",
    status: "Available",
    isFeatured: true,
    isBestSeller: false,
    specs: {
      engine: "Electric",
      power: "584 HP",
      acceleration: "4.4s",
      topSpeed: "155 mph",
      transmission: "Single Speed",
      mileage: "10 miles",
      exteriorColor: "Twilight Purple",
      interiorColor: "Grace White"
    },
    description: "Spectre is the first fully electric Rolls-Royce ever produced. It marks the beginning of a new era of ultra-luxury, combining the silent operation of electric power with the brand's legendary magic carpet ride."
  }
];
