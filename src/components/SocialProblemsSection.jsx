import React, { useState } from 'react'
import { AlertCircle, TrendingDown, HeartPulse, GraduationCap, Droplet, MapPin, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import socialData from '../data/social_indicators.json'

export default function SocialProblemsSection() {
  const { indices_sociais, problemas_criticos, perfil_demografico } = socialData
  const [selectedProblem, setSelectedProblem] = useState(0)

  return (
    <section id="problemas-sociais" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>O Ponto de Partida Real da Cidade</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          A Realidade de Peixoto: Riqueza Mineral vs. Pobreza nos Serviços
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Peixoto de Azevedo é uma terra de homens e mulheres trabalhadores, rica em ouro e agropecuária. 
          Mas os números oficiais do IBGE e do PNUD mostram que o povo vive em condições muito abaixo do potencial do município. 
          Veja os problemas críticos e como a prefeitura lidou com eles.
        </p>
      </div>

      {/* 4 Cards de Índices Sociais (Cole Knaflic Simple Text Displays) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        
        {/* IDH-M */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold">IDH Municipal (PNUD)</span>
              <TrendingDown className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">0,671</div>
            <div className="text-[11px] font-bold text-slate-300 mt-1">Nível Médio (68º em MT)</div>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 leading-snug border-t border-slate-800/80 pt-3">
            Mato Grosso tem média de <b>0,774</b> e Matupá tem <b>0,723</b>. A riqueza da cidade não chega aos serviços básicos do povo.
          </p>
        </div>

        {/* Mortalidade Infantil */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-red-500/30 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold">Mortalidade Infantil (IBGE)</span>
              <HeartPulse className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-3xl font-black text-red-400 font-mono">16,05</div>
            <div className="text-[11px] font-bold text-red-300 mt-1">óbitos por mil nascidos</div>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 leading-snug border-t border-slate-800/80 pt-3">
            Quase o dobro da vizinha Matupá (9,80/mil). Revela fragilidade grave na atenção médica de pré-natal e pediatria.
          </p>
        </div>

        {/* Crianças Fora da Escola */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold">Crianças Fora da Escola</span>
              <GraduationCap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">8,95%</div>
            <div className="text-[11px] font-bold text-slate-300 mt-1">Crianças de 6 a 14 anos</div>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 leading-snug border-t border-slate-800/80 pt-3">
            Quase 1 em cada 10 crianças está fora do ensino regular. A prefeitura gasta apenas o piso mínimo obrigatório em educação.
          </p>
        </div>

        {/* Distância e União do Norte */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold">Isolamento Geográfico</span>
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-cyan-400 font-mono">70 km</div>
            <div className="text-[11px] font-bold text-slate-300 mt-1">Sede até União do Norte</div>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 leading-snug border-t border-slate-800/80 pt-3">
            Área territorial imensa (14.398 km²). A distância exige saúde descentralizada, mas o PA local foi alvo de escândalo judicial.
          </p>
        </div>
      </div>

      {/* Tabela de Confronto: O Problema Crítico vs. Como a Prefeitura Agiu */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Confronto Cívico: O Problema Real vs. A Resposta da Prefeitura</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Clique nos problemas abaixo para ver a auditoria de como o poder público tratou cada gargalo.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Seletor de Problemas */}
          <div className="lg:col-span-5 space-y-2">
            {problemas_criticos.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProblem(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedProblem === idx
                    ? 'bg-slate-800/90 border-cyan-500/60 shadow-md'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    p.gravidade === 'CRÍTICA' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {p.gravidade}
                  </span>
                  <span className="text-[11px] text-slate-500">Gargalo #{idx + 1}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white leading-snug mt-1">
                  {p.titulo}
                </h4>
              </button>
            ))}
          </div>

          {/* Detalhe do Confronto com a Auditoria */}
          <div className="lg:col-span-7 p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                Gargalo Estrutural Selecionado:
              </span>
              <h4 className="text-xl font-black text-white leading-tight">
                {problemas_criticos[selectedProblem]?.titulo}
              </h4>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">A Realidade Vivida Pelo Povo:</span>
                <p className="text-slate-400 leading-relaxed">
                  {problemas_criticos[selectedProblem]?.realidade}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-1">O Que a Auditoria dos Dados Revelou:</span>
                <p className="text-slate-300 leading-relaxed">
                  {problemas_criticos[selectedProblem]?.o_que_a_auditoria_revelou}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {problemas_criticos[selectedProblem]?.esta_sendo_resolvido.startsWith('Não') ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : problemas_criticos[selectedProblem]?.esta_sendo_resolvido.startsWith('Parcialmente') ? (
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-white block mb-0.5">A Situação Está Sendo Resolvida?</span>
                  <p className="text-slate-400 leading-relaxed">
                    {problemas_criticos[selectedProblem]?.esta_sendo_resolvido}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
