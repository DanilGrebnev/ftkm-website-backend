export type DateFiltersKey = 'createdDay' | 'createdMonth' | 'createdYear'
export type DateFiltersOperators = '$lte' | '$gte' | '$eq'
export type DateFiltersValue = Partial<Record<DateFiltersOperators, number>>

export type QueryFilters = {
    title?: string
} & Partial<Record<DateFiltersKey, DateFiltersValue>>