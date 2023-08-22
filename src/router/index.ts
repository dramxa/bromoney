import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/buy',
      children: [
        {
          meta: {
            auth: true,
          },
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboard/index.vue'),
        },
        {
          name: 'Buy',
          path: 'buy',
          component: () => import('@/views/home/Home.vue'),
        },
        {
          meta: {
            auth: true,
          },
          name: 'BuyProcess',
          path: '/buy/:id',
          component: () => import('@/views/buy/index.vue'),
        },
        {
          name: 'Sell',
          path: 'sell',
          component: () => import('@/views/home/Home.vue'),
        },
        {
          meta: {
            auth: true,
          },
          name: 'SellProcess',
          path: '/sell/:id',
          component: () => import('@/views/sell/index.vue'),
        },
        {
          meta: {
            auth: true,
          },
          name: 'OrderHistory',
          path: 'order-history',
          component: () => import('@/views/order-history/index.vue'),
        },
        {
          meta: {
            auth: true,
          },
          name: 'Account',
          path: 'account',
          component: () => import('@/views/account/index.vue'),
          redirect: '/account/settings',
          children: [
            {
              meta: {
                auth: true,
              },
              name: 'Settings',
              path: 'settings',
              component: () => import('@/views/account/views/AccountSettings.vue'),
            },
            {
              meta: {
                auth: true,
              },
              name: 'PaymentMethods',
              path: 'payment-methods',
              component: () => import('@/views/account/views/PaymentMethods.vue'),
            },
            {
              meta: {
                auth: true,
              },
              name: 'SecuritySettings',
              path: 'security',
              component: () => import('@/views/account/views/SecuritySettings.vue'),
            },
            {
              meta: {
                auth: true,
              },
              name: 'Notification',
              path: 'notification',
              component: () => import('@/views/account/views/Notification.vue'),
            },
          ]
        },
      ],
    },
  ],
})
//@ts-ignore
router.beforeEach((to, from, next) => {
  const isAuth = to.meta.auth
  const token = localStorage.getItem('ltoken') && localStorage.getItem('lrefreshToken')

  if (isAuth && !token) {
    next('/buy')
  } else {
    next()
  }
})

export default router