import React from 'react'
import { Award, CheckCircle2, XCircle, AlertTriangle, Scale, Shield, ArrowRight } from 'lucide-react'
import verdictData from '../data/pragmatic_verdict.json'

export default function PragmaticVerdictSection() {
  const { scorecard_geral, onde_a_gestao_acerta, onde_a_gestao_erra_grosseiramente, conclusao_para_o_trabalhador } = verdictData

  const scorecardItems = [
    { label: 'Arrecadação e Caixa', data: scorecard_geral.arrecadacao_e_caixa, color: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
    { label: 'Articulação Estadual (MT-322)', data: scorecard_geral.articulacao_estadual, color: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
    { label: 'Educação e Creches', data: scorecard_geral.educacao_e_creches, color: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
    { label: 'Controle da Máquina e Diárias', data: scorecard_geral.controle_da_maquina, color: 'text-red-400', badge: 'bg-red-500/10 text-red-300 border-red-500/20' },
    { label: 'Asfalto dos Bairros', data: scorecard_geral.investimento_em_asfalto, color: 'text-red-400', badge: 'bg-red-500/10 text-red-300 border-red-500/20' },
    { label: 'Integridade na Saúde e UPA', data: scorecard_geral.integridade_na_saude, color: 'text-red-400', badge: 'bg-red-500/10 text-red-300 border-red-500/20' },
  ]

  return (
    <section id="veredito" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Resumão Consolidado</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Veredito Pragmático: Onde a Gestão Acerta e Onde Erra Grosseiramente
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Para amarrar todo o storytelling de dados com objetividade total: 
          veja o placar final da eficiência municipal com base nas provas do Tesouro Nacional, do PNCP e da Justiça.
        </p>
      </div>

      {/* Scorecard da Gestão (Placar de Eficiência) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl mb-12">
        <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
              Auditoria de Desempenho
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Placar Geral da Gestão Municipal (2024 - 2026)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            Base Materialista
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scorecardItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-white">{item.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badge}`}>
                    {item.data.nota}
                  </span>
                </div>
                <div className={`text-xs font-extrabold ${item.color} mb-1`}>
                  {item.data.status}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {item.data.motivo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duas Colunas: Onde Acerta vs Onde Erra */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Onde Acerta */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/10 border border-emerald-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Onde a Gestão Acerta (Avanços Reais)</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-6">
              Pontos Positivos Que Devem Ser Reconhecidos
            </h3>

            <div className="space-y-4">
              {onde_a_gestao_acerta.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <h4 className="font-bold text-xs sm:text-sm text-emerald-300 mb-1">
                    ✓ {p.ponto}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.detalhe}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Onde Erra Grosseiramente */}
        <div className="p-6 sm:p-8 rounded-2xl bg-red-950/10 border border-red-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider mb-2">
              <XCircle className="w-5 h-5" />
              <span>Onde a Gestão Erra Grosseiramente</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-6">
              Falhas Materiais e Gargalos Que o Povo Paga a Conta
            </h3>

            <div className="space-y-4">
              {onde_a_gestao_erra_grosseiramente.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <h4 className="font-bold text-xs sm:text-sm text-red-300 mb-1">
                    ✗ {p.ponto}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.detalhe}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Box de Conclusão Final e Chamada à Ação Cívica */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 shadow-2xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
          A Conclusão Final do Cidadão Trabalhador
        </span>
        <h3 className="text-2xl font-black text-white leading-tight">
          O Que Fazer Com Essa Informação?
        </h3>

        <p className="mt-4 text-slate-300 text-sm leading-relaxed">
          {conclusao_para_o_trabalhador}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#politicos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <span>Ir Para a Lista de Políticos e Cobrar Agora</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/dossie-auditoria-peixoto.pdf"
            download="Dossie-Auditoria-Peixoto-de-Azevedo.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
          >
            <span>Baixar Este Relatório em PDF Para Imprimir</span>
          </a>
        </div>
      </div>
    </section>
  )
}
