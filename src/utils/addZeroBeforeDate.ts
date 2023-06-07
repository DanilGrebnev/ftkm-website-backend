export const addZeroBeforeDate = (date: number) => {
    return date < 10 ? '0' + date : date
}
