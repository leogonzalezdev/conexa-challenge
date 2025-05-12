import { Character } from '@/types/types';
import { create } from 'zustand';

interface CharacterStore {
  selectedCharOne: Character | null;
  selectedCharTwo: Character | null;
  setSelectedCharOne: (id: Character) => void;
  setSelectedCharTwo: (id: Character) => void;
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  selectedCharOne: null,
  selectedCharTwo: null,
  setSelectedCharOne: (id) => set({ selectedCharOne: get().selectedCharOne === id ? null : id }),
  setSelectedCharTwo: (id) => set({ selectedCharTwo: get().selectedCharTwo === id ? null : id }),
}));
