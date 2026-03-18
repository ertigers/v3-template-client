import { HOME_URL } from "@/config";
import { $t } from "@/plugins/i18n";

export const staticRouter = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: "/public",
    name: "public",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
        meta: { title: $t("routers.login") }
      }
    ]
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    redirect: HOME_URL,
    children: []
  }
];

export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: $t("routers.403")
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: $t("routers.404")
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: $t("routers.500")
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];
