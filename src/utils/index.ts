export const compose = <T = any[]>(...fns: ((...v: T[]) => T)[]) => {
  return fns.reduce(
    (a, v) =>
      (...args: any[]) =>
        a(v(...args))
  )
}

export const pipe = <T = any[]>(...fns: ((...v: T[]) => T)[]) => {
  return fns.reduceRight(
    (a, v) =>
      (...args: any[]) =>
        a(v(...args))
  )
}

export const createPromise = () => {
  const ret = {} as unknown as {
    promise: Promise<any>
    resolve: (value: unknown) => void
    reject: (value: unknown) => void
  }
  const promise = new Promise((resolve, reject) => {
    ret.resolve = resolve
    ret.reject = reject
  })
  ret.promise = promise
  return ret
}

export const to = (promiser: Promise<any>): Promise<any[]> =>
  promiser.then(
    (value) => [null, value],
    (err) => [err, null]
  )
