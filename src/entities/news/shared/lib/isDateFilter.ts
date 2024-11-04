import { DateFiltersKey, QueryFilters } from '../types'

export function isDateFilter(k: keyof QueryFilters): k is DateFiltersKey {
    return k === 'createdDay' || k === 'createdMonth' || k === 'createdYear'
}
