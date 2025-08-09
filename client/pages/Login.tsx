import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - just navigate to dashboard
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="w-3 h-8 bg-cyan-400 rounded mr-2"></div>
              <h1 className="text-2xl font-bold text-gray-900">Kimedes</h1>
            </div>
            <p className="text-sm text-gray-600">Leak Solution</p>
            <p className="text-sm text-gray-600">Sustainable Revolution</p>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-gray-900">Benvingut!</h2>
              <p className="text-sm text-gray-600">
                Introdueix les credencials compartides per l'Administrador de la teva organització.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">
                    Credencials
                  </label>
                  <Input
                    type="email"
                    placeholder="example.email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                    required
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  Log in →
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              Made with 
              <span className="mx-1 text-blue-600">♥</span>
              <span className="font-semibold">Visily</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute inset-0">
          {/* Main geometric elements */}
          <div className="absolute top-20 right-20 w-40 h-40 bg-blue-300 rounded-2xl opacity-60 transform rotate-12"></div>
          <div className="absolute top-40 right-60 w-32 h-32 bg-white rounded-2xl opacity-40 transform -rotate-6"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-blue-700 rounded-2xl opacity-50 transform rotate-45"></div>
          <div className="absolute bottom-60 right-80 w-24 h-24 bg-cyan-300 rounded-xl opacity-70"></div>
          
          {/* Pipe-like elements */}
          <div className="absolute top-32 right-40 w-6 h-32 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-60 right-32 w-4 h-24 bg-blue-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-32 right-60 w-5 h-28 bg-cyan-200 rounded-full opacity-60"></div>
        </div>

        {/* Testimonial */}
        <div className="absolute bottom-32 left-8 right-8">
          <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                  @
                </div>
                <div>
                  <p className="text-sm text-gray-700 italic">
                    "Precisión y control en cada gota. Kimedes AlphaLeak detecta 
                    fugas, ahorra agua y protege la infraestructura con la 
                    máxima eficacia. ¡Eureka!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-48 right-24">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
