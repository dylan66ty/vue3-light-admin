import { h, defineComponent, withDirectives, resolveDirective } from 'vue'

// 在组件创建完成时,从下到上的过渡动画。
export default defineComponent({
  name: 'Motion',
  props: {
    delay: {
      type: Number,
      default: 50
    }
  },
  setup(props, { slots }) {
    return () => {
      return withDirectives(
        h(
          'div',
          {},
          {
            default: () => [slots.default()]
          }
        ),
        [
          [
            resolveDirective('motion'),
            {
              initial: { opacity: 0, y: 100 },
              enter: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: props.delay
                }
              }
            }
          ]
        ]
      )
    }
  }
})
