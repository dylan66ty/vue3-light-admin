export const ascending = (arr: any[]) => {
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return a?.meta?.rank - b?.meta?.rank
  })
}

export const flatten = (arr: any[]) => {
  return arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v) : [v]), [])
}
