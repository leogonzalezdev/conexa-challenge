import { useMemo } from 'react'
import { useCharacterStore } from '@/stores/useCharacterStore'
import useEpisodesByCharacters from '@/hooks/useEpisodesByCharacters'

const useGroupedEpisodes = () => {
  const { selectedCharOne, selectedCharTwo } = useCharacterStore()

  const eps1 = useMemo(() => selectedCharOne?.episode?.filter(Boolean) ?? [], [selectedCharOne])
  const eps2 = useMemo(() => selectedCharTwo?.episode?.filter(Boolean) ?? [], [selectedCharTwo])

  const shouldFetch = eps1.length > 0 && eps2.length > 0

  const sharedEpisodes = useMemo(() => {
    return shouldFetch ? eps1.filter((ep) => eps2.includes(ep)) : []
  }, [eps1, eps2, shouldFetch])

  const one = useEpisodesByCharacters(shouldFetch ? eps1 : [])
  const two = useEpisodesByCharacters(shouldFetch ? eps2 : [])
  const both = useEpisodesByCharacters(shouldFetch ? sharedEpisodes : [])

  return {
    episodesCharOneOnly: one.episodes,
    episodesCharTwoOnly: two.episodes,
    episodesShared: both.episodes,
    isLoading: one.isLoading || two.isLoading || both.isLoading,
  }
}

export default useGroupedEpisodes
