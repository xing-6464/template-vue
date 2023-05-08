import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      redirect: '/profile',
      component: layout,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/profile/index.vue'),
          meta: {
            title: '信息',
            icon: 'iconfont icon-user'
          }
        },
        {
          path: '/404',
          name: '404',
          component: () => import('@/views/error-page/404.vue')
        },
        {
          path: '/401',
          name: '401',
          component: () => import('@/views/error-page/401.vue')
        }
      ]
    },
    {
      path: '/user',
      component: layout,
      meta: {
        title: '用户信息管理',
        icon: 'iconfont icon-personnel'
      },
      children: [
        {
          path: '/user/manage',
          component: () => import('@/views/user-manage/index.vue'),
          meta: {
            title: '用户信息',
            icon: 'iconfont icon-personnelgl'
          }
        },
        {
          path: '/user/info/:id',
          name: 'userInfo',
          component: () => import('@/views/user-info/index.vue')
        }
      ]
    },
    {
      path: '/pet',
      component: layout,
      meta: {
        title: '宠物信息管理',
        icon: 'iconfont icon-pet'
      },
      children: [
        {
          path: '/pet/manage',
          component: () => import('@/views/pet-manage/index.vue'),
          meta: {
            title: '宠物信息',
            icon: 'iconfont icon-pets'
          }
        }
      ]
    },
    {
      path: '/volunteer',
      component: layout,
      meta: {
        title: '志愿者活动信息管理',
        icon: 'iconfont icon-ic_approve'
      },
      children: [
        {
          path: '/volunteer/manage',
          component: () => import('@/views/volunteer-manage/index.vue'),
          meta: {
            title: '志愿者活动信息',
            icon: 'iconfont icon-houtaitubiao-15'
          }
        }
      ]
    },
    {
      path: '/picture',
      component: layout,
      meta: {
        title: '轮播图管理',
        icon: 'iconfont icon-picture'
      },
      children: [
        {
          path: '/picture/manage',
          component: () => import('@/views/picture-manage/index.vue'),
          meta: {
            title: '轮播图信息',
            icon: 'iconfont icon-picture-add'
          }
        }
      ]
    },
    {
      path: '/examine',
      component: layout,
      meta: {
        title: '审批管理管理',
        icon: 'iconfont icon-icon-examine'
      },
      children: [
        {
          path: '/examine/volunteer',
          component: () => import('@/views/examine/index.vue'),
          meta: {
            title: '志愿者审批',
            icon: 'iconfont icon-ic_approve'
          }
        },
        {
          path: '/examine/petexamine',
          component: () => import('@/views/examine/index.vue'),
          meta: {
            title: '宠物领养审批',
            icon: 'iconfont icon-approve'
          }
        },
        {
          path: '/examine/volunteeractivity',
          component: () => import('@/views/examine/index.vue'),
          meta: {
            title: '志愿者活动审批',
            icon: 'iconfont icon-ic_examine'
          }
        }
      ]
    }
  ]
})

export default router
