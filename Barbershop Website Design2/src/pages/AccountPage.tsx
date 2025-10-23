import { useState, useEffect } from 'react';
import { Navigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getBookings, updateBooking, services, barbers } from '../data/mockData';
import type { Booking } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert } from '../components/ui/alert';
import { Calendar, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react';

export const AccountPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setBookings(getBookings(user.id));
      setEditedName(user.name);
      setEditedPhone(user.phone);
    }

    if (searchParams.get('booking') === 'success') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [user, searchParams]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const handleCancelBooking = (bookingId: string) => {
    updateBooking(bookingId, { status: 'cancelled' });
    setBookings(getBookings(user!.id));
  };

  const handleSaveProfile = () => {
    // Mock save - in real app would update user data
    setEditMode(false);
    alert('Профіль оновлено');
  };

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.name || 'Невідома послуга';
  };

  const getBarberName = (barberId: string) => {
    if (barberId === 'any') return 'Будь-який вільний майстер';
    return barbers.find(b => b.id === barberId)?.name || 'Невідомий майстер';
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card key={booking.id}>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span>{getBarberName(booking.barberId)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{getServiceName(booking.serviceId)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{new Date(booking.date).toLocaleDateString('uk-UA')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{booking.time}</span>
          </div>
          {booking.status === 'cancelled' && (
            <div className="text-red-600">Скасовано</div>
          )}
          {booking.status === 'upcoming' && (
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Скасувати
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl mb-2">Мій кабінет</h1>
            <p className="text-xl text-gray-600">Вітаємо, {user?.name}!</p>
          </div>

          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-green-800">Запис успішно створено!</p>
            </Alert>
          )}

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="bookings">Мої записи</TabsTrigger>
              <TabsTrigger value="profile">Профіль</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <div className="space-y-8">
                {/* Upcoming Bookings */}
                <div>
                  <h2 className="text-2xl mb-4">Майбутні записи</h2>
                  {upcomingBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {upcomingBookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <p className="text-gray-600 mb-4">У вас немає майбутніх записів</p>
                        <Link to="/booking">
                          <Button>Записатися зараз</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Past Bookings */}
                {pastBookings.length > 0 && (
                  <div>
                    <h2 className="text-2xl mb-4">Історія</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pastBookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl mb-6">Персональна інформація</h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ім'я</Label>
                      <div className="flex gap-2">
                        <User className="w-5 h-5 text-gray-400 mt-2" />
                        <Input
                          id="name"
                          value={editMode ? editedName : user?.name}
                          onChange={(e) => setEditedName(e.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex gap-2">
                        <Mail className="w-5 h-5 text-gray-400 mt-2" />
                        <Input
                          id="email"
                          value={user?.email}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <div className="flex gap-2">
                        <Phone className="w-5 h-5 text-gray-400 mt-2" />
                        <Input
                          id="phone"
                          value={editMode ? editedPhone : user?.phone}
                          onChange={(e) => setEditedPhone(e.target.value)}
                          disabled={!editMode}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      {editMode ? (
                        <>
                          <Button onClick={handleSaveProfile}>Зберегти</Button>
                          <Button variant="outline" onClick={() => setEditMode(false)}>
                            Скасувати
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setEditMode(true)}>
                          Редагувати профіль
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
