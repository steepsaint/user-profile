import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import { Validator } from "vee-validate";

Vue.config.productionTip = false;
Vue.use(VeeValidate);

const dict = {
  custom: {
    fio: {
      required: () => "Поле 'ФИО'  обязательно для заполнения",
    },
    email: {
      required: () => "Поле 'E-mail'  обязательно для заполнения",
      email: () => "Поле 'E-mail'  введено не верно",
    },
    currentPassword: {
      required: () => "Поле 'Текущий пароль'  обязательно для заполнения",
      min: () => "Мин. кол-во символов 8",
      max: () => "Мин. кол-во символов 16",
    },
    newPassword: {
      required: () => "Поле 'Новый пароль'  обязательно для заполнения",
      min: () => "Мин. кол-во символов 8",
      max: () => "Мин. кол-во символов 16",
    },
    confirmPassword: {
      required: () => "Поле 'Новый пароль'  обязательно для заполнения",
      confirmed: () => "Пароли не совпадают",
    },
  },
};

Validator.localize("ru", dict);

Vue.directive("click-outside", {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function (el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
