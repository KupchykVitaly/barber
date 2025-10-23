export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: string;
}

export interface Barber {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  photo: string;
  gallery: string[];
}

export interface GalleryItem {
  id: string;
  image: string;
  barberId: string;
  serviceType: string;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Чоловіча стрижка',
    description: 'Класична або сучасна стрижка з укладанням',
    price: 350,
    duration: 45,
    icon: 'Scissors'
  },
  {
    id: '2',
    name: 'Гоління',
    description: 'Класичне гоління небезпечною бритвою',
    price: 250,
    duration: 30,
    icon: 'Sparkles'
  },
  {
    id: '3',
    name: 'Догляд за бородою',
    description: 'Моделювання та догляд за бородою',
    price: 300,
    duration: 40,
    icon: 'Star'
  },
  {
    id: '4',
    name: 'Стрижка + Борода',
    description: 'Комплексний догляд: стрижка та борода',
    price: 550,
    duration: 75,
    icon: 'Crown'
  },
  {
    id: '5',
    name: 'Дитяча стрижка',
    description: 'Стрижка для дітей до 12 років',
    price: 250,
    duration: 30,
    icon: 'Heart'
  },
  {
    id: '6',
    name: 'Камуфляж сивини',
    description: 'Фарбування для маскування сивини',
    price: 400,
    duration: 50,
    icon: 'Palette'
  }
];

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Олександр Коваленко',
    specialization: 'Майстер класичних стрижок',
    bio: 'Більше 10 років досвіду в барбер-індустрії. Спеціалізується на класичних чоловічих стрижках та гоління.',
    photo: 'https://images.unsplash.com/photo-1732314287829-f1da598a5b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiYXJiZXJ8ZW58MXx8fHwxNzYxMTM5MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1687422808328-11cf750a5051?w=400',
      'https://images.unsplash.com/photo-1644217147355-a314e32d15e5?w=400',
      'https://images.unsplash.com/photo-1533808232502-bee53575c3af?w=400'
    ]
  },
  {
    id: '2',
    name: 'Дмитро Шевченко',
    specialization: 'Експерт з бороди',
    bio: 'Професіонал у моделюванні бороди та сучасних стрижках. 8 років досвіду.',
    photo: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
    gallery: [
      'https://images.unsplash.com/photo-1533808232502-bee53575c3af?w=400',
      'https://images.unsplash.com/photo-1687422808328-11cf750a5051?w=400',
      'https://images.unsplash.com/photo-1644217147355-a314e32d15e5?w=400'
    ]
  },
  {
    id: '3',
    name: 'Ігор Мельник',
    specialization: 'Майстер сучасних стилів',
    bio: 'Креативний барбер, який створює унікальні образи. Спеціалізується на fade та андеркат.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    gallery: [
      'https://images.unsplash.com/photo-1644217147355-a314e32d15e5?w=400',
      'https://images.unsplash.com/photo-1687422808328-11cf750a5051?w=400',
      'https://images.unsplash.com/photo-1533808232502-bee53575c3af?w=400'
    ]
  },
  {
    id: '4',
    name: 'Андрій Петренко',
    specialization: 'Універсальний майстер',
    bio: 'Досвід роботи 12 років. Працює з усіма віковими категоріями та стилями.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    gallery: [
      'https://images.unsplash.com/photo-1687422808328-11cf750a5051?w=400',
      'https://images.unsplash.com/photo-1644217147355-a314e32d15e5?w=400',
      'https://images.unsplash.com/photo-1533808232502-bee53575c3af?w=400'
    ]
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1687422808328-11cf750a5051?w=600',
    barberId: '1',
    serviceType: 'Стрижки'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1644217147355-a314e32d15e5?w=600',
    barberId: '2',
    serviceType: 'Стрижки'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1533808232502-bee53575c3af?w=600',
    barberId: '1',
    serviceType: 'Бороди'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=600',
    barberId: '3',
    serviceType: 'Стрижки'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600',
    barberId: '2',
    serviceType: 'Бороди'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1634804454114-e6bf99f0f923?w=600',
    barberId: '4',
    serviceType: 'Стрижки'
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Віктор М.',
    text: 'Найкраща перукарня в місті! Олександр завжди знає, що мені потрібно.',
    rating: 5
  },
  {
    id: '2',
    name: 'Сергій К.',
    text: 'Професійний підхід та приємна атмосфера. Рекомендую всім!',
    rating: 5
  },
  {
    id: '3',
    name: 'Максим П.',
    text: 'Ходжу сюди вже 2 роки. Завжди виходжу задоволений результатом.',
    rating: 5
  },
  {
    id: '4',
    name: 'Роман Т.',
    text: 'Ідеальне місце для чоловіків. Дмитро - справжній майстер своєї справи!',
    rating: 5
  }
];

// Helper functions for bookings
export const getBookings = (userId: string): Booking[] => {
  const bookings = JSON.parse(localStorage.getItem('barbershop_bookings') || '[]');
  return bookings.filter((b: Booking) => b.userId === userId);
};

export const addBooking = (booking: Omit<Booking, 'id'>): Booking => {
  const bookings = JSON.parse(localStorage.getItem('barbershop_bookings') || '[]');
  const newBooking = {
    ...booking,
    id: Date.now().toString()
  };
  bookings.push(newBooking);
  localStorage.setItem('barbershop_bookings', JSON.stringify(bookings));
  return newBooking;
};

export const updateBooking = (bookingId: string, updates: Partial<Booking>) => {
  const bookings = JSON.parse(localStorage.getItem('barbershop_bookings') || '[]');
  const index = bookings.findIndex((b: Booking) => b.id === bookingId);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    localStorage.setItem('barbershop_bookings', JSON.stringify(bookings));
  }
};
