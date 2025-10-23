import { useState } from 'react';
import { galleryItems, barbers } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';

export const GalleryPage = () => {
  const [filter, setFilter] = useState<'all' | 'barber' | 'service'>('all');
  const [selectedBarber, setSelectedBarber] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');

  const serviceTypes = ['Стрижки', 'Бороди'];

  const filteredItems = galleryItems.filter(item => {
    if (filter === 'barber' && selectedBarber !== 'all') {
      return item.barberId === selectedBarber;
    }
    if (filter === 'service' && selectedService !== 'all') {
      return item.serviceType === selectedService;
    }
    return true;
  });

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Галерея</h1>
          <p className="text-xl text-gray-600">
            Наші найкращі роботи
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => {
                setFilter('all');
                setSelectedBarber('all');
                setSelectedService('all');
              }}
            >
              Всі роботи
            </Button>
            <Button
              variant={filter === 'service' ? 'default' : 'outline'}
              onClick={() => setFilter('service')}
            >
              За послугою
            </Button>
            <Button
              variant={filter === 'barber' ? 'default' : 'outline'}
              onClick={() => setFilter('barber')}
            >
              За майстром
            </Button>
          </div>

          {/* Service Filter */}
          {filter === 'service' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                size="sm"
                variant={selectedService === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedService('all')}
              >
                Всі послуги
              </Button>
              {serviceTypes.map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={selectedService === type ? 'default' : 'outline'}
                  onClick={() => setSelectedService(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          )}

          {/* Barber Filter */}
          {filter === 'barber' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                size="sm"
                variant={selectedBarber === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedBarber('all')}
              >
                Всі майстри
              </Button>
              {barbers.map(barber => (
                <Button
                  key={barber.id}
                  size="sm"
                  variant={selectedBarber === barber.id ? 'default' : 'outline'}
                  onClick={() => setSelectedBarber(barber.id)}
                >
                  {barber.name.split(' ')[0]}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <ImageWithFallback
                src={item.image}
                alt="Gallery item"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Немає робіт за обраним фільтром</p>
          </div>
        )}
      </div>
    </div>
  );
};
