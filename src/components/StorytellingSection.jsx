import React, { useState } from 'react'
import { Home, AlertTriangle, Hospital, Plane, Users, Building, ShieldAlert, Check, HelpCircle, ArrowRight } from 'lucide-react'

export default function StorytellingSection({ civicData }) {
  const [activeTab, setActiveTab] = useState(0)

  const anomalies = civicData?.anomalias || []

  return (
    <section id="diagnostico" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Cabeçalho com Horizontal Logic (Ação em vez de rótulo passivo) */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Storytelling de Dados • Didática Sem Burocracia</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          A Verdade dos Fatos: O Dinheiro Sobra no Banco, Mas Some das Ruas
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Prefeitos e secretários sempre usam a mesma desculpa: <i>"a prefeitura tá sem dinheiro"</i>. 
          Vamos provar, usando uma comparação simples com o orçamento da sua própria casa, 
          como o dinheiro de Peixoto de Azevedo é suficiente — mas foi colocado nos lugares errados.
        </p>
      </div>

      {/* A GRANDE ANALOGIA DA CASA DO TRABALHADOR (Storytelling com Dados de Cole Knaflic) */}
      <div className="mb-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Para Qualquer Cidadão Entender</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                E Se a Prefeitura de Peixoto Fosse a Sua Casa?
              </h3>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            Comparação baseada em <b className="text-emerald-400">R$ 10.000 de renda mensal</b>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Lado Esquerdo: O Cenário Doméstico */}
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Imagine que a sua família tenha uma renda de <b>R$ 10.000 por mês</b>. É um bom dinheiro no interior de Mato Grosso. Dá para viver bem, reformar a casa e cuidar da saúde de todo mundo.
            </p>
            <p className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
              Mas olha o que a administração fez com esses R$ 10.000:
              <br/><br/>
              • Gastou <b>R$ 4.250</b> pagando os salários de quem administra a casa.<br/>
              • Gastou <b>R$ 1.830</b> contratando empresas terceirizadas de fora.<br/>
              • Gastou <b>R$ 1.440</b> só em papelada, gabinetes e materiais de escritório.<br/>
              • Gastou <b>R$ 35</b> pagando diárias de viagens e passeios.<br/>
              • E quando chove e a água entra pelo telhado do quarto dos seus filhos... ela diz que <b className="text-red-400">só sobraram R$ 101</b> para consertar o telhado e arrumar o quintal!
            </p>
            <p className="text-xs text-slate-400 font-medium">
              E o mais revoltante: quando você abre a gaveta da cômoda, você descobre que tem <b className="text-emerald-400">R$ 1.078 guardados em dinheiro vivo</b> para cada R$ 100 de conta para pagar!
            </p>
          </div>

          {/* Lado Direito: O Contraste Visual Impactante (Cole Knaflic's Preattentive Attribute) */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              O Contraste dos Gastos em Peixoto:
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Máquina Administrativa, Gabinetes e Pessoal:</span>
                  <span className="text-white font-mono font-bold">94% dos recursos</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[94%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-red-400 font-bold">Asfalto, Drenagem e Infraestrutura Urbana:</span>
                  <span className="text-red-400 font-mono font-black">Apenas 1% do total!</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[1.01%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 leading-relaxed">
              <b>A Pergunta Que Não Quer Calar:</b> Você aceitaria essa desculpa de "falta de dinheiro" dentro da sua própria casa? Então por que aceitar dos políticos na prefeitura?
            </div>
          </div>
        </div>
      </div>

      {/* Grid de 3 Pilares com Metas e Analogias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
            <Building className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">A Máquina Engolidora</span>
          <h3 className="text-lg font-bold text-white mt-1">94% Gasto Com a Própria Máquina</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            A cada R$ 100 arrecadados dos impostos do trabalhador, R$ 94 são gastos para manter a prefeitura funcionando (salários, terceirizados e gabinetes). <b>Apenas R$ 6 viram obras públicas</b> como asfalto, postos ou escolas.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400">Investimento em Obras:</span>
            <span className="text-red-400 font-bold">Apenas 6,09%</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-5">
            <Hospital className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">O Ralo da Saúde</span>
          <h3 className="text-lg font-bold text-white mt-1">R$ 1,55 Milhão Bloqueados na Justiça</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Contratação emergencial sem licitação para gerenciar a UPA 24h e o Pronto Atendimento de União do Norte. A Justiça de MT bloqueou R$ 1,55M após constatar pagamentos acima do contrato e despesas de outro município bancadas com dinheiro de Peixoto.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400">Decisão Judicial TJ-MT:</span>
            <span className="text-red-400 font-bold">Prefeito afastado da Saúde</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
            <Plane className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Viagens Sem Freio</span>
          <h3 className="text-lg font-bold text-white mt-1">Diárias Saltaram +167% em 1 Ano</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Enquanto as ruas dos bairros sofrem com buracos e poeira, os gastos com diárias de viagens de servidores e gestores saltaram de R$ 313 mil para <b>R$ 837 mil em 2025</b>. Quase 3 vezes mais dinheiro em viagens!
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400">Total em Diárias 2025:</span>
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
              <span>Dossiê das 5 Anomalias Críticas de Peixoto</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Documentado a partir dos balanços oficiais do SICONFI (Tesouro Nacional) e decisões judiciais do Tribunal de Justiça de Mato Grosso.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 self-start sm:self-auto">
            {anomalies.length} Fatos Auditados
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
                  Nível de Alerta: {anomalies[activeTab]?.gravidade}
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
                  <span>O Que Isso Causa na Vida do Cidadão Comum:</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Cada milhão gasto em diárias supérfluas ou contratos sem concorrência é um caminhão de asfalto a menos, um médico a menos na escala da UPA de madrugada, e o pneu da moto do trabalhador furado no buraco.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Fonte: SICONFI / IBGE / Tribunal de Justiça de MT</span>
              <a href="#politicos" className="text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                Cobrar dos políticos responsáveis →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
