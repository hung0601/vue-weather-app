import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { path: "/city/HaNoi/today" },
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: import(
      /* webpackChunkName: "login" */ "@/views/authen/LoginComponent.vue"
    ),
  },
  {
    path: "/register",
    name: "register",
    component: import(
      /* webpackChunkName: "register" */ "@/views/authen/RegisterComponent.vue"
    ),
  },
  {
    path: "/city/:city",
    name: "city",
    props: true,
    component: () =>
      import(/* webpackChunkName: "cities" */ "../views/CityWeatherView.vue"),
    children: [
      {
        path: "today",
        name: "today",
        component: () =>
          import(
            /* webpackChunkName: "today" */ "../views/options/TodayWeatherView.vue"
          ),
      },
      {
        path: "hourly",
        name: "hourly",
        component: () =>
          import(
            /* webpackChunkName: "hourly" */ "../views/options/HourlyWeatherView.vue"
          ),
      },
      {
        path: "weekend",
        name: "weekend",
        component: () =>
          import(
            /* webpackChunkName: "weekend" */ "../views/options/WeekendWeatherView.vue"
          ),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
