import React, { useState } from 'react'
import { Phone, Mail, MapPin, Users, Award, Shield, Copy, Check, MessageSquare, AlertCircle } from 'lucide-react'
import politiciansData from '../data/politicians.json'

export default function PoliticiansSection() {
  const [activeFilter, setActiveFilter] = useState('TODOS')
  const [copiedId, setCopiedId] = useState(null)

  const { resumo_politico, executivo, legislativo } = politiciansData
  const allPoliticians = [...executivo, ...legislativo]

  const filteredPoliticians = allPoliticians.filter(p => {
    if (activeFilter === 'EXECUTIVO') return p.cargo.includes('Prefeito')
    if (activeFilter === 'LEGISLATIVO') return !p.cargo.includes('Prefeito')
    if (activeFilter === 'MESA') return Boolean(p.mesa_diretora)
    return true
  })

  const copyClaimMessage = (politician) => {
    const text = `Olá, ${politician.nome_urna} (${politician.cargo} de Peixoto de Azevedo). Como cidadão e pagador de impostos, estou acompanhando os dados oficiais do município (arrecadação de R$ 292 Milhões). Cobro a destinação urgente de recursos para asfalto nos bairros e transparência total nos contratos da Saúde e UPA. O dinheiro do povo precisa voltar para a população!`
    navigator.clipboard.writeText(text)
    setCopiedId(politician.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  return (
    <section id="politicos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Cobrança Cívica Direta</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Quem Manda na Cidade: Os Políticos Que Você Precisa Cobrar
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          O artigo 1º da Constituição diz: <i>"todo o poder emana do povo"</i>. 
          Estes são o Prefeito, o Vice e os 13 Vereadores que decidem o destino de <b>R$ 292 Milhões</b>. 
          Veja quem são, seus partidos e use os canais oficiais para cobrar melhorias no seu bairro hoje mesmo.
        </p>
      </div>

      {/* Box de Análise Pragmática: Quem governa Peixoto? */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl mb-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Radiografia Política Oficial</span>
            <h3 className="text-xl font-bold text-white mt-1">
              Quem Controla 100% da Prefeitura e da Câmara?
            </h3>
            <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {resumo_politico.conclusao_pragmatica}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
              UNIÃO: 6 eleitos (Prefeito + 5)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
              PRD: 4 eleitos (Vice + 3)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              MDB: 3 eleitos
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-semibold">
              PSD: 1 • PL: 1
            </span>
          </div>
        </div>

        {/* Fita comparativa do espectro */}
        <div className="mt-6 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Composição Ideológica dos Gestores de Peixoto de Azevedo</span>
            <span className="text-cyan-400 font-mono">100% Centro / Centro-Direita / Direita</span>
          </div>

          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: '40%' }} className="bg-blue-600 h-full" title="UNIÃO Brasil - Centro-Direita (40%)"></div>
            <div style={{ width: '26.7%' }} className="bg-indigo-600 h-full" title="PRD - Centro-Direita/Direita (26.7%)"></div>
            <div style={{ width: '20%' }} className="bg-emerald-600 h-full" title="MDB - Centro (20%)"></div>
            <div style={{ width: '6.7%' }} className="bg-teal-600 h-full" title="PSD - Centro (6.7%)"></div>
            <div style={{ width: '6.6%' }} className="bg-amber-600 h-full" title="PL - Direita (6.6%)"></div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> UNIÃO (40%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> PRD (26,7%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> MDB (20%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span> PSD (6,7%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> PL (6,6%)</span>
            <span className="text-slate-500 italic">Esquerda / Centro-Esquerda: 0%</span>
          </div>
        </div>
      </div>

      {/* Filtros de Navegação */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveFilter('TODOS')}
            className={`px-4 py-2 rounded-lg transition-all ${activeFilter === 'TODOS' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Todos os 15 Políticos ({allPoliticians.length})
          </button>
          <button
            onClick={() => setActiveFilter('EXECUTIVO')}
            className={`px-4 py-2 rounded-lg transition-all ${activeFilter === 'EXECUTIVO' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Prefeitura (Prefeito e Vice)
          </button>
          <button
            onClick={() => setActiveFilter('LEGISLATIVO')}
            className={`px-4 py-2 rounded-lg transition-all ${activeFilter === 'LEGISLATIVO' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Câmara Municipal (13 Vereadores)
          </button>
          <button
            onClick={() => setActiveFilter('MESA')}
            className={`px-4 py-2 rounded-lg transition-all ${activeFilter === 'MESA' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Mesa Diretora da Câmara
          </button>
        </div>
      </div>

      {/* Grid de Cards dos Políticos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoliticians.map((p) => {
          const isCopied = copiedId === p.id
          const isMayor = p.cargo.includes('Prefeito')
          const initials = p.nome_urna.slice(0, 2).toUpperCase()

          return (
            <div
              key={p.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-lg ${
                isMayor
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-500/40 shadow-cyan-950/20'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-slate-800 flex items-center justify-center text-white font-black text-lg border border-slate-700 shadow">
                      {initials}
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-white leading-tight flex items-center gap-2">
                        <span>{p.nome_urna}</span>
                        {isMayor && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Executivo
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium truncate max-w-[180px]">
                        {p.nome_completo}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-300 block">{p.votos} votos</span>
                    <span className="text-[10px] text-slate-500">Eleito 2024</span>
                  </div>
                </div>

                {/* Badges de Partido e Ideologia */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-black bg-slate-950 text-white border border-slate-800">
                    {p.partido}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${p.espectro_cor}`}>
                    {p.espectro}
                  </span>
                  {p.mesa_diretora && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {p.mesa_diretora}
                    </span>
                  )}
                </div>

                {/* Papel Prático e O Que Cobrar */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    O que esse político decide com seu dinheiro:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.papel_pratico}
                  </p>
                </div>
              </div>

              {/* Ações e Contatos Diretos */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <a href={`tel:${p.telefone.replace(/\D/g, '')}`} className="font-mono text-white hover:underline">
                      {p.telefone}
                    </a>
                  </span>
                  <span className="flex items-center gap-1.5 truncate max-w-[150px]">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate" title={p.email}>{p.email}</span>
                  </span>
                </div>

                <button
                  onClick={() => copyClaimMessage(p)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isCopied
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Mensagem de Cobrança Copiada!</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <span>Copiar Mensagem Para Cobrar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
