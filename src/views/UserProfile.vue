<template>
  <div class="user-wrapper">
    <UserAvatar :userData="userData" />
    <UserInfo :userData="userData" />
    <UserPassword />
  </div>
</template>

<script>
import UserAvatar from "@/components/user/UserAvatar.vue";
import UserInfo from "@/components/user/UserInfo.vue";
import UserPassword from "@/components/user/UserPassword.vue";

export default {
  components: {
    UserAvatar,
    UserInfo,
    UserPassword,
  },
  data() {
    return {
      userData: {},
    };
  },
  async mounted() {
    try {
      await this.getUserInfo();
    } catch (e) {
      alert("Что-то пошло не так!");
    }
  },
  methods: {
    async getUserInfo() {
      return await fetch(
        "https://run.mocky.io/v3/208fc2f7-dfdc-4968-b2db-13468fe5cfe0"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.userData = data || {};
        });
    },
  },
};
</script>

<style scoped>
.user-wrapper {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background: #fefefe;
  border-radius: 5px;
}
</style>
