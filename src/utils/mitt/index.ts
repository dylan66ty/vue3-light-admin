import mitt from 'mitt'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type EmitterEvents = {
  drag: string
}

export const emitter = mitt<EmitterEvents>()
