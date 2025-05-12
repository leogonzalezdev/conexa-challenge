import useSWR from 'swr'
import axios from 'axios'

const fetchEpisodes = async (urls: string[]) => {
  const uniqueUrls = [...new Set(urls)]
  const responses = await Promise.all(
    uniqueUrls.map((url) => axios.get(url).then((res) => res.data))
  )
  return responses
}

const useEpisodesByCharacters = (episodeUrls: string[]) => {
  const uniqueSorted = [...new Set(episodeUrls)].sort()
  const key = uniqueSorted.length > 0 ? `episodes::${uniqueSorted.join(',')}` : null


  const { data, error, isLoading } = useSWR(
    key,
    () => fetchEpisodes(uniqueSorted),
    { revalidateOnFocus: false }
  )

  return {
    episodes: data ?? [],
    isLoading,
    isError: !!error,
  }
}

export default useEpisodesByCharacters
