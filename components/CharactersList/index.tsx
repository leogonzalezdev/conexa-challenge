'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CharacterCard, CharacterSkeleton } from '@/components/CharacterCard'
import { useInfiniteCharacters } from '@/hooks/useInfiniteCharacters'
import { Character } from '@/types/types'
import { Search, X } from 'lucide-react'
import debounce from 'lodash.debounce'


type Props = {
  title: string
  storeKey: 'charOne' | 'charTwo'
  selectedCharacter: Character | null
  onSelect: (character: Character) => void
}

const CharactersList = ({ title, storeKey, selectedCharacter, onSelect }: Props) => {
  const [currentValue, setCurrentValue] = useState('')
  const [search, setSearch] = useState('')
  const { characters, isLoadingMore, isReachingEnd, loadMore } = useInfiniteCharacters(storeKey, search)

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLoadingMore && !isReachingEnd) {
        loadMore()
      }
    })
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [isLoadingMore, isReachingEnd, loadMore])

  const handleSearch = debounce((value: string) => {
    setSearch(value.trim())
  }, 900)

  const clearSearch = () => {
    setSearch('')
    setCurrentValue('')
  }

  return (
    <section className="relative flex flex-col h-full rounded-xl p-2 pb-6 overflow-hidden bg-gradient-to-br">
      <h2 className="text-2xl font-semibold tracking-tight text-white drop-shadow mb-4 px-2 pt-2 leading-tight">
        {title}
        {selectedCharacter && (
          <span className="ml-2 font-normal text-[#00B5CC]">
            - {selectedCharacter.name}
          </span>
        )}
      </h2>

      <div className="relative mb-4 mx-2">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={currentValue}
          onChange={(e) => {
            setCurrentValue(e.target.value)
            handleSearch(e.target.value)
          }}
          placeholder="Search character..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#2a2a2a] text-white text-sm border border-white/10 
               shadow-sm placeholder:text-gray-400 transition-all duration-200 
               focus:outline-none focus:ring-2 focus:ring-[#00B5CC] focus:border-transparent"
        />
        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>


      <div className="flex-1 overflow-y-auto rounded-4xl max-h-[45vh] custom-scroll scroll-smooth z-10 pr-2">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 justify-center">
          {characters.map((character, i) => (
            <motion.div
              key={`${storeKey}-${character.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.02, ease: 'easeOut' }}
            >
              <CharacterCard
                character={character}
                selected={selectedCharacter?.id === character.id}
                onSelect={onSelect}
              />
            </motion.div>
          ))}
        </div>

        {isLoadingMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <CharacterSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}

        <div ref={sentinelRef} className="text-xl font-semibold mb-2 text-white drop-shadow px-2 pt-2 text-center">
          {
            (!characters.length && !isLoadingMore) ? (
              <div className="text-white text-center text-sm opacity-75 mt-4">
                No characters found. Try a different search.
              </div>
            ) : isReachingEnd ? 'you reached the end' : ''
          }
        </div>

      </div>
    </section>
  )
}

export default CharactersList