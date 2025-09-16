import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm px-6 py-6 flex flex-col items-center text-center">
      <div className="text-2xl md:text-3xl font-bold text-kimedes">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5">
        <div
          className="w-16 h-1 rounded-full mb-3"
          style={{ background: "linear-gradient(90deg, var(--kimedes-primary), rgba(18,238,255,0.6))" }}
        />
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="container mx-auto flex items-center justify-between py-6 px-4 border-b">
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
      <main className="container mx-auto px-4 flex-grow">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left copy */}
          <div className="space-y-6">
            <div className="text-sm text-gray-500 mt-6">Aigua • Sostenibilitat • Estalvi</div>
            <h1 className="text-4xl md:text-5xl leading-tight font-extrabold text-gray-900">
              L'eina que tots els ajuntaments i empreses volen <br />
              <span className="text-kimedes">per reduir fuites d'aigua</span> i protegir el medi ambient i estalviar.
            </h1>
            <p className="text-gray-600 max-w-xl">
              Kimedes ajuda els municipis i empreses a monitoritzar la xarxa, detectar fuites en temps real i optimitzar el consum d'aigua amb una plataforma moderna i fàcil d'usar.
            </p>
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-kimedes rounded-full px-6 py-6 h-12">
                    Contacta i reserva per una demo
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Contacta l'equip</DialogTitle>
                    <DialogDescription>
                      Demana una demo personalitzada perquè vegis com Kimedes pot ajudar el teu municipi o empresa.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4 text-sm text-gray-700">
                    Escriu a <a className="text-kimedes font-medium">info@kimedes.ai</a> i rebràs una resposta de l'equip en menys de 24h.

                    <p className="mt-3">Gràcies perquè cada gota s'ha de protegir!</p>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="w-full">Tancar</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-xl pt-6">
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
                    "url('https://cdn.builder.io/api/v1/image/assets%2F8ca8cdea80004f6a93dbdda141395da4%2F0390194d5e8242d1bca81e18165d4bff?format=webp&width=1600')",
                }}
              >
                <div className="w-full h-full bg-black/20 flex items-center justify-center p-6">
                  <p className="text-white/95 text-center max-w-md text-sm md:text-base avenir-light">
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

      </main>

      {/* Footer */}
      <footer className="pt-16">
        <div className="container mx-auto px-4">
          <div className="footer-sep" />
          <div className="flex items-center justify-between text-xs text-gray-500 py-6">
            <div>© 2025 Kimedes</div>
            <div className="landing-footer-right">Deep Tech for a Blue Planet</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
