import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import type { TagItem, TagState } from '../types/tags.d.ts'
import { useSettingsStore } from './settings'
import { storage } from '@/utils/storage/index.js'

const TAGS_KEY = 'TAGS'

export const useTagsStore = defineStore({
  id: 'Tags',
  state: (): TagState =>
    Object.assign(
      {},
      {
        tags: [{ path: '/home/dashboard', title: '首页', hiddenClose: true }],
        active: undefined
      },
      storage.getItem(TAGS_KEY)
    ),
  getters: {
    hiddenTagView(state) {
      const path = ['/home/creator']
      if (useSettingsStore().hiddenTagsViews) return true
      if (path.includes(state.active) || state.tags.length === 0) return true
    },
    rawState(state: any) {
      return toRaw(state.$state)
    }
  },
  actions: {
    process() {
      if (useSettingsStore().persistenceTags) {
        storage.setItem(TAGS_KEY, this.rawState)
      } else {
        storage.getItem(TAGS_KEY) && storage.removeItem(TAGS_KEY)
      }
    },
    addTag(item: TagItem) {
      const _tags = this.tags.slice()
      const index = _tags.findIndex((tag) => tag.path === item.path)
      if (~index) return
      _tags.push(item)
      this.tags = _tags
      this.process()
    },
    removeTag(item: TagItem) {
      const _tags = this.tags.slice()
      const index = _tags.findIndex((tag) => tag.path === item.path)
      if (!~index) return
      const target = _tags[index]
      if (target.path === this.active) {
        const lastIndex = _tags.length - 1
        if (index === lastIndex && index > 0) {
          // 向前进一个
          this.active = _tags[lastIndex - 1].path
        } else if (index > 0) {
          // 跳转到最后一个
          this.active = _tags[lastIndex].path
        } else {
          this.active = undefined
        }
      }
      _tags.splice(index, 1)
      this.tags = _tags
      this.process()
    },
    setActive(path) {
      this.active = path
      this.process()
    }
  }
})
