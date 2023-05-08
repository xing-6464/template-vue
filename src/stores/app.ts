import { TAGS_VIEW } from '@/constant'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '../utils/storage'

export const useAppStore = defineStore('app', () => {
  const tagsViewList = ref<any[]>(getItem(TAGS_VIEW) || [])

  function addTagsViewList(tag: any) {
    const isFind = tagsViewList.value.find((item) => {
      return item.path === tag.path
    })

    if (!isFind) {
      tagsViewList.value.push(tag)
      setItem(TAGS_VIEW, tagsViewList.value)
    }
  }

  function removeTagsView(payload: { type: 'other' | 'right' | 'index'; index: number }) {
    if (payload.type === 'index') {
      tagsViewList.value.splice(payload.index, 1)
    } else if (payload.type === 'right') {
      tagsViewList.value.splice(payload.index + 1, tagsViewList.value.length - payload.index + 1)
    } else if (payload.type === 'other') {
      tagsViewList.value.splice(payload.index + 1, tagsViewList.value.length - payload.index + 1)
      tagsViewList.value.slice(0, payload.index)
    }
    setItem(TAGS_VIEW, tagsViewList.value)
  }

  return { tagsViewList, addTagsViewList, removeTagsView }
})
