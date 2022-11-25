import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/scss/styles.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { PiniaSharedState } from "pinia-shared-state";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(PiniaSharedState({ enable: true, initialize: true, type: "native" }));

const app = createApp(App);

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    app,
    dsn: "https://d202205b1dbd4963b4ca1dc315757ee3@sentry.office.onix.ua/111",
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["onix-systems-vue-onix-base.staging.onix.ua", /^\//],
      }),
    ],
    tracesSampleRate: 1.0,
    environment: "development",
    logErrors: true,
  });
}

app.use(pinia).use(router).mount("#app");
