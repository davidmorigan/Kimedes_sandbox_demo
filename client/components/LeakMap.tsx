import { useState } from "react";

interface LeakData {
  id: string;
  x: number;
  y: number;
  leakRate: string;
  cost: string;
  difficulty: string;
}

const LeakMap = () => {
  const [selectedLeak, setSelectedLeak] = useState<LeakData | null>(null);
  const [zoom, setZoom] = useState(100);

  // Sample leak data with screen coordinates
  const leaks: LeakData[] = [
    {
      id: "Leak-001",
      x: 25,
      y: 30,
      leakRate: "15.20 L/s",
      cost: "2504 €",
      difficulty: "High",
    },
    {
      id: "Leak-002",
      x: 65,
      y: 45,
      leakRate: "8.5 L/s",
      cost: "1200 €",
      difficulty: "Medium",
    },
    {
      id: "Leak-003",
      x: 45,
      y: 75,
      leakRate: "12.3 L/s",
      cost: "1850 €",
      difficulty: "Low",
    },
  ];

  const sensors = [
    { id: "S001", x: 20, y: 60, status: "Active" },
    { id: "S002", x: 70, y: 25, status: "Active" },
    { id: "S003", x: 55, y: 80, status: "Maintenance" },
  ];

  return (
    <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Map Background with street pattern */}
      <div
        className="absolute inset-0 bg-gray-200 transition-transform duration-200"
        style={{
          transform: `scale(${zoom / 100})`,
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        {/* Water pipes */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {/* Main horizontal pipe */}
          <line
            x1="10%"
            y1="40%"
            x2="90%"
            y2="40%"
            stroke="#0ea5e9"
            strokeWidth="4"
            strokeDasharray="8,4"
            opacity="0.8"
          />
          {/* Main vertical pipe */}
          <line
            x1="50%"
            y1="10%"
            x2="50%"
            y2="90%"
            stroke="#0ea5e9"
            strokeWidth="4"
            strokeDasharray="8,4"
            opacity="0.8"
          />
          {/* Cross connections */}
          <line
            x1="20%"
            y1="20%"
            x2="80%"
            y2="60%"
            stroke="#0ea5e9"
            strokeWidth="3"
            strokeDasharray="6,3"
            opacity="0.7"
          />
          <line
            x1="30%"
            y1="70%"
            x2="70%"
            y2="30%"
            stroke="#0ea5e9"
            strokeWidth="3"
            strokeDasharray="6,3"
            opacity="0.7"
          />
        </svg>

        {/* Leak markers */}
        {leaks.map((leak) => (
          <div
            key={leak.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
            style={{ left: `${leak.x}%`, top: `${leak.y}%` }}
            onClick={() =>
              setSelectedLeak(selectedLeak?.id === leak.id ? null : leak)
            }
          >
            <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            {selectedLeak?.id === leak.id && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-max z-20 border">
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-gray-900">{leak.id}</div>
                  <div>
                    <strong>LR:</strong> {leak.leakRate}
                  </div>
                  <div>
                    <strong>Cost:</strong> {leak.cost}
                  </div>
                  <div>
                    <strong>Dificultat:</strong> {leak.difficulty}
                  </div>
                  <button className="mt-2 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-gray-900 w-full">
                    Veure Detalls
                  </button>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
              </div>
            )}
          </div>
        ))}

        {/* Sensor markers */}
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${sensor.x}%`, top: `${sensor.y}%` }}
            title={`${sensor.id} - ${sensor.status}`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                sensor.status === "Active" ? "bg-green-600" : "bg-orange-500"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 z-10">
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => setZoom(Math.min(zoom + 25, 200))}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-lg font-bold"
          >
            +
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 25, 50))}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-lg font-bold"
          >
            −
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
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

      {/* Map info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2 z-10">
        <div className="text-xs text-gray-600">
          <div>🔍 Zoom: {zoom}%</div>
          <div>📍 Click markers for details</div>
        </div>
      </div>
    </div>
  );
};

export default LeakMap;
