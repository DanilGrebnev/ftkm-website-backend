import {
    QueryFilters,
    TDateFilter,
    TDateFilterOperators,
    TOperatorKeys,
} from '../types'

export function isDateFilter(k: any, v: any): v is TDateFilterOperators {
    return k === 'createdDate'
}
