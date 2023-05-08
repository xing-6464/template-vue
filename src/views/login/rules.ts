export const validatePassword = () => {
  return (rule: any, value: any, callback: any) => {
    if (value.length < 5) {
      callback(new Error('密码不能少于5位'))
    } else {
      callback()
    }
  }
}
