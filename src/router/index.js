import Vue from 'vue';
import VueRouter from 'vue-router';

//导入组件
const login = () => import('components/common/login');
const home = () => import('views/home/home');
const welcome = () => import('components/content/welcome');

//用户
const users = () => import('views/users/users');

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: login,
    meta: {
      name: '登录',
    },
  },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: welcome },
      { path: '/users', component: users },
    ],
    meta: { name: '首页' },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行
  //next() 放行   next("/login")强制跳转到登录页面

  //地址为login，允许跳转到登录页
  if (to.path === '/login') return next();

  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  //如果token为空，则强制跳转到登录页
  if (!tokenStr) return next('/login');
  next();
});

export default router;
