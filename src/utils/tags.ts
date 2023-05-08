const whiteList = ['/login', '/404', '/401']

export function isTags(path: string) {
  return !whiteList.includes(path)
}
