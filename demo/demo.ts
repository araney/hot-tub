import { createApp } from "vue";
import "@dwh/stylesheets";

import Demo from "./Demo.vue";
import router from "../src/router";

const app = createApp(Demo);

app.use(router);

app.mount("body");
