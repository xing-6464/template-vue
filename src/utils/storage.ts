/**
 * 存储数据
 */
export function setItem(key: string, value: any): void {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export function getItem(key: string) {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data!)
  } catch (e: any) {
    return e.message
  }
}
/**
 * 删除指定数据
 */
export function removeItem(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export function removeAllItems() {
  window.localStorage.clear()
}
