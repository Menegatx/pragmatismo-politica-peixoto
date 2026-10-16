import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StorytellingSection from './components/StorytellingSection'
import TaxCalculatorSection from './components/TaxCalculatorSection'
import RegionalBenchmarkSection from './components/RegionalBenchmarkSection'
import SuppliersSection from './components/SuppliersSection'
import PoliticiansSection from './components/PoliticiansSection'
import ApiStatusSection from './components/ApiStatusSection'
import Footer from './components/Footer'

// Import pre-processed official data
import civicData from './data/civic_indicators.json'
import suppliersSummary from './data/suppliers_summary.json'
import budgetData from './data/budget_comparison.json'
import contracts from './data/contracts.json'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1">
        <HeroSection 
          civicData={civicData} 
          budgetData={budgetData} 
        />

        <StorytellingSection 
          civicData={civicData} 
        />

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

        <PoliticiansSection />

        <ApiStatusSection />
      </main>

      <Footer />
    </div>
  )
}
