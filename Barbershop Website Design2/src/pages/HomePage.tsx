import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Scissors, Sparkles, Star, Crown } from 'lucide-react';
import { services, barbers, testimonials, galleryItems } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const HomePage = () => {
  const featuredServices = services.slice(0, 4);
  const featuredGallery = galleryItems.slice(0, 6);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Scissors,
      Sparkles,
      Star,
      Crown
    };
    const Icon = icons[iconName] || Scissors;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1667539916671-b9e7039ccee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTI3MDU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Barbershop Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl mb-6">
              Мистецтво ідеальної стрижки
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Професійний догляд за вашим образом від досвідчених майстрів
            </p>
            <Link to="/booking">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                Записатися онлайн
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6">Про нас</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Наша барбершоп – це не просто місце для стрижки, це простір, де кожен може знайти 
              свій унікальний стиль. Ми поєднуємо традиційні техніки з сучасними трендами, 
              забезпечуючи найвищу якість послуг. Наша команда професіоналів постійно вдосконалює 
              свої навички, щоб ви завжди виглядали бездоганно.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Наші послуги</h2>
            <p className="text-gray-600">Оберіть послугу, яка підходить саме вам</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-1">
                    <p className="text-2xl">{service.price} грн</p>
                    <p className="text-sm text-gray-500">{service.duration} хв</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" size="lg">
                Переглянути всі послуги
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Barbers */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Наші майстри</h2>
            <p className="text-gray-600">Професіонали своєї справи</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {barbers.map((barber) => (
              <Link key={barber.id} to={`/barbers/${barber.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={barber.photo}
                        alt={barber.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="mb-1">{barber.name}</h3>
                      <p className="text-gray-600">{barber.specialization}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/barbers">
              <Button variant="outline" size="lg">
                Дізнатися більше
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Відгуки клієнтів</h2>
            <p className="text-gray-600">Що кажуть наші клієнти</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <p className="text-sm">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Наші роботи</h2>
            <p className="text-gray-600">Портфоліо наших майстрів</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredGallery.map((item) => (
              <div key={item.id} className="aspect-square overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={item.image}
                  alt="Gallery item"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                Переглянути галерею
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Готові до змін?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Запишіться зараз та отримайте професійний догляд
          </p>
          <Link to="/booking">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Записатися онлайн
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
