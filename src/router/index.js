import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login.vue'),
      meta: {
        tabbar: false,
        title: '登录'
      }
    }, 
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/register.vue'),
      meta: {
        tabbar: false,
        title: '注册'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home.vue'),
      meta: {
        tabbar: true,
        title: '首页'
      }
    },
    {
      path: '/indexList',
      name: 'indexList',
      component: () => import('@/components/indexList.vue'),
      meta: {
        tabbar: true,
        title: '首页'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/components/my.vue'),
      meta: {
        tabbar: true,
        title: '我的'
      }
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/components/product.vue'),
      meta: {
        tabbar: true,
        title: '发布记录'
      }
    },
    {
      path: '/resave',
      name: 'resave',
      component: () => import('@/components/resave.vue'),
      meta: {
        tabbar: true,
        title: '首页'
      }
    },
    {
      path: '/resaves',
      name: 'resaves',
      component: () => import('@/components/resaves.vue'),
      meta: {
        tabbar: true,
        title: '接收记录'
      }
    },
    {
      path: '/feed/:id?',
      name: 'feed',
      component: () => import('@/components/feed.vue'),
      meta: {
        tabbar: true,
        title: '反馈信息'
      }
    },
    {
      path: '/feeds/:id?',
      name: 'feeds',
      component: () => import('@/components/feeds.vue'),
      meta: {
        tabbar: true,
        title: '反馈信息'
      }
    },
    {
      path: '/feedback/:id?',
      name: 'feedback',
      component: () => import('@/components/feedback.vue'),
      meta: {
        tabbar: true,
        title: '提交截图'
      }
    },
    {
      path: '/*',
      name: '404',
      component: () => import('@/components/notFound.vue'),
      meta: {
        tabbar: false,
        title: '404'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },

})

export default router;
router.beforeEach((to, from, next) => {
  const nextRoute = ['home', 'resave', 'my'];
  let isLogin = localStorage.getItem('token');  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      router.push({ name: 'login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  // if (to.name === 'login') {
  //   if (isLogin) {
  //     console.info(JSON.parse(localStorage.getItem('userInfo')).user_type == 1)
  //     if (JSON.parse(localStorage.getItem('userInfo')).user_type == 1) {
  //       router.push({ name: 'home' });
  //     } else {
  //       router.push({ name: 'resave' });
  //     }
  //   }
  // }
  const title = to.meta && to.meta.title || "商旅伴侣";
  if (title) {
    document.title = title;
  }
  next();
})
