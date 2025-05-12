'use client'

import { toast } from 'sonner'
import { Character } from '@/types/types'
import Footer from '@/components/Footer'
import EpisodiesList from '@/components/EpisodesList'
import CharactersList from '@/components/CharactersList'
import { useCharacterStore } from '@/stores/useCharacterStore'

const HomePage = () => {
  const { selectedCharOne, selectedCharTwo, setSelectedCharTwo, setSelectedCharOne } = useCharacterStore();

  const handleSelectCharOne = (character: Character) => {
    if (selectedCharTwo?.id === character?.id) {
      toast.warning('You already selected this character in Character #2')
      return
    }
    setSelectedCharOne(character)
  }

  const handleSelectCharTwo = (character: Character) => {
    if (selectedCharOne?.id === character?.id) {
      toast.warning('You already selected this character in Character #1')
      return
    }
    setSelectedCharTwo(character)
  }

  return (
    <main className='pr-3'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
        <CharactersList
          title="Character #1"
          storeKey="charOne"
          selectedCharacter={selectedCharOne}
          onSelect={handleSelectCharOne}
        />
        <CharactersList
          title="Character #2"
          storeKey="charTwo"
          selectedCharacter={selectedCharTwo}
          onSelect={handleSelectCharTwo}
        />
      </div>
      <EpisodiesList />
      <Footer/>
    </main>
  )
}

export default HomePage