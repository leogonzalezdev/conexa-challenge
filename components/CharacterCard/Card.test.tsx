import { render, screen, fireEvent } from '@testing-library/react'
import Card from './Card'
import { Character } from '@/types/types'

const characterMock: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: '/rick.png',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
}

describe('<Card />', () => {
  it('should render name, status and species', () => {
    render(<Card character={characterMock} onSelect={jest.fn()} />)

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view more/i })).toBeInTheDocument()
  })

  it('should call onSelect with character when clicked', () => {
    const onSelect = jest.fn()
    render(<Card character={characterMock} onSelect={onSelect} />)

    fireEvent.click(screen.getByText('Rick Sanchez'))

    expect(onSelect).toHaveBeenCalledWith(characterMock)
  })
})
