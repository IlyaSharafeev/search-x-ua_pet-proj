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
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../views/RegistrationView.vue"
      ),
  },
];

export default routes;
