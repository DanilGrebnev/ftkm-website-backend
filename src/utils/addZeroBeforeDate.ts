export const addZeroBeforeDate = (date: number) => {
    return String(date).padStart(2, '0')
    // return date < 10 ? '0' + date : date
}
