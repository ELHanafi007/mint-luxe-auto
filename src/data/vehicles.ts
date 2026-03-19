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
    image: "https://media.ferrari.com/cdn-cgi/image/format=webp,width=1200/media/cms/vehicle/sf90-stradale/hero.jpg",
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
    image: "https://media.ferrari.com/cdn-cgi/image/format=webp,width=1200/media/cms/vehicle/f8-tributo/hero.jpg",
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
    image: "https://media.ferrari.com/cdn-cgi/image/format=webp,width=1200/media/cms/vehicle/812-superfast/hero.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2013/03/ferrari-laferrari-1.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2018/08/lamborghini-aventador-svj-1.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2019/09/lamborghini-sian-1.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2013/03/lamborghini-veneno-1.jpg",
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
    image: "https://files.porsche.com/filestore/image/multimedia/none/992-1tus-modelimage-sideshot/model/391d9da2-3f0d-11eb-80d0-005056bbdc38/porsche-992-1tus-modelimage-sideshot.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2015/03/porsche-918-spyder-1.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2004/01/porsche-carrera-gt-1.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2022/06/mercedes-amg-one-1.jpg",
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
    image: "https://robbreport.com/wp-content/uploads/2020/07/mercedes-amg-gt-black-series-1.jpg",
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
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000",
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
    image: "https://robbreport.com/wp-content/uploads/2020/09/aston-martin-victor-1.jpg",
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
    image: "https://images.unsplash.com/photo-1631214524020-5e1839765171?auto=format&fit=crop&q=80&w=1000",
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
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000",
    price: "$575,000",
    specs: {
      engine: "4.5L V8",
      power: "888 HP",
      acceleration: "3.7s 0-60",
      topSpeed: "174 mph"
    }
  }
];
