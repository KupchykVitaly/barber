import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Alert } from '../components/ui/alert';

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Будь ласка, введіть email');
      return;
    }

    // Mock password reset
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl mb-4">Перевірте свою пошту</h2>
              <p className="text-gray-600 mb-6">
                Ми надіслали посилання для відновлення паролю на {email}
              </p>
              <Link to="/login">
                <Button>Повернутися до входу</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <h1 className="text-3xl text-center mb-2">Відновлення паролю</h1>
            <p className="text-center text-gray-600">
              Введіть свій email для отримання посилання
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  {error}
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <Button type="submit" className="w-full">
                Надіслати посилання
              </Button>

              <p className="text-center text-sm text-gray-600">
                <Link to="/login" className="text-black hover:underline">
                  Повернутися до входу
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
