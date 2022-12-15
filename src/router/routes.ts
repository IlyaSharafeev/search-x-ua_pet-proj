import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartCards",
    component: () =>
      import(
        /* webpackChunkName: "start-cards" */ "../views/StartCardsView.vue"
      ),
  },
  {
    path: "/search",
    name: "SearchView",
    component: () =>
      import(/* webpackChunkName: "search-view" */ "../views/SearchView.vue"),
  },
  {
    path: "/keyboard-training",
    name: "KeyboardTrainingView",
    component: () =>
      import(
        /* webpackChunkName: "keyboard-training" */ "../views/KeyboardTrainingView.vue"
      ),
  },
  {
    path: "/weather",
    name: "WeatherView",
    component: () =>
      import(
        /* webpackChunkName: "keyboard-training" */ "../views/WeatherView.vue"
      ),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../views/RegistrationView.vue"
      ),
  },
];

export default routes;
