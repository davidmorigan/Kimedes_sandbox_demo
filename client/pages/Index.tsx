import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Droplets, Euro, Leaf, Calculator, MapPin, Users, Building } from "lucide-react";

interface CalculationResults {
  waterLossLiters: number;
  waterLossM3: number;
  moneySaved: number;
  co2Saved: number;
  co2Equivalent: string;
}

export default function Index() {
  const [townName, setTownName] = useState("");
  const [population, setPopulation] = useState("");
  const [currentWaterLoss, setCurrentWaterLoss] = useState("");
  const [improvementPercentage, setImprovementPercentage] = useState("");
  const [results, setResults] = useState<CalculationResults | null>(null);

  // Catalonia-specific rates (2024 estimates)
  const WATER_COST_PER_M3 = 2.15; // €/m³ average in Catalonia
  const CO2_PER_M3_WATER = 0.34; // kg CO2/m³ for water treatment and distribution in Catalonia
  
  const calculateSavings = () => {
    const pop = parseFloat(population);
    const currentLoss = parseFloat(currentWaterLoss);
    const improvement = parseFloat(improvementPercentage);
    
    if (!pop || !currentLoss || !improvement) return;
    
    // Calculate annual water loss reduction
    const waterLossLiters = (currentLoss * improvement / 100) * pop * 365;
    const waterLossM3 = waterLossLiters / 1000;
    
    // Calculate money saved (water cost + treatment cost)
    const moneySaved = waterLossM3 * WATER_COST_PER_M3;
    
    // Calculate CO2 saved (treatment + distribution energy)
    const co2Saved = waterLossM3 * CO2_PER_M3_WATER;
    
    // CO2 equivalency (trees needed to absorb this CO2)
    const treesEquivalent = Math.round(co2Saved / 22); // Average tree absorbs 22kg CO2/year
    const co2Equivalent = `${treesEquivalent} trees for 1 year`;
    
    setResults({
      waterLossLiters,
      waterLossM3,
      moneySaved,
      co2Saved,
      co2Equivalent
    });
  };

  const formatNumber = (num: number, decimals: number = 0) => {
    return new Intl.NumberFormat('ca-ES', { 
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals 
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Droplets className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">AiguaCatalunya</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculadora de conservació d'aigua per municipis catalans
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            Descobreix l'impacte de les millores en eficiència hídrica
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Dades del Municipi
              </CardTitle>
              <CardDescription>
                Introdueix les dades del teu municipi per calcular els estalvis potencials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="townName" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Nom del municipi
                </Label>
                <Input
                  id="townName"
                  value={townName}
                  onChange={(e) => setTownName(e.target.value)}
                  placeholder="ex. Barcelona, Girona, Lleida..."
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="population" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Població (habitants)
                </Label>
                <Input
                  id="population"
                  type="number"
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  placeholder="ex. 50000"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentLoss" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Pèrdua actual d'aigua per habitant (litres/dia)
                </Label>
                <Input
                  id="currentLoss"
                  type="number"
                  value={currentWaterLoss}
                  onChange={(e) => setCurrentWaterLoss(e.target.value)}
                  placeholder="ex. 45 (mitjana Catalunya: 42L/dia)"
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Mitjana a Catalunya: 42 litres per habitant i dia
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="improvement" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Millora esperada (%)
                </Label>
                <Input
                  id="improvement"
                  type="number"
                  value={improvementPercentage}
                  onChange={(e) => setImprovementPercentage(e.target.value)}
                  placeholder="ex. 25"
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Percentatge de reducció de pèrdues amb les millores previstes
                </p>
              </div>

              <Button 
                onClick={calculateSavings}
                className="w-full h-12 text-lg"
                disabled={!population || !currentWaterLoss || !improvementPercentage}
              >
                Calcular Estalvis
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="text-2xl">
                  Resultats per {townName || "el municipi"}
                </CardTitle>
                <CardDescription>
                  Estalvis anuals amb una millora del {improvementPercentage}%
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  {/* Water Savings */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Droplets className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-blue-900">Estalvi d'Aigua</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-blue-800">
                        {formatNumber(results.waterLossM3)} m³
                      </p>
                      <p className="text-lg text-blue-700">
                        {formatNumber(results.waterLossLiters)} litres anuals
                      </p>
                      <p className="text-sm text-blue-600">
                        Equivalent a {formatNumber(results.waterLossM3 / 2.5)} piscines olímpiques
                      </p>
                    </div>
                  </div>

                  {/* Money Savings */}
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Euro className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-green-900">Estalvi Econòmic</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-green-800">
                        {formatNumber(results.moneySaved, 2)} €
                      </p>
                      <p className="text-sm text-green-600">
                        A {WATER_COST_PER_M3}€/m³ (tarifa mitjana Catalunya)
                      </p>
                      <p className="text-sm text-green-600">
                        {formatNumber(results.moneySaved / parseFloat(population), 2)} € per habitant/any
                      </p>
                    </div>
                  </div>

                  {/* CO2 Savings */}
                  <div className="p-6 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-teal-100 rounded-full">
                        <Leaf className="h-6 w-6 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-teal-900">Reducció CO₂</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-teal-800">
                        {formatNumber(results.co2Saved, 1)} kg CO₂
                      </p>
                      <p className="text-lg text-teal-700">
                        {formatNumber(results.co2Saved / 1000, 2)} tones CO₂
                      </p>
                      <p className="text-sm text-teal-600">
                        Equivalent a plantar {results.co2Equivalent}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Informació adicional:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Càlculs basats en dades de l'Agència Catalana de l'Aigua</li>
                    <li>• Costos d'aigua: mitjana ponderada Catalunya 2024</li>
                    <li>• Factor CO₂: inclou tractament i distribució d'aigua</li>
                    <li>• Estalvis calculats per a un any sencer</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card when no results */}
          {!results && (
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Per què és important?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Escassetat d'aigua</h4>
                      <p className="text-sm text-muted-foreground">
                        Catalunya pateix estràs hídric regular, especialment a l'estiu
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Euro className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Estalvi municipal</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduir pèrdues millora l'eficiència i redueix costos operatius
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-teal-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Impacte ambiental</h4>
                      <p className="text-sm text-muted-foreground">
                        Menys tractament d'aigua significa menys emissions de CO₂
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Dades Catalunya 2024:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pèrdua mitjana: 42L/habitant/dia</li>
                    <li>• Cost aigua: 2.15€/m³ mitjana</li>
                    <li>• Objectiu UE: <20% pèrdues per 2030</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm">
            Desenvolupat per ajudar els municipis catalans a optimitzar l'ús de l'aigua
          </p>
        </div>
      </div>
    </div>
  );
}