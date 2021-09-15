export default function useConsole () {
  const isDev = process.env.NODE_ENV === 'development'
  const logger = {
    primary (msg) {
      if (isDev) {
        console.log(`%c:::${msg}`, 'color:#409EFF')
      }
    },
    warning (msg) {
      if (isDev) {
        console.log(`%c:::${msg}`, 'color:#E6A23C')
      }
    },
    success (msg) {
      if (isDev) {
        console.log(`%c:::${msg}`, 'color:#67C23A')
      }
    },
    info (msg) {
      if (isDev) {
        console.log(`%c:::${msg}`, 'color:#909399')
      }
    },
    danger (msg) {
      if (isDev) {
        console.log(`%c:::${msg}`, 'color:#F56C6C')
      }
    }
  }
  return { logger }
}
