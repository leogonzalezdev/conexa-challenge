'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { Character } from '@/types/types'
import { CharacterCard, CharacterSkeleton } from '../CharacterCard'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  episodeCode: string
  characters: Character[]
  isLoading?: boolean
}

const EpisodeDetailModal = ({ isOpen, onClose, title, episodeCode, characters, isLoading }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#111] p-6 text-white shadow-xl transition-all">
                <DialogTitle className="text-lg font-semibold">
                  {title} ({episodeCode})
                </DialogTitle>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                      <CharacterSkeleton key={i} />
                    ))
                    : characters.map((char) => (
                      <CharacterCard key={char.id} character={char} onSelect={() => { }} />
                    ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EpisodeDetailModal