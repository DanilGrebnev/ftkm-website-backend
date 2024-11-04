import { QueryFilters, DateFiltersValue } from '../types'
import { isDateFilter } from './isDateFilter'
import { isAssignOperators } from './isAssignOperators'

type CreatedFilters = Omit<QueryFilters, 'title'> & { title?: RegExp }

export const createFilters = (filters?: QueryFilters): CreatedFilters => {
    if (!filters) return
    const filter = {}
    const parseFilters = JSON.parse(filters as string)

    Object.entries(parseFilters).forEach(
        ([k, v]: [keyof QueryFilters, string | DateFiltersValue]) => {
            if (!v) return
            if (k === 'title') {
                const textValue = v as string
                filter[k] = new RegExp(textValue, 'i')
                return
            }

            if (isDateFilter(k)) {
                const dateValue = v as DateFiltersValue

                for (const dateOperatorsKey in dateValue) {
                    if (!isAssignOperators(dateOperatorsKey)) return
                }

                filter[k] = dateValue
            }
        },
    )

    return filter
}
