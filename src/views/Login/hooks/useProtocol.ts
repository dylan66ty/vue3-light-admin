import { ref } from 'vue'

export const useProtocol = () => {
  const protocol = ref(false)

  const onProtocol = () => {
    protocol.value = true
    console.log('click protocol')
  }

  return {
    protocol,
    onProtocol
  }
}
