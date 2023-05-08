import { ref } from 'vue'
import { defineStore } from 'pinia'
type StyleVal = {
  menuText: string
  menuActiveText: string
  subMenuActiveText: string
  menuBg: string
  menuHover: string
  subMenuBg: string
  subMenuHover: string
  sideBarWidth: string
}

export const useGetters = defineStore('getters', () => {
  const styleVal = ref<StyleVal>({
    menuText: '#bfcbd9',
    menuActiveText: '#ffffff',
    subMenuActiveText: '#f4f4f5',
    menuBg: '#304156',
    subMenuBg: '#1f2d3d',
    menuHover: '#263445',
    subMenuHover: '#001528',
    sideBarWidth: '260px'
  })

  return { styleVal }
})
