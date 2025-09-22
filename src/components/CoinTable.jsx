import React, { useMemo, useState } from 'react'
import useFetchCoins from '../hooks/useFetchCoins'
import Loader from './Loader'
import ErrorState from './ErrorState'
import CoinRow from './CoinRow'

export default function CoinTable(){
  const [page, setPage] = useState(1)
  const [perPage] = useState(50)
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [selected, setSelected] = useState(null)

  const { data, loading, error, reload } = useFetchCoins(page, perPage)

  const filtered = useMemo(() => {
    if(!query) return data
    const q = query.toLowerCase()
    return data.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q))
  }, [data, query])

  const sorted = useMemo(() => {
    if(!sortKey) return filtered
    const arr = [...filtered]
    arr.sort((a,b) => {
      if(sortKey === 'price') return b.current_price - a.current_price
      if(sortKey === 'change') return b.price_change_percentage_24h - a.price_change_percentage_24h
      if(sortKey === 'market_cap') return b.market_cap - a.market_cap
      if(sortKey === 'volume') return b.total_volume - a.total_volume
      return 0
    })
    return arr
  }, [filtered, sortKey])

  function onRowClick(coin){
    setSelected(coin)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name or symbol" className="flex-1 border rounded px-3 py-2" />
        <select value={sortKey||''} onChange={(e)=>setSortKey(e.target.value||null)} className="border rounded px-2 py-2">
          <option value="">Sort</option>
          <option value="price">Price</option>
          <option value="change">24h Change %</option>
          <option value="market_cap">Market Cap</option>
          <option value="volume">24h Volume</option>
        </select>
        <button className="px-3 py-2 border rounded" onClick={()=>reload()}>Refresh</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-slate-500">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">24h</th>
              <th className="px-3 py-2">Market Cap</th>
              <th className="px-3 py-2">24h Volume</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="6"><Loader /></td></tr>}
            {error && <tr><td colSpan="6"><ErrorState message={error.message} onRetry={reload} /></td></tr>}
            {!loading && !error && sorted.map(c => <CoinRow key={c.id} coin={c} onClick={onRowClick} />)}
            {!loading && !error && sorted.length === 0 && <tr><td colSpan="6" className="p-4 text-center text-slate-500">No results</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-slate-600">Page {page}</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded" onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
          <button className="px-3 py-1 border rounded" onClick={()=>setPage(p=>p+1)}>Next</button>
        </div>
      </div>

      {selected && (
        <div className="mt-4 p-4 border rounded bg-slate-50">
          <div className="flex items-center gap-3">
            <img src={selected.image} className="w-10 h-10" />
            <div>
              <div className="font-semibold">{selected.name} ({selected.symbol})</div>
              <div className="text-sm text-slate-600">Rank: {selected.market_cap_rank}</div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>Price: ${selected.current_price}</div>
            <div>24h Change: {selected.price_change_percentage_24h?.toFixed(2)}%</div>
            <div>Market Cap: ${selected.market_cap?.toLocaleString()}</div>
            <div>Volume: ${selected.total_volume?.toLocaleString()}</div>
          </div>
          <div className="mt-3 text-right"><button className="px-2 py-1 border rounded" onClick={()=>setSelected(null)}>Close</button></div>
        </div>
      )}
    </div>
  )
}
