import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { services, barbers, addBooking } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Calendar } from '../components/ui/calendar';
import { Alert } from '../components/ui/alert';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

export const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || '');
  const [selectedBarber, setSelectedBarber] = useState(searchParams.get('barber') || '');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const canProceedStep1 = selectedService !== '';
  const canProceedStep2 = selectedBarber !== '';
  const canProceedStep3 = selectedDate && selectedTime !== '';

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleConfirmBooking = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (selectedService && selectedBarber && selectedDate && selectedTime && user) {
      addBooking({
        userId: user.id,
        serviceId: selectedService,
        barberId: selectedBarber,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: 'upcoming'
      });

      navigate('/account?booking=success');
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedBarberData = barbers.find(b => b.id === selectedBarber);

  return (
    <div className="min-h-screen py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl mb-4">Онлайн запис</h1>
            <p className="text-xl text-gray-600">
              Оберіть зручний час для візиту
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-black' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Choose Service */}
          {currentStep === 1 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl mb-6">Оберіть послугу</h2>
                <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={service.id} id={service.id} />
                        <Label
                          htmlFor={service.id}
                          className="flex-1 cursor-pointer p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="mb-1">{service.name}</p>
                              <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                            <div className="text-right">
                              <p>{service.price} грн</p>
                              <p className="text-sm text-gray-600">{service.duration} хв</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleNextStep} disabled={!canProceedStep1}>
                    Далі <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Choose Barber */}
          {currentStep === 2 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl mb-6">Оберіть майстра</h2>
                <RadioGroup value={selectedBarber} onValueChange={setSelectedBarber}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label
                        htmlFor="any"
                        className="flex-1 cursor-pointer p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <p>Будь-який вільний майстер</p>
                      </Label>
                    </div>
                    {barbers.map((barber) => (
                      <div key={barber.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={barber.id} id={barber.id} />
                        <Label
                          htmlFor={barber.id}
                          className="flex-1 cursor-pointer p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <p className="mb-1">{barber.name}</p>
                          <p className="text-sm text-gray-600">{barber.specialization}</p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Назад
                  </Button>
                  <Button onClick={handleNextStep} disabled={!canProceedStep2}>
                    Далі <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Choose Date & Time */}
          {currentStep === 3 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl mb-6">Оберіть дату та час</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="mb-4">Дата</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>

                  <div>
                    <h3 className="mb-4">Час</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Назад
                  </Button>
                  <Button onClick={handleNextStep} disabled={!canProceedStep3}>
                    Далі <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl mb-6">Підтвердження запису</h2>

                {showLoginPrompt && (
                  <Alert className="mb-6">
                    <p className="mb-2">Для завершення запису необхідно увійти або зареєструватися</p>
                    <div className="flex gap-2">
                      <Link to="/login">
                        <Button size="sm">Увійти</Button>
                      </Link>
                      <Link to="/register">
                        <Button size="sm" variant="outline">Зареєструватися</Button>
                      </Link>
                    </div>
                  </Alert>
                )}

                <div className="space-y-4 bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Послуга:</span>
                    <span>{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Майстер:</span>
                    <span>
                      {selectedBarber === 'any' 
                        ? 'Будь-який вільний' 
                        : selectedBarberData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Дата:</span>
                    <span>{selectedDate?.toLocaleDateString('uk-UA')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Час:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Тривалість:</span>
                    <span>{selectedServiceData?.duration} хв</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t">
                    <span className="text-gray-600">Вартість:</span>
                    <span className="text-2xl">{selectedServiceData?.price} грн</span>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Назад
                  </Button>
                  <Button onClick={handleConfirmBooking}>
                    <Check className="mr-2 w-4 h-4" /> Підтвердити запис
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
