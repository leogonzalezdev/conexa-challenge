'use client'

import { Episode } from '@/types/types'
import { motion } from 'framer-motion'

type Props = {
  episode: Episode,
  onClick: (episode: Episode) => void
}

const EpisodeCard = ({ episode, onClick }: Props) => {
  return (
    <motion.div
      onClick={() => onClick(episode)}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex w-full max-w-2xl items-center gap-4 rounded-xl bg-[#1a1a1a] p-4 shadow-md border border-white/5 hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
    >
      <div className="flex flex-col">
        <span className="text-sm text-[#00B5CC] font-medium">{episode.episode}</span>
        <h3 className="text-lg font-semibold text-white">{episode.name}</h3>
        <p className="text-sm text-gray-400">{episode.air_date}</p>
      </div>
    </motion.div>
  )
}

export default EpisodeCard
