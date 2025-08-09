import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import LeakMap from "@/components/LeakMap";
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
  X,
  Menu,
} from "lucide-react";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Panell de control");
  const [showModal, setShowModal] = useState(false);
  const [selectedLeaks, setSelectedLeaks] = useState<number[]>([1, 3, 6]); // Initial selected items
  const [selectAll, setSelectAll] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const sidebarItems = [
    { icon: BarChart3, label: "Panell de control" },
    { icon: MapPin, label: "Localització de Fuites" },
    { icon: Droplets, label: "Detecció de fuites" },
    { icon: BarChart3, label: "Analítica" },
  ];

  const adminItems = [
    { icon: FileText, label: "Facturació" },
    { icon: FileText, label: "Informes de Freu" },
    { icon: Bell, label: "Alertes", hasNotification: true },
    { icon: Users, label: "Gestió de Personal" },
    { icon: Settings, label: "Control de Sensors" },
    { icon: Bell, label: "Notificacions" },
    { icon: BarChart3, label: "Registre d'Activitats" },
    { icon: Settings, label: "Configuració" },
  ];

  const metrics = [
    {
      title: "Total Fuites Actives",
      value: "# 23",
      change: "5.39%",
      trend: "down",
      color: "bg-cyan-100",
      textColor: "text-cyan-900",
      icon: TrendingDown,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "CO2 Emès",
      value: "120 T",
      change: "7.89%",
      trend: "down",
      color: "bg-teal-100",
      textColor: "text-teal-900",
      icon: TrendingDown,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      title: "Eficiència de la xarxa",
      value: "67 %",
      change: "8.84%",
      trend: "up",
      color: "bg-purple-100",
      textColor: "text-purple-900",
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const costMetrics = [
    {
      title: "Cost econòmic per fuites",
      value: "$72K",
      change: "9.67%",
      color: "bg-pink-100",
      iconBg: "bg-pink-100",
    },
    {
      title: "Aigua perduda",
      value: "200 M3",
      change: "7.36%",
      color: "bg-teal-100",
      iconBg: "bg-teal-100",
    },
    {
      title: "Aigua demandada",
      value: "800 M3",
      change: "4.53%",
      color: "bg-orange-100",
      iconBg: "bg-orange-100",
    },
  ];

  const recommendations = [
    { text: "Tens 3 Alertes noves de fuita.", action: "Revisar" },
    {
      text: "Tens 5 Fuites sense resoldre per un període massa llarg.",
      action: "Revisar",
    },
    {
      text: "Tens 1 treballador a qui pots assignar més feina.",
      action: "Revisar",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-8 bg-cyan-400 rounded mr-2"></div>
              <h1 className="text-xl font-bold text-gray-900">Kimedes</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
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
                onClick={() => {
                  if (item.label === "Analítica") {
                    setShowModal(true);
                  } else {
                    setActiveSection(item.label);
                  }
                }}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === item.label
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
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
                    const modalOptions = [
                      "Analítica",
                      "Facturació",
                      "Informes de Freu",
                      "Alertes",
                      "Gestió de Personal",
                      "Control de Sensors",
                      "Notificacions",
                      "Registre d'Activitats",
                      "Configuració",
                    ];

                    if (modalOptions.includes(item.label)) {
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
                    <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5">
                      1
                    </Badge>
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
      <div className="flex-1 p-4 lg:p-8">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <div className="w-3 h-8 bg-cyan-400 rounded mr-2"></div>
            <h1 className="text-xl font-bold text-gray-900">Kimedes</h1>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
            {activeSection}
          </h1>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Que necessites saber?"
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Content based on active section */}
        {activeSection === "Localització de Fuites" ? (
          /* Localització de Fuites Content */
          <div>
            {/* Indicadors Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Indicadors
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Mes en curs</span>
                  <Calendar className="w-4 h-4" />
                </div>
              </div>

              {/* Same metrics as Detecció de fuites */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <Card className="bg-pink-100 border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Cost econòmic per fuites
                      </h3>
                      <div className="p-2 rounded-lg bg-pink-100">
                        <FileText className="w-4 h-4 text-pink-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-gray-900">€72k</p>
                      <div className="flex items-center text-sm">
                        <span className="text-red-600">+ 9.67%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-teal-100 border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Fuites Noves
                      </h3>
                      <div className="p-2 rounded-lg bg-teal-100">
                        <Droplets className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <div className="flex items-center text-sm">
                        <span className="text-red-600">+ 5.39%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-100 border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Aigua estimada perduda
                      </h3>
                      <div className="p-2 rounded-lg bg-orange-100">
                        <Droplets className="w-4 h-4 text-orange-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-gray-900">
                        20 M3/dia
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="text-red-600">+ 4.53%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Map Visualization Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Visualització estimada de les fuites
                </h2>
              </div>

              {/* Interactive Map Container */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <LeakMap />
              </div>
            </div>
          </div>
        ) : activeSection === "Detecció de fuites" ? (
          /* Leak Detection Content */
          <div>
            {/* Indicadors Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Indicadors
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Mes en curs</span>
                  <Calendar className="w-4 h-4" />
                </div>
              </div>

              {/* Leak Detection Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <Card className="bg-pink-100 border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Cost econòmic per fuites
                      </h3>
                      <div className="p-2 rounded-lg bg-pink-100">
                        <FileText className="w-4 h-4 text-pink-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-gray-900">€72k</p>
                      <div className="flex items-center text-sm">
                        <span className="text-red-600">+ 9.67%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-teal-100 border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Fuites Noves
                      </h3>
                      <div className="p-2 rounded-lg bg-teal-100">
                        <Droplets className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <div className="flex items-center text-sm">
                        <span className="text-red-600">+ 5.39%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-100 border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Aigua estimada perduda
                      </h3>
                      <div className="p-2 rounded-lg bg-orange-100">
                        <Droplets className="w-4 h-4 text-orange-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-gray-900">
                        20 M3/dia
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="text-red-600">+ 4.53%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Llista de fuites detectades */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Llista de fuites detectades
                </h2>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="text-gray-600">
                    <Search className="w-4 h-4 mr-2" />
                    Exporta
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto min-w-full">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectAll}
                            onChange={(e) => {
                              setSelectAll(e.target.checked);
                              if (e.target.checked) {
                                setSelectedLeaks([
                                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                                ]);
                              } else {
                                setSelectedLeaks([]);
                              }
                            }}
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Identificador Fuita
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Ràtio Fuita (L/s)
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Dificultat
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Valor (€)
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Assignació
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Data detecció
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          MAPA
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          id: "Leakage Sant Carles",
                          ratio: "12 L/s",
                          difficulty: "Alta",
                          value: "€6,456",
                          assignee: "Toni",
                          date: "25/06/2025",
                          status: "Resolent",
                          statusColor: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          id: "Leakage #4",
                          ratio: "15 L/s",
                          difficulty: "Mitja",
                          value: "€6,006",
                          assignee: "Alex",
                          date: "25/06/2025",
                          status: "Resolent",
                          statusColor: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          id: "Leakage #5",
                          ratio: "20 L/s",
                          difficulty: "Baixa",
                          value: "€2,762",
                          assignee: "Jordi",
                          date: "25/06/2025",
                          status: "Nova",
                          statusColor: "bg-blue-100 text-blue-800",
                        },
                        {
                          id: "Leakage #6",
                          ratio: "20 L/s",
                          difficulty: "No Aplica",
                          value: "€2,517",
                          assignee: "Toni",
                          date: "30/06/2024",
                          status: "Cancelled",
                          statusColor: "bg-red-100 text-red-800",
                        },
                        {
                          id: "Leakage #7",
                          ratio: "20 L/s",
                          difficulty: "Alta",
                          value: "€9,898",
                          assignee: "Toni",
                          date: "25/06/2025",
                          status: "Resolent",
                          statusColor: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          id: "Leakage #8",
                          ratio: "20 L/s",
                          difficulty: "Alta",
                          value: "€4,075",
                          assignee: "Alex",
                          date: "25/06/2025",
                          status: "Nova",
                          statusColor: "bg-blue-100 text-blue-800",
                        },
                        {
                          id: "Leakage #9",
                          ratio: "20 L/s",
                          difficulty: "Baixa",
                          value: "€2,189",
                          assignee: "Jordi",
                          date: "25/07/2025",
                          status: "Resolent",
                          statusColor: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          id: "Leakage #10",
                          ratio: "20 L/s",
                          difficulty: "Mitja",
                          value: "€8,800",
                          assignee: "Jordi",
                          date: "25/06/2025",
                          status: "Nova",
                          statusColor: "bg-blue-100 text-blue-800",
                        },
                        {
                          id: "Leakage #12",
                          ratio: "20 L/s",
                          difficulty: "Baixa",
                          value: "€7,635",
                          assignee: "Alex",
                          date: "25/05/2024",
                          status: "Cancelled",
                          statusColor: "bg-red-100 text-red-800",
                        },
                        {
                          id: "Leakage #13",
                          ratio: "20 L/s",
                          difficulty: "Mitja",
                          value: "€8,535",
                          assignee: "Toni",
                          date: "25/03/2025",
                          status: "Arreglada",
                          statusColor: "bg-green-100 text-green-800",
                        },
                      ].map((leak, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedLeaks.includes(index)}
                              className="rounded"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLeaks([...selectedLeaks, index]);
                                } else {
                                  setSelectedLeaks(
                                    selectedLeaks.filter((id) => id !== index),
                                  );
                                  setSelectAll(false);
                                }
                              }}
                            />
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {leak.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {leak.ratio}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {leak.difficulty}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {leak.value}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {leak.assignee}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {leak.date}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${leak.statusColor}`}
                            >
                              {leak.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              size="sm"
                              className="bg-gray-800 hover:bg-gray-900 text-white text-xs"
                            >
                              Veure
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 flex items-center justify-between border-t bg-gray-50">
                  <div className="text-sm text-gray-700">1 - 10 of 145</div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      ‹
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      4
                    </Button>
                    <span className="text-gray-500">...</span>
                    <Button variant="outline" size="sm">
                      10
                    </Button>
                    <Button variant="outline" size="sm">
                      11
                    </Button>
                    <Button variant="outline" size="sm">
                      ›
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <div>
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
                  <Card
                    key={index}
                    className={`${metric.color} border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer`}
                    onClick={() => {
                      if (metric.title === "Total Fuites Actives") {
                        setActiveSection("Detecció de fuites");
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">
                          {metric.title}
                        </h3>
                        <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                          <metric.icon
                            className={`w-4 h-4 ${metric.iconColor}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className={`text-2xl font-bold ${metric.textColor}`}>
                          {metric.value}
                        </p>
                        <div className="flex items-center text-sm">
                          <span
                            className={
                              metric.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {metric.trend === "up" ? "+" : "-"} {metric.change}
                          </span>
                          <span className="text-gray-600 ml-1">
                            respecte l'últim període
                          </span>
                        </div>
                        {/* Simple chart representation */}
                        <div className="flex items-end space-x-1 mt-4">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 rounded-sm ${
                                metric.title.includes("Actives")
                                  ? "bg-red-400"
                                  : metric.title.includes("CO2")
                                    ? "bg-teal-400"
                                    : "bg-purple-400"
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
                  <Card
                    key={index}
                    className={`${metric.color} border-0 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-lg cursor-pointer`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-700">
                          {metric.title}
                        </h3>
                        <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                          <Droplets className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-gray-900">
                          {metric.value}
                        </p>
                        <div className="flex items-center text-sm">
                          <span className="text-red-600">
                            + {metric.change}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recomanacions
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Aquí tens les 3 recomanacions del dia.
              </p>

              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Tens</span>
                    <span className="font-semibold text-gray-900">
                      {rec.text.split("Tens ")[1].split(".")[0]}.
                    </span>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto text-sm"
                    >
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Avatar */}
        <div className="fixed bottom-8 left-8">
          <div className="flex items-center space-x-3">
            <div></div>
          </div>
          <div className="mt-2 text-center"></div>
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
                Gràcies pel teu interès, però aquesta funcionalitat encara no
                està activa. Estigues atent als pròxims llançaments del
                producte.
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
