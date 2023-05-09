export function formatDate(date: Date | number | string): string {
  if (typeof date === 'string' || typeof date === 'number') {
    const newDate = new Date(date)

    const dateMonth = newDate.getMonth() + 1
    const dateMonthIF = dateMonth >= 10 ? dateMonth : '0' + dateMonth

    const dateDay = newDate.getDate() >= 10 ? newDate.getDate() : '0' + newDate.getDate()

    return `${newDate.getFullYear()}-${dateMonthIF}-${dateDay}`
  }
  const dateMonth = date.getMonth() + 1
  const dateMonthIF = dateMonth >= 10 ? dateMonth : '0' + dateMonth

  const dateDay = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()

  return `${date.getFullYear()}-${dateMonthIF}-${dateDay}`
}
