import axios from 'axios'

export const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response?.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      }
    }
    throw err
  }
}