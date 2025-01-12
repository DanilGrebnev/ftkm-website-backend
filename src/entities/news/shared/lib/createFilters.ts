import { QueryFilters } from '../types'
import { isDateFilter } from './isDateFilter'

type CreatedFilters = Partial<{
    title: RegExp
    createdDate: QueryFilters['createdDate']
}>

export const createFilters = (filters?: QueryFilters): CreatedFilters => {
    if (!filters) return

    const resultFilter: CreatedFilters = {}

    const parseFilters = JSON.parse(filters as string) as QueryFilters

    Object.entries(parseFilters).forEach(([k, v]) => {
        if (k === 'title' && typeof v === 'string') {
            resultFilter.title = new RegExp(v, 'i')
        }

        if (isDateFilter(k, v)) {
            const values = Object.entries(v).reduce((result, [k, v]) => {
                result[k] = v

                return result
            }, {})

            resultFilter.createdDate = values
        }
    })

    return resultFilter
}
