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
    transmission?: string;
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
      engine: "4.0L Twin-Turbo V8 Hybrid",
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
      engine: "3.9L Twin-Turbo V8",
      power: "710 HP",
      acceleration: "2.9s 0-60",
      topSpeed: "211 mph"
    }
  },
  {
    id: "ferrari_296_1",
    brand: "Ferrari",
    name: "296 GTB",
    year: 2023,
    image: "https://media.ferrari.com/cdn-cgi/image/format=webp,width=1200/media/cms/vehicle/296-gtb/hero.jpg",
    price: "$322,000",
    specs: {
      engine: "3.0L V6 Hybrid",
      power: "818 HP",
      acceleration: "2.9s 0-60",
      topSpeed: "205 mph"
    }
  },
  {
    id: "ferrari_roma_1",
    brand: "Ferrari",
    name: "Roma",
    year: 2023,
    image: "https://media.ferrari.com/cdn-cgi/image/format=webp,width=1200/media/cms/vehicle/roma/hero.jpg",
    price: "$247,000",
    specs: {
      engine: "3.9L Twin-Turbo V8",
      power: "612 HP",
      acceleration: "3.2s 0-60",
      topSpeed: "199 mph"
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
  // LAMBORGHINI
  {
    id: "lambo_aventador_1",
    brand: "Lamborghini",
    name: "Aventador SVJ",
    year: 2023,
    image: "https://media.lamborghini.com/assets/aventador-svj/hero.jpg",
    price: "$520,000",
    specs: {
      engine: "6.5L V12",
      power: "759 HP",
      acceleration: "2.6s 0-60",
      topSpeed: "217 mph"
    }
  },
  {
    id: "lambo_huracan_1",
    brand: "Lamborghini",
    name: "Huracán Performante",
    year: 2023,
    image: "https://media.lamborghini.com/assets/huracan-performante/hero.jpg",
    price: "$310,000",
    specs: {
      engine: "5.2L V10",
      power: "631 HP",
      acceleration: "2.9s 0-60",
      topSpeed: "202 mph"
    }
  },
  {
    id: "lambo_urus_1",
    brand: "Lamborghini",
    name: "Urus Performante",
    year: 2023,
    image: "https://media.lamborghini.com/assets/urus-performante/hero.jpg",
    price: "$260,000",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      power: "657 HP",
      acceleration: "3.3s 0-60",
      topSpeed: "190 mph"
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
      engine: "3.7L Twin-Turbo Flat-6",
      power: "640 HP",
      acceleration: "2.6s 0-60",
      topSpeed: "205 mph"
    }
  },
  {
    id: "porsche_taycan_1",
    brand: "Porsche",
    name: "Taycan Turbo S",
    year: 2023,
    image: "https://files.porsche.com/filestore/image/multimedia/none/yt21-0055-taycan-turbo-s-teaser-01/model/2dd761d9-5174-11eb-80d0-005056bbdc38/porsche-yt21-0055-taycan-turbo-s-teaser-01.jpg",
    price: "$185,000",
    specs: {
      engine: "Dual Electric Motors",
      power: "750 HP",
      acceleration: "2.6s 0-60",
      topSpeed: "161 mph"
    }
  },
  {
    id: "porsche_gt3rs_1",
    brand: "Porsche",
    name: "911 GT3 RS",
    year: 2024,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
    price: "$223,800",
    specs: {
      engine: "4.0L Flat-Six",
      power: "518 HP",
      acceleration: "3.2s 0-100",
      topSpeed: "184 mph"
    }
  },
  // MCLAREN
  {
    id: "mclaren_720s_1",
    brand: "McLaren",
    name: "720S",
    year: 2023,
    image: "https://robbreport.com/wp-content/uploads/2017/05/mclaren-720s-1.jpg",
    price: "$310,000",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      power: "710 HP",
      acceleration: "2.7s 0-60",
      topSpeed: "212 mph"
    }
  },
  {
    id: "mclaren_p1_1",
    brand: "McLaren",
    name: "P1",
    year: 2014,
    image: "https://robbreport.com/wp-content/uploads/2013/10/mclaren-p1-1.jpg",
    price: "$1,350,000",
    specs: {
      engine: "3.8L V8 Hybrid",
      power: "903 HP",
      acceleration: "2.6s 0-60",
      topSpeed: "217 mph"
    }
  }
];
