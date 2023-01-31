<template>
  <div class="user-password">
    <ValidationObserver
      tag="div"
      ref="userPasswordForm"
      class="user-password__form"
    >
      <form @submit.prevent="submit">
        <div class="form-input">
          <ValidationProvider
            :rules="{
              required: true,
              min: 8,
              max: 16,
            }"
            name="currentPassword"
            v-slot="{ errors }"
          >
            <label for="currentPassword">Текущий пароль</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              v-model="userPass.current"
              :class="{ error: errors[0] }"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-input">
          <ValidationProvider
            :rules="{
              required: true,
              min: 8,
              max: 16,
            }"
            vid="confirm"
            name="newPassword"
            v-slot="{ errors }"
          >
            <label for="newPassword">Новый пароль</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              v-model="userPass.new"
              :class="{ error: errors[0] }"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-input">
          <ValidationProvider
            :rules="{
              required: true,
              confirmed: 'confirm',
            }"
            name="confirmPassword"
            v-slot="{ errors }"
          >
            <label for="confirmPassword">Подтверждение пароля</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              v-model="userPass.confirm"
              :class="{ error: errors[0] }"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <button class="btn submit">Отправить</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userPass: {
        current: "",
        new: "",
        confirm: "",
      },
    };
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.userPasswordForm.validate();
      if (!isValid) {
        // ABORT!!
        return;
      }

      console.log("submit");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-password {
  display: flex;
  justify-content: center;
  align-items: center;

  &__form {
    padding: 0 15px;
    width: 50%;

    .form-input {
      margin-bottom: 20px;
    }
  }
}

.btn {
  padding: 5px 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #ccc;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: #fff;
  }
}
</style>
