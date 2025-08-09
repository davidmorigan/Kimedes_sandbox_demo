import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom leak marker icon
const leakIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="8" fill="#dc2626" stroke="#fff" stroke-width="2"/>
      <path d="M12 8v8M8 12h8" stroke="#fff" stroke-width="2"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Sensor marker icon
const sensorIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <circle cx="12" cy="12" r="6" fill="#059669" stroke="#fff" stroke-width="2"/>
    </svg>
  `),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

interface LeakData {
  id: string;
  lat: number;
  lng: number;
  leakRate: string;
  cost: string;
  difficulty: string;
}

interface SensorData {
  id: string;
  lat: number;
  lng: number;
  status: string;
}

const LeakMap = () => {
  // Sample leak data points
  const leaks: LeakData[] = [
    {
      id: 'Leak-001',
      lat: 41.3851,
      lng: 2.1734,
      leakRate: '15.20 L/s',
      cost: '2504 €',
      difficulty: 'High'
    },
    {
      id: 'Leak-002',
      lat: 41.3861,
      lng: 2.1744,
      leakRate: '8.5 L/s',
      cost: '1200 €',
      difficulty: 'Medium'
    },
    {
      id: 'Leak-003',
      lat: 41.3841,
      lng: 2.1754,
      leakRate: '12.3 L/s',
      cost: '1850 €',
      difficulty: 'Low'
    }
  ];

  // Sample sensor data
  const sensors: SensorData[] = [
    { id: 'S001', lat: 41.3845, lng: 2.1730, status: 'Active' },
    { id: 'S002', lat: 41.3855, lng: 2.1740, status: 'Active' },
    { id: 'S003', lat: 41.3865, lng: 2.1750, status: 'Active' },
    { id: 'S004', lat: 41.3875, lng: 2.1760, status: 'Maintenance' },
  ];

  // Water pipe network (simplified representation)
  const waterPipes = [
    // Main pipeline
    [
      [41.3840, 2.1720],
      [41.3850, 2.1730],
      [41.3860, 2.1740],
      [41.3870, 2.1750],
      [41.3880, 2.1760]
    ],
    // Secondary pipelines
    [
      [41.3850, 2.1730],
      [41.3845, 2.1725],
      [41.3842, 2.1722]
    ],
    [
      [41.3860, 2.1740],
      [41.3858, 2.1745],
      [41.3856, 2.1748]
    ],
    // Cross connections
    [
      [41.3845, 2.1725],
      [41.3865, 2.1745],
      [41.3875, 2.1755]
    ]
  ];

  return (
    <div className="relative h-96 w-full">
      <MapContainer
        center={[41.3851, 2.1734]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Water pipes */}
        {waterPipes.map((pipe, index) => (
          <Polyline
            key={`pipe-${index}`}
            positions={pipe as any}
            pathOptions={{
              color: '#0ea5e9',
              weight: 4,
              opacity: 0.8,
              dashArray: '5, 5'
            }}
          />
        ))}

        {/* Leak markers */}
        {leaks.map((leak) => (
          <Marker
            key={leak.id}
            position={[leak.lat, leak.lng]}
            icon={leakIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-2">{leak.id}</h3>
                <div className="text-xs space-y-1">
                  <div><strong>LR:</strong> {leak.leakRate}</div>
                  <div><strong>Cost:</strong> {leak.cost}</div>
                  <div><strong>Dificultat:</strong> {leak.difficulty}</div>
                </div>
                <button className="mt-2 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-gray-900">
                  Veure Detalls
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Sensor markers */}
        {sensors.map((sensor) => (
          <Marker
            key={sensor.id}
            position={[sensor.lat, sensor.lng]}
            icon={sensorIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{sensor.id}</h3>
                <div className="text-xs">
                  <div><strong>Status:</strong> {sensor.status}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <div className="text-xs text-gray-600 mb-2 font-semibold">Llegenda</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Fuites actives</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-blue-500 border-dashed border border-blue-500"></div>
            <span>Xarxa d'aigua</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Sensors</span>
          </div>
        </div>
      </div>

      {/* Map controls info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2 z-[1000]">
        <div className="text-xs text-gray-600">
          <div>🔍 Zoom: Scroll / +/- buttons</div>
          <div>🖱️ Pan: Click and drag</div>
        </div>
      </div>
    </div>
  );
};

export default LeakMap;
