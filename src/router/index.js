import { createRouter, createWebHistory } from "vue-router";
import Tasks from "../views/Tasks.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
    meta: { requireAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.requireAuth);
  const validateLogin = localStorage.getItem('token');
  if (authRequired && !validateLogin) {
    next({ name: 'Signin' })
  } else {
    next()
  }
})

export default router;
