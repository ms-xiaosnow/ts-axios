import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import AxiosCancel from './AxiosCancel'

interface ResolvePromise {
  (reason?: AxiosCancel): void
}

export default class CancelToken {
  promise: Promise<AxiosCancel>
  reason?: AxiosCancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<AxiosCancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (!this.reason) {
        this.reason = new AxiosCancel(message)
        resolvePromise(this.reason)
      }
    })

  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }

}
