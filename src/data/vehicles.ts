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
    topSpeed?: string;
    torque?: string;
  };
  description?: string;
}

export const vehicles: Vehicle[] = [
  // FERRARI
  {
    id: "ferrari_sf90_1",
    brand: "Ferrari",
    name: "SF90 Stradale",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/2019_Ferrari_SF90_Stradale.jpg",
    price: "$625,000",
    specs: {
      engine: "4.0L V8 Hybrid",
      power: "986 HP",
      acceleration: "2.4s 0-60",
      topSpeed: "211 mph"
    }
  },
  {
    id: "ferrari_f8_1",
    brand: "Ferrari",
    name: "F8 Tributo",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/13/2020_Ferrari_F8_Tributo_in_yellow%2C_front_right_%28Amagansett%29.jpg",
    price: "$280,000",
    specs: {
      engine: "3.9L V8",
      power: "710 HP",
      acceleration: "2.9s 0-60",
      topSpeed: "211 mph"
    }
  },
  {
    id: "ferrari_812_1",
    brand: "Ferrari",
    name: "812 Superfast",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Ferrari_812_Superfast_IMG_0798.jpg",
    price: "$345,000",
    specs: {
      engine: "6.5L V12",
      power: "789 HP",
      acceleration: "2.8s 0-60",
      topSpeed: "211 mph"
    }
  },
  {
    id: "ferrari_laferrari_1",
    brand: "Ferrari",
    name: "LaFerrari",
    year: 2015,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/LaFerrari_front.jpg",
    price: "$2,200,000",
    specs: {
      engine: "6.3L V12 Hybrid",
      power: "949 HP",
      acceleration: "2.4s 0-60",
      topSpeed: "217 mph"
    }
  },
  // LAMBORGHINI
  {
    id: "lambo_aventador_1",
    brand: "Lamborghini",
    name: "Aventador SVJ",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Lamborghini_Aventador_SVJ.jpg",
    price: "$520,000",
    specs: {
      engine: "6.5L V12",
      power: "759 HP",
      acceleration: "2.6s 0-60",
      topSpeed: "217 mph"
    }
  },
  {
    id: "lambo_sian_1",
    brand: "Lamborghini",
    name: "Sian FKP 37",
    year: 2022,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Lamborghini_Sian_at_IAA_2019_IMG_0332.jpg",
    price: "$3,600,000",
    specs: {
      engine: "6.5L V12 Hybrid",
      power: "807 HP",
      acceleration: "2.5s 0-60",
      topSpeed: "217 mph"
    }
  },
  {
    id: "lambo_veneno_1",
    brand: "Lamborghini",
    name: "Veneno",
    year: 2013,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Lamborghini_Veneno_left_side.jpg",
    price: "$4,500,000",
    specs: {
      engine: "6.5L V12",
      power: "740 HP",
      acceleration: "2.8s 0-60",
      topSpeed: "221 mph"
    }
  },
  // PORSCHE
  {
    id: "porsche_911_1",
    brand: "Porsche",
    name: "911 Turbo S",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Porsche_992_Turbo_S_IMG_3352.jpg",
    price: "$230,000",
    specs: {
      engine: "3.7L Flat-6",
      power: "640 HP",
      acceleration: "2.6s 0-60",
      topSpeed: "205 mph"
    }
  },
  {
    id: "porsche_918_1",
    brand: "Porsche",
    name: "918 Spyder",
    year: 2015,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Porsche_918_Spyder_black.jpg",
    price: "$845,000",
    specs: {
      engine: "4.6L V8 Hybrid",
      power: "875 HP",
      acceleration: "2.2s 0-60",
      topSpeed: "214 mph"
    }
  },
  {
    id: "porsche_carrera_gt",
    brand: "Porsche",
    name: "Carrera GT",
    year: 2006,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Porsche_Carrera_GT_%28front%29.jpg",
    price: "$1,500,000",
    specs: {
      engine: "5.7L V10",
      power: "603 HP",
      acceleration: "3.5s 0-60",
      topSpeed: "205 mph"
    }
  },
  // MERCEDES
  {
    id: "mercedes_amg_one_1",
    brand: "Mercedes",
    name: "AMG ONE",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/05/2023_Mercedes_AMG_One.jpg",
    price: "$2,750,000",
    specs: {
      engine: "1.6L V6 Hybrid",
      power: "1063 HP",
      acceleration: "2.6s 0-60",
      topSpeed: "219 mph"
    }
  },
  {
    id: "mercedes_amg_gt_black_1",
    brand: "Mercedes",
    name: "AMG GT Black Series",
    year: 2021,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/2021_Mercedes-AMG_GT_Black_Series.jpg",
    price: "$335,000",
    specs: {
      engine: "4.0L V8",
      power: "720 HP",
      acceleration: "3.1s 0-60",
      topSpeed: "202 mph"
    }
  },
  // ASTON MARTIN
  {
    id: "aston_valkyrie_1",
    brand: "Aston Martin",
    name: "Valkyrie",
    year: 2021,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/AstonMartin_Valkyrie.jpg",
    price: "$3,200,000",
    specs: {
      engine: "6.5L V12 Hybrid",
      power: "1146 HP",
      acceleration: "2.3s 0-60",
      topSpeed: "250 mph"
    }
  },
  {
    id: "aston_victor_1",
    brand: "Aston Martin",
    name: "Victor",
    year: 2020,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/2020_Aston_Martin_Victor.jpg",
    price: "$1,500,000",
    specs: {
      engine: "7.3L V12",
      power: "827 HP",
      acceleration: "3.5s 0-60",
      topSpeed: "200 mph"
    }
  },
  // ROLLS ROYCE
  {
    id: "rolls_spectre_1",
    brand: "Rolls Royce",
    name: "Spectre Black Badge",
    year: 2025,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/2024_Rolls-Royce_Spectre.jpg",
    price: "$420,000",
    specs: {
      engine: "Electric",
      power: "650 HP",
      acceleration: "4.1s 0-60",
      topSpeed: "155 mph"
    }
  },
  // BRABUS
  {
    id: "brabus_900_rocket_1",
    brand: "Brabus",
    name: "900 Rocket Edition",
    year: 2021,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Brabus_900_Rocket_Edition_IAA_2021_1X7A0145.jpg",
    price: "$575,000",
    specs: {
      engine: "4.5L V8",
      power: "888 HP",
      acceleration: "3.7s 0-60",
      topSpeed: "174 mph"
    }
  }
];
