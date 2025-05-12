'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { Character } from '@/types/types'
import Image from 'next/image'
import { HeartPulse, MapPin, User, UsersRound, Zap } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
  character: Character | null
}

const CharacterDetailModal = ({ isOpen, onClose, character }: Props) => {
  if (!character) return null

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
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] p-6 text-white shadow-2xl transition-all border border-[#00B5CC]/30">
                <DialogTitle className="text-3xl font-extrabold text-center text-[#00B5CC] mb-6 tracking-wide">
                  {character.name}
                </DialogTitle>

                <div className="flex flex-col items-center gap-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg ring-2 ring-[#00B5CC]/30">
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>

                  <div className="text-sm text-gray-300 w-full space-y-3 px-1">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-[#00B5CC]" />
                      <p><span className="font-medium text-white">Status:</span> {character.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#00B5CC]" />
                      <p><span className="font-medium text-white">Species:</span> {character.species}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-[#00B5CC]" />
                      <p><span className="font-medium text-white">Gender:</span> {character.gender}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#00B5CC]" />
                      <p><span className="font-medium text-white">Origin:</span> {character.origin.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersRound className="w-5 h-5 text-[#00B5CC]" />
                      <p><span className="font-medium text-white">Location:</span> {character.location.name}</p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CharacterDetailModal
