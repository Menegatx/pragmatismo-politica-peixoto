import React, { useState } from 'react'
import Navbar from './components/Navbar'
import TabNavigation from './components/TabNavigation'
import HeroSection from './components/HeroSection'
import StorytellingSection from './components/StorytellingSection'
import SocialProblemsSection from './components/SocialProblemsSection'
import GovernmentPlanSection from './components/GovernmentPlanSection'
import TaxCalculatorSection from './components/TaxCalculatorSection'
import RegionalBenchmarkSection from './components/RegionalBenchmarkSection'
import SuppliersSection from './components/SuppliersSection'
import MediaPluralSection from './components/MediaPluralSection'
import PoliticiansSection from './components/PoliticiansSection'
import PragmaticVerdictSection from './components/PragmaticVerdictSection'
import ApiStatusSection from './components/ApiStatusSection'
import Footer from './components/Footer'

// Import pre-processed official data
import civicData from './data/civic_indicators.json'
import suppliersSummary from './data/suppliers_summary.json'
import budgetData from './data/budget_comparison.json'
import contracts from './data/contracts.json'

export default function App() {
  const [activeTab, setActiveTab] = useState('TODOS')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      <Navbar />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {/* O Hero sempre fica no topo para contextualizar */}
        <HeroSection 
          civicData={civicData} 
          budgetData={budgetData} 
        />

        {/* 1. Diagnóstico & A Analogia da Casa */}
        {(activeTab === 'TODOS' || activeTab === 'DIAGNOSTICO') && (
          <StorytellingSection 
            civicData={civicData} 
          />
        )}

        {/* 2. Problemas Críticos (IDH, IBGE, Saneamento, Evasão) */}
        {(activeTab === 'TODOS' || activeTab === 'PROBLEMAS') && (
          <SocialProblemsSection />
        )}

        {/* 3. Plano de Governo TSE (Promessas vs. Realidade) */}
        {(activeTab === 'TODOS' || activeTab === 'PLANO') && (
          <GovernmentPlanSection />
        )}

        {/* 4. Gastos, Fornecedores & Comparativo Regional */}
        {(activeTab === 'TODOS' || activeTab === 'GASTOS') && (
          <>
            <TaxCalculatorSection 
              civicData={civicData} 
            />

            <RegionalBenchmarkSection 
              budgetData={budgetData} 
            />

            <SuppliersSection 
              contracts={contracts} 
              suppliersSummary={suppliersSummary} 
            />
          </>
        )}

        {/* 5. Mídia Plural & Notícias (Avanços e Escândalos) */}
        {(activeTab === 'TODOS' || activeTab === 'MIDIA') && (
          <MediaPluralSection />
        )}

        {/* 6. Quem Cobrar (15 Políticos) */}
        {(activeTab === 'TODOS' || activeTab === 'POLITICOS') && (
          <PoliticiansSection />
        )}

        {/* 7. Veredito Final (Resumão Pragmático) */}
        {(activeTab === 'TODOS' || activeTab === 'VEREDITO') && (
          <PragmaticVerdictSection />
        )}

        {/* Status das APIs & Central de Download */}
        <ApiStatusSection />
      </main>

      <Footer />
    </div>
  )
}
