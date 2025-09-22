import React from 'react'
import CoinTable from './components/CoinTable'
import Highlights from './components/Highlights'

export default function App(){
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Crypto Dashboard</h1>
        <p className="text-sm text-slate-600">Live market overview using CoinGecko</p>
      </header>

      <main className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <CoinTable />
        </section>

        <aside className="bg-white p-4 rounded-lg shadow-sm">
          <Highlights />
        </aside>
      </main>
    </div>
  )
}
