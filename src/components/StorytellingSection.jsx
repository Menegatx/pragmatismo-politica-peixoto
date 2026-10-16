import React, { useState } from 'react'
import { AlertCircle, TrendingUp, AlertTriangle, Hospital, Plane, Users, Building, ShieldAlert, Check } from 'lucide-react'

export default function StorytellingSection({ civicData }) {
  const [activeTab, setActiveTab] = useState(0)

  const anomalies = civicData?.anomalias || []

  return (
    <section id="diagnostico" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Storytelling de Dados Fiscais</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          O Paradoxo de Peixoto: Cofre Cheio, Cidade Estrangulada
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          O discurso padrão de qualquer prefeito é sempre o mesmo: <i>"não temos recursos"</i>. 
          Os números oficiais do Tesouro Nacional desmentem categoricamente essa tese. 
          <b> Peixoto de Azevedo não tem problema de receita; tem um gargalo crônico de alocação e prioridades.</b>
        </p>
      </div>

      {/* Grid de 3 grandes pilares do paradoxo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
            <Building className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Ineficiência Estrutural</span>
          <h3 className="text-lg font-bold text-white mt-1">94% na Máquina, 6% em Obras</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            De cada R$ 100 pagos pelo povo, mais de <b>R$ 94 são engolidos pela própria máquina pública</b> (salários, terceirizados, gabinetes e burocracia-meio). Apenas R$ 6 viram investimento real em infraestrutura duradoura.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400">Investimento em Obras:</span>
            <span className="text-red-400 font-bold">6,09% do total</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-5">
            <Hospital className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">Risco Material na Linha de Frente</span>
          <h3 className="text-lg font-bold text-white mt-1">R$ 1,55 Milhão Bloqueados na Justiça</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Contratação emergencial sem concorrência para gerenciar a UPA 24h e o PA de União do Norte resultou em pagamentos acima do teto contratual e pagamento de despesas de outro município com verba de Peixoto.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400">Decisão Judicial TJ-MT:</span>
            <span className="text-red-400 font-bold">Afastamento mantido</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Aumento Sem Retorno</span>
          <h3 className="text-lg font-bold text-white mt-1">Diárias +167% & Terceirizados +46%</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Em apenas 12 meses, as diárias de viagem saltaram de R$ 313 mil para R$ 837 mil. Contratos com pessoas jurídicas explodiram para R$ 43,66 milhões, enquanto a drenagem e asfalto da cidade diminuíram de orçamento.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400">Salto em Diárias:</span>
            <span className="text-amber-400 font-bold">R$ 837.197,00</span>
          </div>
        </div>
      </div>

      {/* Painel Interativo de Anomalias Fiscais Auditadas */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <span>Painel de Anomalias & Ineficiências Críticas</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fatos apurados a partir dos demonstrativos do SICONFI (DCA Anexos I-C, I-D e I-E) e acórdãos do TJ-MT.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 self-start sm:self-auto">
            {anomalies.length} Anomalias Auditadas
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Menu Lateral de Anomalias */}
          <div className="lg:col-span-5 space-y-2">
            {anomalies.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeTab === idx
                    ? 'bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-950/30'
                    : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    item.gravidade === 'CRÍTICA' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.gravidade}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{item.setor}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white mt-2 leading-snug">{item.titulo}</h4>
              </button>
            ))}
          </div>

          {/* Detalhe da Anomalia Selecionada */}
          <div className="lg:col-span-7 bg-slate-950/70 rounded-xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded ${
                  anomalies[activeTab]?.gravidade === 'CRÍTICA'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  Nível de Risco: {anomalies[activeTab]?.gravidade}
                </span>
                <span className="text-xs text-slate-400 font-semibold">• Setor: {anomalies[activeTab]?.setor}</span>
              </div>

              <h4 className="text-xl font-extrabold text-white leading-tight">
                {anomalies[activeTab]?.titulo}
              </h4>

              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                {anomalies[activeTab]?.descricao}
              </p>

              <div className="mt-6 p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Por que isso importa para o trabalhador comum?</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Cada real desviado para diárias sem justificativa ou contratos sem concorrência é um real a menos para o médico no postinho de União do Norte, para a lâmpada do poste ou para tapar os buracos da rua onde passam o ônibus e a moto do cidadão.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Fonte: SICONFI / IBGE / Decisão Judicial TJ-MT</span>
              <a href="#fornecedores" className="text-cyan-400 hover:underline font-semibold">
                Ver fornecedores relacionados →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
