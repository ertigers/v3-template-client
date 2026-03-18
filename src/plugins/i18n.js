// 这是一个可以在js中引入的方式,也可以使用在组合式api中
import i18n from "@/languages/index";
const t = i18n.global.t;
const $t = i18n.global.t;

export { t, $t };
