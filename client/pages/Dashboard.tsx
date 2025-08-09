import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  Droplets,
  Zap,
  Leaf,
  AlertTriangle,
  Users,
  FileText,
  Bell,
  Settings,
  BarChart3,
  MapPin,
  LogOut,
  X
} from 'lucide-react';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('Panell de control');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const sidebarItems = [
    { icon: BarChart3, label: 'Panell de control', active: true },
    { icon: BarChart3, label: 'Analítica' },
    { icon: MapPin, label: 'Localització de Fuites' },
    { icon: Droplets, label: 'Detecció de fuites' },
  ];

  const adminItems = [
    { icon: FileText, label: 'Facturació' },
    { icon: FileText, label: 'Informes de Freu' },
    { icon: Bell, label: 'Alertes', hasNotification: true },
    { icon: Users, label: 'Gestió de Personal' },
    { icon: Settings, label: 'Control de Sensors' },
    { icon: Bell, label: 'Notificacions' },
    { icon: BarChart3, label: 'Registre d\'Activitats' },
    { icon: Settings, label: 'Configuració' },
  ];

  const metrics = [
    {
      title: 'Total Fuites Actives',
      value: '# 23',
      change: '5.39%',
      trend: 'down',
      color: 'bg-cyan-100',
      textColor: 'text-cyan-900',
      icon: TrendingDown,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'CO2 Emès',
      value: '120 T',
      change: '7.89%',
      trend: 'down',
      color: 'bg-teal-100',
      textColor: 'text-teal-900',
      icon: TrendingDown,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },
    {
      title: 'Eficiència de la xarxa',
      value: '67 %',
      change: '8.84%',
      trend: 'up',
      color: 'bg-purple-100',
      textColor: 'text-purple-900',
      icon: TrendingUp,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const costMetrics = [
    {
      title: 'Cost econòmic per fuites',
      value: '$72K',
      change: '9.67%',
      color: 'bg-pink-100',
      iconBg: 'bg-pink-100'
    },
    {
      title: 'Aigua perduda',
      value: '200 M3',
      change: '7.36%',
      color: 'bg-teal-100',
      iconBg: 'bg-teal-100'
    },
    {
      title: 'Aigua demandada',
      value: '800 M3',
      change: '4.53%',
      color: 'bg-orange-100',
      iconBg: 'bg-orange-100'
    }
  ];

  const recommendations = [
    { text: 'Tens 3 Alertes noves de fuita.', action: 'Revisar' },
    { text: 'Tens 5 Fuites sense resoldre per un període massa llarg.', action: 'Revisar' },
    { text: 'Tens 1 treballador a qui pots assignar més feina.', action: 'Revisar' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <div className="w-3 h-8 bg-cyan-400 rounded mr-2"></div>
            <h1 className="text-xl font-bold text-gray-900">Kimedes</h1>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mt-1">
            <b>
              El meu poble
              <br />
            </b>
            <br />
          </p>
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item.label)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  item.active || activeSection === item.label
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Admin Section */}
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Admin
            </h3>
            <nav className="mt-2 space-y-1">
              {adminItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.label === 'Informes de Freu') {
                      setShowModal(true);
                    } else {
                      setActiveSection(item.label);
                    }
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                  {item.hasNotification && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5">1</Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Logout */}
          <div className="mt-8 pt-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{activeSection}</h1>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Que necessites saber?"
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Resume Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Resum</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Mes en curs</span>
              <Calendar className="w-4 h-4" />
            </div>
          </div>

          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {metrics.map((metric, index) => (
              <Card key={index} className={`${metric.color} border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-700">{metric.title}</h3>
                    <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                      <metric.icon className={`w-4 h-4 ${metric.iconColor}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</p>
                    <div className="flex items-center text-sm">
                      <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {metric.trend === 'up' ? '+' : '-'} {metric.change}
                      </span>
                      <span className="text-gray-600 ml-1">respecte l'últim període</span>
                    </div>
                    {/* Simple chart representation */}
                    <div className="flex items-end space-x-1 mt-4">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 rounded-sm ${
                            metric.title.includes('Actives') ? 'bg-red-400' :
                            metric.title.includes('CO2') ? 'bg-teal-400' : 'bg-purple-400'
                          }`}
                          style={{ height: `${Math.random() * 20 + 10}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {costMetrics.map((metric, index) => (
              <Card key={index} className={`${metric.color} border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-700">{metric.title}</h3>
                    <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                      <Droplets className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center text-sm">
                      <span className="text-red-600">+ {metric.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recomanacions</h2>
          <p className="text-sm text-gray-600 mb-4">Aquí tens les 3 recomanacions del dia.</p>
          
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Tens</span>
                <span className="font-semibold text-gray-900">
                  {rec.text.split('Tens ')[1].split('.')[0]}.
                </span>
                <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                  {rec.action}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* User Avatar */}
        <div className="fixed bottom-8 left-8">
          <div className="flex items-center space-x-3">
            <div>
            </div>
          </div>
          <div className="mt-2 text-center">
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full mx-auto shadow-2xl animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  OOPS! Encara no ho tenim!
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed">
                Gràcies pel teu interès, però aquesta funcionalitat encara no està activa.
                Estigues atent als pròxims llançaments del producte.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6">
              <Button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Tancar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
