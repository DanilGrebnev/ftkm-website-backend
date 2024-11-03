import { QueryFilters } from '../types'

type DateFiltersKey = 'createdDay' | 'createdMonth' | 'createdYear'
type DateFiltersOperators = '$lte' | '$gte' | '$eq'
type DateFiltersValue = Partial<Record<DateFiltersOperators, number>>

type Filters = {
    title?: string
} & Partial<Record<DateFiltersKey, DateFiltersValue>>

export const createFilters = (filters?: QueryFilters) => {
    if (!filters) return
    const filter = {}
    const parseFilters = JSON.parse(filters as string)

    Object.entries(parseFilters).forEach(
        ([k, v]: [keyof QueryFilters, string | undefined]) => {
            if (!v) return
            if (k === 'title' && v) {
                filter[k] = new RegExp(v, 'i')
            }
            if (
                k === 'createdDay' ||
                k === 'createdMonth' ||
                k === 'createdYear'
            ) {
                filter[k] = +v
            }
        },
    )

    return filter
}
