import React from 'react'
import { Target, CheckCircle2, Clock, AlertTriangle, XCircle, ArrowUpRight } from 'lucide-react'
import planData from '../data/government_plan.json'

export default function GovernmentPlanSection() {
  const { candidato, coligacao, registro_tse, resumo_execucao, metas } = planData

  return (
    <section id="plano-governo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Metômetro Eleitoral TSE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Plano de Governo: Promessas de Campanha vs. O Que Foi Feito
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Toda campanha eleitoral promete transformar a cidade. Registrado oficialmente no TSE, o plano de governo 
          do prefeito <b>{candidato}</b> foi auditado item por item frente aos balanços do SICONFI e aos contratos do PNCP.
        </p>
      </div>

      {/* Box do Metômetro Geral */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Desempenho Geral Consolidado</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {resumo_execucao.media_geral_atingida}% das Metas Executadas
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {resumo_execucao.metas_avancadas} metas avançaram com apoio estadual • {resumo_execucao.metas_criticas_atrasadas} metas críticas em atraso ou sob apuração judicial
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-lg inline-block">
              {registro_tse}
            </span>
          </div>
        </div>

        {/* Barra de Progresso Geral */}
        <div className="mt-6">
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              style={{ width: `${resumo_execucao.media_geral_atingida}%` }}
              className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 rounded-full transition-all duration-1000"
            />
          </div>
          <p className="mt-3 text-xs text-slate-300 leading-relaxed italic">
            "{resumo_execucao.diagnostico_metrometro}"
          </p>
        </div>
      </div>

      {/* Grid de Metas Auditadas */}
      <div className="space-y-6">
        {metas.map((m, idx) => (
          <div
            key={m.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400 font-mono">
                  0{idx + 1}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {m.eixo}
                  </span>
                  <h4 className="text-base font-extrabold text-white mt-0.5">
                    {m.promessa_campanha}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded border ${
                  m.percentual_atingido >= 65 ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                  m.percentual_atingido >= 45 ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                  'bg-red-500/10 text-red-300 border-red-500/20'
                }`}>
                  {m.status}
                </span>
                <span className="text-lg font-black font-mono text-white">
                  {m.percentual_atingido}%
                </span>
              </div>
            </div>

            {/* Barra de Progresso Individual */}
            <div className="mt-4 h-2 w-full bg-slate-950 rounded-full overflow-hidden">
              <div
                style={{ width: `${m.percentual_atingido}%` }}
                className={`h-full ${m.progresso_cor}`}
              />
            </div>

            {/* Comparativo: O Que Fez vs O Que Ficou Devendo */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>O Que Foi Feito de Verdade:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {m.o_que_foi_feito}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>O Que Ficou Devendo no Bolso do Cidadão:</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {m.o_que_ficou_devendo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
