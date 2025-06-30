import { useState } from "react";
import MarioAnimation from "@/components/MarioAnimation"; // ajuste o caminho conforme sua pasta

export default function Index() {
  const [showAnimation, setShowAnimation] = useState(true);

  if (showAnimation) {
    return <MarioAnimation onComplete={() => setShowAnimation(false)} />;
  }

  return (
    <main className="pt-20">
      <section className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 text-neon-blue">Bem-vindo à Digaotech</h1>
        <p className="text-lg text-muted">Soluções tecnológicas com criatividade e inovação.</p>
        {/* Adicione aqui os outros componentes da página após a animação */}
      </section>
    </main>
  );
}
