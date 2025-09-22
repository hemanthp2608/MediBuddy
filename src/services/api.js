import axios from 'axios'

const BASE = import.meta.env.VITE_COINGECKO_API_BASE || 'https://api.coingecko.com/api/v3'

const api = axios.create({
  baseURL: BASE,
  timeout: 10000
})

export async function fetchMarkets({ vs_currency='usd', per_page=50, page=1, order='market_cap_desc' } = {}){
  const res = await api.get('/coins/markets', {
    params: { vs_currency, per_page, page, order, sparkline: false, price_change_percentage: '24h' }
  })
  return res.data
}

export async function fetchTrending(){
  const res = await api.get('/search/trending')
  return res.data
}

export async function fetchCoin(id){
  const res = await api.get(`/coins/${id}`)
  return res.data
}
