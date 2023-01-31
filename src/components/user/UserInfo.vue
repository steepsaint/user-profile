<template>
  <div class="user-info">
    <ValidationObserver tag="div" ref="userInfoForm" class="user-info__form">
      <form @submit.prevent="submit">
        <div class="form-input">
          <ValidationProvider rules="required" name="fio" v-slot="{ errors }">
            <label for="fio">ФИО</label>
            <input
              type="text"
              name="fio"
              id="fio"
              v-model="user.fio"
              v-validate="'required'"
              :class="{ error: errors[0] }"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-input">
          <label for="date">Дата рождения</label>
          <input :value="user.date" type="date" name="date" id="date" />
        </div>

        <div class="form-input">
          <ValidationProvider rules="required" name="email" v-slot="{ errors }">
            <label for="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="user.email"
              v-validate="'required'"
              :class="{ error: errors[0] }"
            />
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-input">
          <label for="city">Город</label>
          <input type="text" name="city" id="city" v-model="user.city" />
        </div>

        <CustomPhoneMask :number="user.phone" />

        <div class="form-input">
          <label for="lang">Владение языками</label>
          <MultiSelect
            placeholder="Выберите языки"
            :options="langsList"
            :selectedItems="selectedLangs"
            v-model="user.langs"
          />
        </div>
        <button class="btn submit">Отправить</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import MultiSelect from "../common/MiltiSelect.vue";
import CustomPhoneMask from "../common/CustomPhoneMask.vue";

export default {
  components: {
    MultiSelect,
    CustomPhoneMask,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        fio: "",
        date: "",
        email: "",
        city: "",
        phone: "",
        langs: [],
      },
      submitted: false,
      langsList: [],
    };
  },
  computed: {
    selectedLangs() {
      return this.userData?.langs || [];
    },
  },
  async mounted() {
    try {
      await this.getLangsList();
    } catch (e) {
      alert("Что-то пошло не так!");
    }
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.userInfoForm.validate();
      if (!isValid) {
        // ABORT!!
        return;
      }

      console.log("submit");
    },
    convertISODateToInputValue(date) {
      if (!date) return "";

      const newDate = new Date(date);
      return newDate.toISOString().substring(0, 10) || "";
    },
    async getLangsList() {
      return await fetch(
        "https://run.mocky.io/v3/1d9f0ca2-595c-4a93-bfee-6da5881f6969"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.langsList = data || [];
        });
    },
  },
  watch: {
    userData: {
      handler() {
        this.user.fio = this.userData?.fio;
        this.user.date = this.convertISODateToInputValue(
          this.userData?.birthday
        );
        this.user.email = this.userData?.email;
        this.user.city = this.userData?.city;
        this.user.phone = this.userData?.phone;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

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
