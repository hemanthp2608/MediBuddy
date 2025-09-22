import React, { useEffect, useState, useMemo } from 'react'
import { fetchTrending } from '../services/api'
import useFetchCoins from '../hooks/useFetchCoins'
import Loader from './Loader'

export default function Highlights(){
  const { data, loading } = useFetchCoins(1, 100) // load first 100 for highlights
  const [trending, setTrending] = useState([])
  useEffect(() => {
    fetchTrending().then(r=> setTrending(r.coins || [] )).catch(()=>{})
  }, [])

  const topGainers = useMemo(() => {
    return [...data].sort((a,b)=> (b.price_change_percentage_24h||0) - (a.price_change_percentage_24h||0)).slice(0,5)
  }, [data])

  const topLosers = useMemo(() => {
    return [...data].sort((a,b)=> (a.price_change_percentage_24h||0) - (b.price_change_percentage_24h||0)).slice(0,5)
  }, [data])

  const highVol = useMemo(()=> {
    return [...data].sort((a,b)=> (b.total_volume||0) - (a.total_volume||0)).slice(0,5)
  }, [data])

  if(loading) return <Loader />

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Trending</h3>
        <ul className="text-sm mt-2 space-y-1">
          {trending.map((t,idx)=> <li key={idx} className="flex items-center gap-2"><img src={t.item.small} className="w-5 h-5" /> {t.item.name} <span className="text-xs text-slate-500 ml-auto">{t.item.symbol}</span></li>)}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Top Gainers (24h)</h3>
        <ul className="text-sm mt-2">
          {topGainers.map(c=> <li key={c.id} className="flex justify-between"><span>{c.name}</span><span className="text-green-600">{c.price_change_percentage_24h?.toFixed(2)}%</span></li>)}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Top Losers (24h)</h3>
        <ul className="text-sm mt-2">
          {topLosers.map(c=> <li key={c.id} className="flex justify-between"><span>{c.name}</span><span className="text-red-600">{c.price_change_percentage_24h?.toFixed(2)}%</span></li>)}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Highest Volume</h3>
        <ul className="text-sm mt-2">
          {highVol.map(c=> <li key={c.id} className="flex justify-between"><span>{c.name}</span><span className="text-slate-600">${Math.round(c.total_volume).toLocaleString()}</span></li>)}
        </ul>
      </div>
    </div>
  )
}
