'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import EpisodeCard from '@/components/EpisodeCard'
import useGroupedEpisodes from '@/hooks/useGroupedEpisodes'
import { useCharacterStore } from '@/stores/useCharacterStore'
import { Episode } from '@/types/types'
import useCharactersByEpisode from '@/hooks/useCharactersByEpisode'
import EpisodeDetailModal from '@/components/EpisodeDetailModal'
import NotFoundImage from '@/assets/no_results.png'
import { Users2 } from 'lucide-react'

const SkeletonEpisodeCard = () => (
  <div className="w-full max-w-2xl animate-pulse rounded-xl bg-[#1f1f1f] p-4 shadow-md border border-white/5 h-[90px] mb-1" />
)

type EpisodesListContainerProps = {
  list: Episode[]
  title: string
  isLoading?: boolean,
  onClick: (episode: Episode) => void
}

const EpisodesListContainer = ({ list, title, isLoading, onClick }: EpisodesListContainerProps) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <div className="flex-1 max-h-[60vh] overflow-auto custom-scroll px-2 pr-3">
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => <SkeletonEpisodeCard key={i} />)
        : list.length > 0
          ? list.map((ep, i) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
              className="mb-1"
            >
              <EpisodeCard onClick={onClick} episode={ep} />
            </motion.div>
          ))
          :
          <div className="text-sm text-gray-500 italic text-center py-6">
            <Image
              alt="No Results"
              src={NotFoundImage}
              className="w-60 md:w-70 mx-auto mb-4 opacity-70"
            />
            No episodes to display.
          </div>
      }
    </div>
  </div>
)

const EpisodesList = () => {
  const { episodesCharOneOnly, episodesCharTwoOnly, episodesShared, isLoading } = useGroupedEpisodes()
  const { selectedCharOne, selectedCharTwo } = useCharacterStore()
  const [episodeDetail, setEpisodeDetail] = useState<Episode | null>(null)
  const { characters, isLoading: isLoadingDetail } = useCharactersByEpisode(
    episodeDetail?.characters || [],
    episodeDetail?.id?.toString() || 'episode'
  )

  const bothSelected = selectedCharOne && selectedCharTwo

  if (!bothSelected) {
    return (
      <div className="p-8 text-center text-gray-300 text-lg flex flex-col items-center gap-4">
        <Users2 className="w-10 h-10 text-[#00B5CC]" />
        <p className="max-w-md text-balance leading-relaxed">
          Please <span className="text-[#00B5CC] font-medium">select two characters</span> to view the list of shared and individual episodes.
        </p>
      </div>

    )
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-8 pb-14">
      <EpisodesListContainer title="Only Character #1" list={episodesCharOneOnly} isLoading={isLoading} onClick={setEpisodeDetail} />
      <EpisodesListContainer title="Shared Episodes" list={episodesShared} isLoading={isLoading} onClick={setEpisodeDetail} />
      <EpisodesListContainer title="Only Character #2" list={episodesCharTwoOnly} isLoading={isLoading} onClick={setEpisodeDetail} />

      <EpisodeDetailModal
        isOpen={!!episodeDetail}
        onClose={() => setEpisodeDetail(null)}
        title={episodeDetail?.name ?? ''}
        episodeCode={episodeDetail?.episode ?? ''}
        characters={characters}
        isLoading={isLoadingDetail}
      />
    </section>
  )
}

export default EpisodesList
