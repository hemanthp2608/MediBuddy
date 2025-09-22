import { useState, useEffect, useCallback } from 'react'
import { fetchMarkets } from '../services/api'

export default function useFetchCoins(page=1, perPage=50){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async (p=1) => {
    setLoading(true)
    setError(null)
    try {
      const d = await fetchMarkets({ per_page: perPage, page: p })
      setData(d)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [perPage])

  useEffect(() => { load(page) }, [load, page])

  return { data, loading, error, reload: () => load(page) }
}
