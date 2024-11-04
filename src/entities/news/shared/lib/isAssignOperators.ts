import { DateFiltersOperators } from '../types'

/*
 * Проверка на допустимый ключ
 */
export function isAssignOperators(
    operators: string,
): operators is DateFiltersOperators {
    return operators === '$gte' || operators === '$lte' || operators === '$eq'
}
