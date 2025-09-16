import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm px-4 py-3 flex flex-col items-center text-center">
      <div className="text-xl font-bold text-kimedes">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-4">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F8ca8cdea80004f6a93dbdda141395da4%2F9cdaedb9be0f4114a2a9be7241bbbc10?format=webp&width=800" alt="Kimedes" className="h-9" />
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/company/kimedes/" target="_blank" rel="noreferrer" className="text-kimedes">
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left copy */}
          <div className="space-y-6">
            <div className="text-sm text-gray-500">Aigua • Sostenibilitat • Estalvi</div>
            <h1 className="text-4xl md:text-5xl leading-tight font-extrabold text-gray-900">
              L'eina que tots els ajuntaments i empreses volen <br />
              <span className="text-kimedes">per reduir fuites d'aigua</span> i protegir el medi ambient i estalviar.
            </h1>
            <p className="text-gray-600 max-w-xl">
              Kimedes ajuda els municipis i empreses a monitoritzar la xarxa, detectar fuites en temps real i optimitzar el consum d'aigua amb una plataforma moderna i fàcil d'usar.
            </p>
            <div className="flex items-center gap-4">
              <Button className="btn-kimedes rounded-full px-6 py-6 h-12">
                Contacta i reserva per una demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md pt-4">
              <StatPill value="-30%" label="Pèrdues anuals" />
              <StatPill value="24/7" label="Monitorització" />
              <StatPill value="↑ estalvi" label="ROI mesurable" />
            </div>
          </div>

          {/* Right media card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border bg-black/5">
              <div
                className="aspect-video bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://cdn.builder.io/api/v1/image/assets%2F8ca8cdea80004f6a93dbdda141395da4%2F7e06ad701e804ea095c11784c4fdf9f7?format=webp&width=1600')",
                }}
              >
                <div className="w-full h-full bg-black/20 flex items-center justify-center p-6">
                  <p className="text-white/95 text-center max-w-md text-sm md:text-base">
                    Plataforma amb IA per detectar, prioritzar i resoldre fuites amb algoritmes i dades en temps real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <section className="grid md:grid-cols-3 gap-4 mt-12">
          <Feature
            title="Sensors i IA"
            desc="Anàlisi avançada per preveure fuites i optimitzar la pressió."
          />
          <Feature
            title="Quadres de comandament"
            desc="Indicadors clars per equips tècnics i responsables públics."
          />
          <Feature
            title="Integració fàcil"
            desc="APIs i compatibilitat amb la teva infraestructura actual."
          />
        </section>

        {/* Footer */}
        <footer className="pt-8">
          <div className="footer-sep" />
          <div className="flex items-center justify-between text-xs text-gray-500 py-6">
            <div>© 2025 Kimedes</div>
            <div className="landing-footer-right">Deep Tech for a Blue Planet</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
