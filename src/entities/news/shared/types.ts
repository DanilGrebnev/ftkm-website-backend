export type DateFiltersKey = 'createdDay' | 'createdMonth' | 'createdYear'

export type TOperatorKeys = '$lte' | '$gte' | '$eq'

export type TDateFilterOperators = Partial<Record<TOperatorKeys, string>>

export type TDateFilter = Record<'createdDate', TDateFilterOperators>
export type TTitleFilter = Record<'title', string>

export type QueryFilters = Partial<TDateFilter> & Partial<TTitleFilter>
