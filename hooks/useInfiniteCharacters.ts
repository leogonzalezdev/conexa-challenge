import useSWRInfinite from 'swr/infinite'
import { Character } from '@/types/types'
import { fetcher, API_BASE_URL } from '@/services/api'

export interface ApiResponse<T> {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T[]
}

export const useInfiniteCharacters = (queryKey: string = 'default', search: string = '') => {
  const safeSearch = search?.trim() || ''

  const getKey = (pageIndex: number, previousPageData: ApiResponse<Character> | null) => {
    if (previousPageData && !previousPageData.info.next) return null

    const page = pageIndex + 1
    const url = new URL(`${API_BASE_URL}/character`)
    url.searchParams.set('page', page.toString())
    if (safeSearch) url.searchParams.set('name', safeSearch)
    url.searchParams.set('key', queryKey)

    return url.toString()
  }

  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<ApiResponse<Character>>(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const isEmpty = !data || data.length === 0
  const isLoadingInitial = isEmpty && !error
  const currentPageData = data?.[size - 1]
  const isLastPageLoaded = currentPageData?.info?.next === null
  const isLoadingMore = isLoadingInitial || (size > 0 && !currentPageData)
  const isReachingEnd = !!isLastPageLoaded

  const characters = data?.flatMap(page => page.results) ?? []

  return {
    characters,
    isLoadingMore,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
    isLoading: isLoadingInitial || isValidating,
    hasNoResults: isEmpty && !isLoadingInitial && !isValidating,
    error,
    mutate
  }
}
