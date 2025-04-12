import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export default function DesafioPokerPresenca() {
  const totalDias = 21;
  const [diaAtual, setDiaAtual] = useState(1);
  const [checkins, setCheckins] = useState(Array(totalDias).fill(null).map(() => ({ meditacao: false, alcoolOk: false, grind: false, estudo: false, pcRegrado: false, obs: "" })));

  const marcar = (campo) => {
    const novosCheckins = [...checkins];
    novosCheckins[diaAtual - 1][campo] = !novosCheckins[diaAtual - 1][campo];
    setCheckins(novosCheckins);
  };

  const atualizarObs = (texto) => {
    const novosCheckins = [...checkins];
    novosCheckins[diaAtual - 1].obs = texto;
    setCheckins(novosCheckins);
  };

  const isDomingo = (dia) => (dia - 1) % 7 === 6; // Domingo fixo a cada 7 dias

  const diasCompletos = checkins.filter((dia, i) => {
    const grindOk = isDomingo(i + 1) || dia.grind;
    return dia.meditacao && dia.alcoolOk && grindOk && dia.estudo && dia.pcRegrado;
  }).length;

  const progresso = Math.round((diasCompletos / totalDias) * 100);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white rounded-xl shadow-2xl">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">🔥 Desafio: Presença & Poker</h1>
        <p className="text-sm text-gray-400">Dia {diaAtual} de {totalDias}</p>
      </div>

      <div className="space-y-1">
        <Progress value={progresso} className="h-3 bg-gray-700" />
        <p className="text-center text-sm text-gray-300">Progresso: {progresso}%</p>
      </div>

      <Card className="bg-gray-800 border border-gray-700">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant={checkins[diaAtual - 1].meditacao ? "default" : "outline"} className="w-full" onClick={() => marcar("meditacao")}>🧘‍♂️ Meditação</Button>
            <Button variant={checkins[diaAtual - 1].alcoolOk ? "default" : "outline"} className="w-full" onClick={() => marcar("alcoolOk")}>✅ Dia sem álcool</Button>

            {isDomingo(diaAtual) ? (
              <div className="w-full px-4 py-2 text-center text-green-500 border border-green-600 rounded-lg">✅ Folga planejada</div>
            ) : (
              <Button variant={checkins[diaAtual - 1].grind ? "default" : "outline"} className="w-full" onClick={() => marcar("grind")}>🎮 Grind</Button>
            )}

            <Button variant={checkins[diaAtual - 1].estudo ? "default" : "outline"} className="w-full" onClick={() => marcar("estudo")}>📚 Estudo</Button>
            <Button variant={checkins[diaAtual - 1].pcRegrado ? "default" : "outline"} className="w-full" onClick={() => marcar("pcRegrado")}>💻 Uso do PC</Button>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">📝 Observações do dia</label>
            <Textarea
              className="bg-gray-900 border-gray-600 text-white"
              placeholder="Anotações, reflexões..."
              value={checkins[diaAtual - 1].obs}
              onChange={(e) => atualizarObs(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-2">
        <Button className="w-1/2" disabled={diaAtual === 1} onClick={() => setDiaAtual(diaAtual - 1)}>⬅ Dia {diaAtual - 1}</Button>
        <Button className="w-1/2" disabled={diaAtual === totalDias} onClick={() => setDiaAtual(diaAtual + 1)}>Dia {diaAtual + 1} ➡</Button>
      </div>
    </div>
  );
}
