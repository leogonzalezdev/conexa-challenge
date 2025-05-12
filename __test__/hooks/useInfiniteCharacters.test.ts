import { renderHook, act } from '@testing-library/react'
import useSWRInfinite from 'swr/infinite'
import { useInfiniteCharacters } from '@/hooks/useInfiniteCharacters'
import { Character } from '@/types/types'

jest.mock('swr/infinite')
const mockedUseSWRInfinite = useSWRInfinite as jest.Mock

const mockApiPage = (overrides?: Partial<Character>[]) => ({
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: overrides ?? [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' } as Character,
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' } as Character,
  ],
})

describe('useInfiniteCharacters', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return characters from multiple pages', () => {
    mockedUseSWRInfinite.mockReturnValue({
      data: [mockApiPage()],
      error: null,
      size: 1,
      setSize: jest.fn(),
      isValidating: false,
      mutate: jest.fn(),
    })

    const { result } = renderHook(() => useInfiniteCharacters())

    expect(result.current.characters.length).toBe(2)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isLoadingMore).toBe(false)
    expect(result.current.isReachingEnd).toBe(true)
    expect(result.current.hasNoResults).toBe(false)
  })

  it('should show loading on initial empty state', () => {
    mockedUseSWRInfinite.mockReturnValue({
      data: undefined,
      error: null,
      size: 1,
      setSize: jest.fn(),
      isValidating: false,
      mutate: jest.fn(),
    })

    const { result } = renderHook(() => useInfiniteCharacters())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.characters).toEqual([])
  })

  it('should show error state', () => {
    mockedUseSWRInfinite.mockReturnValue({
      data: undefined,
      error: new Error('Failed'),
      size: 1,
      setSize: jest.fn(),
      isValidating: false,
      mutate: jest.fn(),
    })

    const { result } = renderHook(() => useInfiniteCharacters())

    expect(result.current.error).toBeDefined()
    expect(result.current.characters).toEqual([])
    expect(result.current.hasNoResults).toBe(false)
  })

  it('should call setSize to load more', () => {
    const setSize = jest.fn()
    mockedUseSWRInfinite.mockReturnValue({
      data: [mockApiPage()],
      error: null,
      size: 1,
      setSize,
      isValidating: false,
      mutate: jest.fn(),
    })

    const { result } = renderHook(() => useInfiniteCharacters())

    act(() => {
      result.current.loadMore()
    })

    expect(setSize).toHaveBeenCalledWith(2)
  })

  it('should include name param if search is provided', () => {
    const setSize = jest.fn()
    mockedUseSWRInfinite.mockImplementation((getKey) => {
      const key = getKey(0, null)
      expect(key).toContain('name=rick')
      return {
        data: [mockApiPage()],
        error: null,
        size: 1,
        setSize,
        isValidating: false,
        mutate: jest.fn(),
      }
    })

    renderHook(() => useInfiniteCharacters('test', 'rick'))
  })
})
