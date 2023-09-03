// TODO 日志记录
interface LoggerMethods {
  info(): void
}

class Logger implements LoggerMethods {
  public info(): void {
    console.log('111')
  }
}

export const logger = new Logger()
