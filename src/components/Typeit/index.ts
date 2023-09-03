import type { PropType } from 'vue'
import { defineComponent, h, onMounted } from 'vue'
import TypeIt from 'typeit'
import { uid } from 'uid'

export default defineComponent({
  props: {
    speed: {
      type: Number,
      default: 100
    },
    strings: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    cursor: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const id = `type_id_${uid(6)}`
    onMounted(() => {
      new TypeIt(`#${id}`, {
        strings: props.strings,
        speed: props.speed,
        cursor: props.cursor
      }).go()
    })
    return () => {
      return h('span', { id }, '')
    }
  }
})
