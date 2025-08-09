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
              <span className="font-semibold">Barcelona</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F8ca8cdea80004f6a93dbdda141395da4%2F7e06ad701e804ea095c11784c4fdf9f7?format=webp&width=800')`
          }}
        >
          {/* Overlay para mantener legibilidad del texto */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        {/* Elementos decorativos sutiles */}
        <div className="absolute inset-0 z-10">
          {/* Elementos geométricos sutiles */}
          <div className="absolute top-20 right-20 w-20 h-20 bg-white rounded-2xl opacity-20 transform rotate-12"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan-400 rounded-2xl opacity-30 transform rotate-45"></div>
          <div className="absolute bottom-60 right-80 w-16 h-16 bg-white rounded-xl opacity-25"></div>
        </div>

        {/* Testimonial */}
        <div className="absolute bottom-32 left-8 right-8 z-20">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm">
                  @
                </div>
                <div>
                  <p className="text-sm text-gray-800 italic font-medium">
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
        <div className="absolute top-48 right-24 z-10">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full opacity-80"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
