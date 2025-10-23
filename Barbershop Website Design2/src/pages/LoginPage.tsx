import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Alert } from '../components/ui/alert';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/account');
    } else {
      setError('Невірний email або пароль');
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <h1 className="text-3xl text-center mb-2">Вхід</h1>
            <p className="text-center text-gray-600">
              Увійдіть до свого облікового запису
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

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full">
                Увійти
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Немає облікового запису?{' '}
                  <Link to="/register" className="text-black hover:underline">
                    Зареєструватися
                  </Link>
                </p>
                <Link to="/reset-password" className="text-sm text-gray-600 hover:underline block">
                  Забули пароль?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
