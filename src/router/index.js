import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import lesson from "../views/Lesson";
import student from "../views/Student";
import {auth} from "../util";

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/lesson/:id',
    name: 'lesson',
    component: lesson,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/student/:id',
    name: 'student',
    component: student,
    meta:{
      requestAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let user = auth.currentUser;
  let premises = to.matched.some(record => record.meta.requestAuth)

  if (!user && premises){
    next('login')
  }else if (!premises && user){
    next('home')
  }else {
    next();
  }

});

export default router