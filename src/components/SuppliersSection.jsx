import React, { useState, useMemo } from 'react'
import { Search, Filter, Building2, AlertTriangle, ExternalLink, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react'

export default function SuppliersSection({ contracts, suppliersSummary }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('TODOS')
  const [onlyDispensas, setOnlyDispensas] = useState(false)
  const [onlyHighValue, setOnlyHighValue] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [visibleCount, setVisibleCount] = useState(25)

  const sectors = ['TODOS', 'Saúde', 'Obras e Infraestrutura', 'Educação', 'Combustíveis & Frotas', 'Assessoria & Consultorias', 'Saneamento & Limpeza', 'Eventos & Festividades', 'Administração Geral & Outros']

  const filteredContracts = useMemo(() => {
    return (contracts || []).filter(c => {
      // Busca por termo
      const term = searchTerm.toLowerCase()
      const matchTerm = !term || 
        c.fornecedor.toLowerCase().includes(term) ||
        c.cnpj_cpf.toLowerCase().includes(term) ||
        c.objeto.toLowerCase().includes(term) ||
        c.numero.toLowerCase().includes(term)

      // Setor
      const matchSector = selectedSector === 'TODOS' || c.setor === selectedSector

      // Filtros especiais
      const matchDispensa = !onlyDispensas || c.is_dispensa
      const matchHighValue = !onlyHighValue || c.is_high_value

      return matchTerm && matchSector && matchDispensa && matchHighValue
    })
  }, [contracts, searchTerm, selectedSector, onlyDispensas, onlyHighValue])

  const top10 = suppliersSummary?.suppliers?.slice(0, 5) || []

  return (
    <section id="fornecedores" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>Base Oficial de Compras Públicas (PNCP)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Raio-X de Fornecedores: Siga o Rastro do Dinheiro (CNPJ por CNPJ)
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Consulte individualmente cada contrato firmado pela Prefeitura Municipal de Peixoto de Azevedo (CNPJ 03.238.631/0001-31) 
          registrado no Portal Nacional de Contratações Públicas. Saiba quem recebeu, quanto levou e para quê.
        </p>
      </div>

      {/* Top 5 Fornecedores Cards */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Maiores Concentradores de Recursos Municipais
          </h3>
          <span className="text-xs text-cyan-400 font-semibold">
            Top 10 levam {suppliersSummary?.top10_share || 52.1}% de todo o valor
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {top10.map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-bold text-cyan-400">#{idx + 1}</span>
                  <span className="font-mono text-[10px]">{s.cnpj_cpf}</span>
                </div>
                <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug" title={s.razao_social}>
                  {s.razao_social}
                </h4>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-base font-black text-emerald-400 font-mono">
                  R$ {(s.total_valor / 1000000).toFixed(2)} Mi
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {s.share_percent.toFixed(1)}% de todos os contratos
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por Razão Social, CNPJ ou Objeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyDispensas}
                onChange={(e) => setOnlyDispensas(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0"
              />
              <span>Somente Dispensas & Inexigibilidades</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyHighValue}
                onChange={(e) => setOnlyHighValue(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0"
              />
              <span>Grandes Contratos (≥ R$ 500k)</span>
            </label>
          </div>
        </div>

        {/* Categorias / Setores */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedSector === sec
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Contratos */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Mostrando <b>{Math.min(visibleCount, filteredContracts.length)}</b> de <b>{filteredContracts.length}</b> contratos filtrados</span>
          <span>Fonte: API PNCP Oficial (Lei 14.133/21)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-12">Nº</th>
                <th className="py-3.5 px-4">Fornecedor / Razão Social</th>
                <th className="py-3.5 px-4">CNPJ / CPF</th>
                <th className="py-3.5 px-4">Setor</th>
                <th className="py-3.5 px-4 text-right">Valor Inicial</th>
                <th className="py-3.5 px-4 text-center">Ano</th>
                <th className="py-3.5 px-4 text-center">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredContracts.slice(0, visibleCount).map((c, idx) => {
                const isExpanded = expandedId === c.id
                return (
                  <React.Fragment key={c.id || idx}>
                    <tr className="hover:bg-slate-850/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400">{c.numero}</td>
                      <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate">{c.fornecedor}</span>
                          {c.is_dispensa && (
                            <span className="shrink-0 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Sem Licitação
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{c.cnpj_cpf}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          c.setor === 'Saúde' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          c.setor === 'Obras e Infraestrutura' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          c.setor === 'Educação' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {c.setor}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white text-right">
                        R$ {c.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-center text-slate-400">{c.ano}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : c.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Linha expansível com o Objeto do Contrato */}
                    {isExpanded && (
                      <tr className="bg-slate-950/80">
                        <td colSpan="7" className="p-4 border-l-2 border-cyan-500">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-cyan-400">
                              <FileText className="w-3.5 h-3.5" />
                              <span>Objeto Contratual Completo:</span>
                            </div>
                            <p className="text-slate-300 text-xs font-mono leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                              {c.objeto || 'Objeto não especificado no cadastro do PNCP.'}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                              <span>Vigência: <b>{c.data_inicio || 'N/I'}</b> até <b>{c.data_fim || 'N/I'}</b></span>
                              <span>Tipo: <b>{c.modalidade}</b></span>
                              <span>ID PNCP: <code className="text-slate-300">{c.id}</code></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}

              {filteredContracts.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    Nenhum contrato encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botão de Carregar Mais */}
        {visibleCount < filteredContracts.length && (
          <div className="p-4 border-t border-slate-800 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 25)}
              className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Carregar Mais Contratos ({filteredContracts.length - visibleCount} restantes)
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
