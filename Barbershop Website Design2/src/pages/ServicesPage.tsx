import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { services } from '../data/mockData';
import { Scissors, Sparkles, Star, Crown, Heart, Palette } from 'lucide-react';

export const ServicesPage = () => {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Scissors,
      Sparkles,
      Star,
      Crown,
      Heart,
      Palette
    };
    const Icon = icons[iconName] || Scissors;
    return <Icon className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Наші послуги</h1>
          <p className="text-xl text-gray-600">
            Професійний догляд за вашим образом
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
                  {getIcon(service.icon)}
                </div>
                
                <h2 className="text-2xl mb-3">{service.name}</h2>
                
                <p className="text-gray-600 mb-6 min-h-[3rem]">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div>
                    <p className="text-3xl">{service.price} грн</p>
                    <p className="text-sm text-gray-500">Ціна</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{service.duration} хв</p>
                    <p className="text-sm text-gray-500">Тривалість</p>
                  </div>
                </div>
                
                <Link to={`/booking?service=${service.id}`}>
                  <Button className="w-full">
                    Записатися
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl mb-4">Не знаєте, що обрати?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Наші майстри з радістю проконсультують вас та допоможуть підібрати 
            оптимальний набір послуг для вашого образу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg">
                Записатися на консультацію
              </Button>
            </Link>
            <Link to="/barbers">
              <Button size="lg" variant="outline">
                Познайомитися з майстрами
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
