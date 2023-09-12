<script lang="ts" setup>
  import { computed, ref, nextTick, watch, onMounted, onUnmounted } from 'vue'
  import { CloseBold, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useTagsStore } from '@/store/modules/tags'
  import { getStyle, setStyle } from '@/utils/dom'
  import { sleep } from '@/utils'
  import { useResizeObserver } from '@/hooks/useResizeObserver'

  const tagsStore = useTagsStore()
  const tags = computed(() => tagsStore.tags)
  const hiddenTagView = computed(() => tagsStore.hiddenTagView)
  const router = useRouter()
  const route = useRoute()

  const tagsViewportRef = ref<HTMLElement>()
  const tagsArrangeRef = ref<HTMLElement>()

  const controller = ref(false)

  const cls = computed(() => ['app-tags-view', hiddenTagView.value && 'is-hidden'])

  const currentPath = computed(() => tagsStore.active)

  const setCurrentPath = (item) => {
    tagsStore.setActive(item.path)
  }

  const remove = (item) => {
    tagsStore.removeTag(item)
  }

  const { createResizeObserver, destroyResizeObserver } = useResizeObserver({
    elementRef: tagsViewportRef,
    onResize: () => {
      updateController()
      updateCenterPosition()
    }
  })

  const updateController = async () => {
    await nextTick()
    const { width } = tagsViewportRef.value.getBoundingClientRect()
    const scrollWidth = tagsViewportRef.value.scrollWidth
    controller.value = scrollWidth > width
  }

  const boundaryProcessing = (x, viewportWidth, scrollWidth) => {
    if (x <= 0) {
      x = 0
    }
    if (x >= scrollWidth - viewportWidth) {
      x = scrollWidth - viewportWidth
    }
    return x
  }

  const updateCenterPosition = async () => {
    await sleep(16)
    const arrangeNode = tagsArrangeRef.value
    const scrollWidth = arrangeNode.scrollWidth
    const tagNode = arrangeNode.querySelector('.tag-item.is-active') as HTMLElement
    if (!tagNode) return
    const tagWidth = tagNode.getBoundingClientRect().width
    const offsetLeft = tagNode.offsetLeft
    const viewportWidth = tagsViewportRef.value.getBoundingClientRect().width
    const x = boundaryProcessing(
      offsetLeft - viewportWidth / 2 + tagWidth / 2,
      viewportWidth,
      scrollWidth
    )
    setStyle(arrangeNode, {
      transform: `translateX(-${x}px)`,
      transition: 'all 0.35s'
    })
  }

  const handleSlide = (direction) => {
    const viewportWidth = tagsViewportRef.value.getBoundingClientRect().width
    const arrangeNode = tagsArrangeRef.value
    const scrollWidth = arrangeNode.scrollWidth
    const offset = Math.ceil(viewportWidth / 4)
    const transform = getStyle(arrangeNode, 'transform')
    const matcher = transform.match(/translateX\((.*?)px\)/)
    if (!matcher) return
    const x = boundaryProcessing(
      Math.abs(+matcher[1]) + direction * offset,
      viewportWidth,
      scrollWidth
    )
    setStyle(arrangeNode, {
      transform: `translateX(-${x}px)`,
      transition: 'all 0.35s'
    })
  }

  onMounted(() => {
    createResizeObserver()
  })

  onUnmounted(() => {
    destroyResizeObserver()
  })

  watch(
    () => currentPath.value,
    (path) => {
      if (path === route.path || !path) return
      updateCenterPosition()
      router.push({ path })
    }
  )

  watch(
    () => route.path,
    (path) => {
      tagsStore.setActive(path)
      updateCenterPosition()
    },
    {
      immediate: true
    }
  )

  watch(
    () => tags.value,
    () => {
      updateController()
      updateCenterPosition()
    },
    {
      deep: true
    }
  )
</script>

<template>
  <div :class="cls">
    <div class="tags-view">
      <div v-if="controller" class="arrow-left" @click="handleSlide(-1)">
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </div>
      <div ref="tagsViewportRef" class="tags-viewport">
        <div ref="tagsArrangeRef" class="tags-arrange">
          <div
            v-for="item in tags"
            :key="item.path"
            :class="[
              'tag-item',
              {
                'is-active': item.path === currentPath
              }
            ]"
            @click="setCurrentPath(item)"
          >
            <span class="tag-item__title">{{ item.title }}</span>
            <span class="tag-item__animate-line"></span>
            <el-icon
              v-if="!item.hiddenClose"
              class="tag-item__close-icon"
              @click.stop="remove(item)"
            >
              <CloseBold />
            </el-icon>
          </div>
        </div>
      </div>
      <div v-if="controller" class="arrow-right" @click="handleSlide(1)">
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tags-view {
    --tag-primary-color: var(--el-color-primary);
    --tag-height: 28px;
    --tag-text-color: var(--el-text-color-primary);

    width: 100%;
    display: flex;

    .arrow-left,
    .arrow-right {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      cursor: pointer;
    }

    .tags-viewport {
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    .tags-arrange {
      display: flex;
      column-gap: 10px;
      flex-wrap: nowrap;
    }

    .tag-item {
      box-sizing: bottom;
      height: var(--tag-height);
      padding: 0 8px;
      border-radius: 4px;
      line-height: var(--tag-height);
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      color: var(--tag-text-color);
      flex-shrink: 0;
      border: 1px solid #ddd;

      &:hover:not(.is-active) {
        color: var(--tag-primary-color);
        .tag-item__animate-line {
          width: 100%;
        }
        .tag-item__close-icon {
          width: 14px;
          margin-left: 4px;
        }
      }

      &.is-active {
        color: var(--tag-primary-color);
        .tag-item__animate-line {
          width: 100%;
        }

        .tag-item__close-icon {
          width: 14px;
          margin-left: 4px;
        }
      }

      &__title {
        font-size: 14px;
      }

      &__animate-line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0;
        background-color: var(--tag-primary-color);
        transition: all 0.3s;
      }
      &__close-icon {
        padding: 2px;
        width: 0;
        height: 14px;
        background-color: transparent;
        border-radius: 100%;
        transition: all 0.2s;
        &:hover {
          padding: 2px;
          background-color: #ddd;
          color: #fff;
          transform: scale(1.1);
        }
      }
    }
  }
</style>
