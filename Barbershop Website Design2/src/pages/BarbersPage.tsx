import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { barbers } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';

export const BarbersPage = () => {
  const { id } = useParams();

  if (id) {
    const barber = barbers.find(b => b.id === id);
    
    if (!barber) {
      return (
        <div className="min-h-screen py-12 text-center">
          <p>Барбера не знайдено</p>
          <Link to="/barbers">
            <Button className="mt-4">Повернутися назад</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="min-h-screen py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link to="/barbers">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Назад до списку
            </Button>
          </Link>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Photo */}
              <div className="aspect-square overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={barber.photo}
                  alt={barber.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl mb-4">{barber.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{barber.specialization}</p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {barber.bio}
                </p>
                <Link to={`/booking?barber=${barber.id}`}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Записатися до {barber.name.split(' ')[0]}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-3xl mb-6">Роботи майстра</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {barber.gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={image}
                      alt={`Work ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Наші майстри</h1>
          <p className="text-xl text-gray-600">
            Команда професіоналів з багаторічним досвідом
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {barbers.map((barber) => (
            <Card key={barber.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={barber.photo}
                    alt={barber.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl mb-2">{barber.name}</h2>
                  <p className="text-gray-600 mb-4">{barber.specialization}</p>
                  <p className="text-gray-700 mb-6 line-clamp-3">
                    {barber.bio}
                  </p>
                  
                  <div className="space-y-2">
                    <Link to={`/barbers/${barber.id}`}>
                      <Button variant="outline" className="w-full">
                        Детальніше
                      </Button>
                    </Link>
                    <Link to={`/booking?barber=${barber.id}`}>
                      <Button className="w-full">
                        Записатися
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
