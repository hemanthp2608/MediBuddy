import React from 'react'

export default function CoinRow({coin, onClick}){
  const changeClass = coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
  return (
    <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => onClick(coin)}>
      <td className="px-3 py-2 text-sm">{coin.market_cap_rank}</td>
      <td className="px-3 py-2 text-sm flex items-center gap-3">
        <img src={coin.image} alt={coin.symbol} className="w-6 h-6 rounded-full" />
        <div>
          <div className="font-medium">{coin.name}</div>
          <div className="text-xs text-slate-500 uppercase">{coin.symbol}</div>
        </div>
      </td>
      <td className="px-3 py-2 text-sm">${coin.current_price.toLocaleString()}</td>
      <td className={`px-3 py-2 text-sm ${changeClass}`}>
        {coin.price_change_24h?.toFixed(2)} ({coin.price_change_percentage_24h?.toFixed(2)}%)
      </td>
      <td className="px-3 py-2 text-sm">${coin.market_cap?.toLocaleString()}</td>
      <td className="px-3 py-2 text-sm">${coin.total_volume?.toLocaleString()}</td>
    </tr>
  )
}
