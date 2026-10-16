import React, { useState } from 'react'
import { Newspaper, ExternalLink, ShieldCheck, CheckCircle2, AlertOctagon, Scale, Info } from 'lucide-react'
import mediaData from '../data/news_media.json'

export default function MediaPluralSection() {
  const [filterMode, setFilterMode] = useState('TODAS') // 'TODAS', 'POSITIVAS', 'ESCANDALOS'

  const { aviso_metodologico, veiculos_mapeados, noticias_positivas_avancos, noticias_escandalos_investigacoes } = mediaData

  const allNews = [
    ...noticias_positivas_avancos.map(n => ({ ...n, category: 'POSITIVA' })),
    ...noticias_escandalos_investigacoes.map(n => ({ ...n, category: 'ESCANDALO' }))
  ]

  const displayedNews = allNews.filter(n => {
    if (filterMode === 'POSITIVAS') return n.category === 'POSITIVA'
    if (filterMode === 'ESCANDALOS') return n.category === 'ESCANDALO'
    return true
  })

  return (
    <section id="midia-noticias" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Mídia Plural & Sem Viés</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          O Papel da Imprensa: O Que os Jornais Estão Noticiando?
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Para garantir total imparcialidade, não dependemos de um único veículo. 
          Cruzamos reportagens de grandes redes (G1 MT), portais jurídicos especializados (Olhar Direto), 
          veículos estaduais (MidiaNews) e jornais locais do Nortão (Notícia Exata). 
          Aqui documentamos tanto as <b>conquistas reais</b> quanto os <b>escândalos e decisões da Justiça</b>.
        </p>
      </div>

      {/* Banner de Imparcialidade e Veículos Mapeados */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Princípio da Pluralidade Jornalística</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            {veiculos_mapeados.map((v, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                {v.nome}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-300 leading-relaxed">
          {aviso_metodologico}
        </p>
      </div>

      {/* Controles de Filtro */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setFilterMode('TODAS')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterMode === 'TODAS' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todas as Notícias ({allNews.length})
          </button>
          <button
            onClick={() => setFilterMode('POSITIVAS')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterMode === 'POSITIVAS' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Avanços & Obras Reais ({noticias_positivas_avancos.length})
          </button>
          <button
            onClick={() => setFilterMode('ESCANDALOS')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterMode === 'ESCANDALOS' ? 'bg-red-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Escândalos & Decisões da Justiça ({noticias_escandalos_investigacoes.length})
          </button>
        </div>
      </div>

      {/* Grid de Notícias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedNews.map((n) => {
          const isScandal = n.category === 'ESCANDALO'

          return (
            <div
              key={n.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-lg ${
                isScandal
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-red-500/30 hover:border-red-500/50'
                  : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-emerald-500/30 hover:border-emerald-500/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isScandal
                      ? 'bg-red-500/20 text-red-300 border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {isScandal ? 'Investigação / Justiça' : 'Avanço / Infraestrutura'}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400">
                    {n.data}
                  </span>
                </div>

                <div className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Fonte: {n.veiculo}</span>
                </div>

                <h3 className="text-base font-extrabold text-white leading-snug mt-1">
                  {n.titulo}
                </h3>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {n.resumo}
                </p>
              </div>

              {/* Avaliação Pragmática */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="font-bold text-slate-300 block mb-0.5 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Avaliação Pragmática:</span>
                  </span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    {n.avaliacao_pragmatica}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
