'use client'

import { useState } from 'react'
import Image from 'next/image'
import { prominent } from 'color.js'
import debounce from 'lodash.debounce'
import { Character } from '@/types/types'
import CharacterDetailModal from '../CharacterDetailModal'

type Props = {
  character: Character,
  selected?: boolean,
  onSelect: (id: Character) => void,
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'text-green-400'
    case 'dead':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

const Card = ({ character, selected, onSelect }: Props) => {
  const { image, name, status, species } = character;
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hoverColor, setHoverColor] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const handleClick = () => onSelect(character)

  const extractColor = debounce(async (src: string) => {
    const [r, g, b] = await prominent(src, { amount: 1 }) as [number, number, number]
    setHoverColor(`rgba(${r}, ${g}, ${b}, 0.4)`)
  }, 100)

  const handleMouseEnter = () => {
    extractColor(image)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={
        `relative w-full max-w-xs cursor-pointer rounded-3xl p-4 shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.01] backdrop-blur-2xl group ${selected ? 'bg-[#112E2B]' : 'bg-[#1a1a1a]'}`
      }
    >
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-500 rounded-3xl"
        style={{
          backgroundColor: selected ? '#112E2B' : hoverColor ?? 'transparent',
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="relative w-full aspect-[5/3] overflow-hidden rounded-xl z-10 group">
        <div className="relative h-full w-full">
          {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-700" />}
          <Image
            fill
            src={image}
            alt={name}
            onLoad={() => setImageLoaded(true)}
            className="h-full w-full object-cover transition-all duration-500 image-mask-fade"
          />
        </div>
      </div>

      <div className="mt-4 space-y-1 z-10 relative">
        <h3 title={name} className="text-lg font-light text-white truncate whitespace-nowrap overflow-hidden">
          {name}
        </h3>
        <p title={`${status} — ${species}`} className="flex items-center gap-1 text-sm truncate whitespace-nowrap overflow-hidden">
          <span className={`${getStatusColor(status)} font-medium`}>{status}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-400">{species}</span>
        </p>
      </div>
      <button
        onClick={() => setIsOpenDetail(true)}
        className="relative z-10 mt-4 w-full rounded-xl border border-[#00B5CC]/30 bg-[#00B5CC]/10 px-4 py-2 text-sm font-medium text-[#00B5CC] transition hover:bg-[#00B5CC]/20 hover:text-white cursor-pointer"
      >
        View more
      </button>
      <CharacterDetailModal
        character={character}
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
      />
    </div>
  )
}

export default Card