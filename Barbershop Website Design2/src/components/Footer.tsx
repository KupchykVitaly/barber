import { Link } from 'react-router-dom';
import { Scissors, MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-6 h-6" />
              <span className="text-xl">BARBER SHOP</span>
            </div>
            <p className="text-gray-400">
              Мистецтво ідеальної стрижки. Професійний догляд за вашим образом.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Навігація</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Головна</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Послуги</Link></li>
              <li><Link to="/barbers" className="hover:text-white transition-colors">Барбери</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Галерея</Link></li>
              <li><Link to="/booking" className="hover:text-white transition-colors">Запис онлайн</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Контакти</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>вул. Хрещатик, 15, Київ</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+380441234567" className="hover:text-white transition-colors">
                  +38 (044) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@barbershop.ua" className="hover:text-white transition-colors">
                  info@barbershop.ua
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4">Години роботи</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Пн-Пт: 9:00 - 21:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Сб: 10:00 - 20:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Нд: 10:00 - 18:00</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 BARBER SHOP. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};
