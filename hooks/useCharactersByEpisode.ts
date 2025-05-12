'use client'

import useSWR from 'swr'
import axios from 'axios'
import { Character } from '@/types/types'

const fetchCharacters = async (urls: string[]): Promise<Character[]> => {
  const responses = await Promise.all(
    urls.map((url) => axios.get<Character>(url).then((res) => res.data))
  )
  return responses
}

const useCharactersByEpisode = (characterUrls: string[], keyPrefix: string) => {
  const urls = [...new Set(characterUrls)].sort()
  const key = urls.length > 0 ? `${keyPrefix}::${urls.join(',')}` : null

  const { data, error, isLoading } = useSWR(
    key,
    () => fetchCharacters(urls),
    { revalidateOnFocus: false }
  )

  return {
    characters: data ?? [],
    isLoading,
    isError: !!error,
  }
}

export default useCharactersByEpisode
