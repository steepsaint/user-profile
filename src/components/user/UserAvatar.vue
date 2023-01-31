<template>
  <div class="user-avatar">
    <input
      type="file"
      name="image"
      id="user-avatar__input"
      ref="inputImage"
      accept="image/*"
      @change="uploadImage"
    />
    <div class="user-avatar__wrapper">
      <div class="user-avatar__img">
        <img :class="{ active: imageUrl }" v-bind:src="imageUrl" alt="" />
      </div>
      <button class="btn delete" @click="removeImage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path
            d="M24 4c-3.508 0-6.43 2.621-6.92 6h-6.842a1.5 1.5 0 0 0-.258-.021 1.5 1.5 0 0 0-.222.021H6.5a1.5 1.5 0 1 0 0 3h2.139l2.517 26.03A5.519 5.519 0 0 0 16.631 44h14.736a5.519 5.519 0 0 0 5.475-4.97L39.362 13H41.5a1.5 1.5 0 1 0 0-3h-3.256a1.5 1.5 0 0 0-.48 0H30.92c-.49-3.379-3.412-6-6.92-6zm0 3c1.88 0 3.42 1.268 3.861 3H20.14c.44-1.732 1.982-3 3.861-3zm-12.35 6h24.698l-2.493 25.74A2.481 2.481 0 0 1 31.367 41H16.631a2.484 2.484 0 0 1-2.488-2.26L11.65 13zm8.827 4.979A1.5 1.5 0 0 0 19 19.5v15a1.5 1.5 0 1 0 3 0v-15a1.5 1.5 0 0 0-1.523-1.521zm7 0A1.5 1.5 0 0 0 26 19.5v15a1.5 1.5 0 1 0 3 0v-15a1.5 1.5 0 0 0-1.523-1.521z"
          />
        </svg>
      </button>
      <button class="btn add" @click="$refs.inputImage.click()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          style="enable-background: new 0 0 32 32"
          viewBox="0 0 32 32"
        >
          <path
            d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    uploadImage() {
      this.imageUrl = window.URL.createObjectURL(
        this.$refs.inputImage.files[0]
      );
    },
    removeImage() {
      this.imageUrl = "";
    },
  },
  watch: {
    userData: {
      handler() {
        this.imageUrl = this.userData?.avatar || "";
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  display: none;
}

.user-avatar {
  padding: 20px 0;
  text-align: center;

  &__wrapper {
    position: relative;
    display: inline-block;
  }

  &__img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border: 2px solid #ccc;
    border-radius: 50%;
    transition: background ease-out 200ms;
    overflow: hidden;
    background: #fff url("../../assets/user-icon.png");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
    box-sizing: border-box;

    img {
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      object-fit: cover;
      object-position: center;
      border: 0;
      outline: none;
      background: transpfarent;
      position: relative;
      left: -1px;
      top: -1px;

      &.active {
        background: #fff;
      }
    }
  }

  .btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    transition: background-color ease-out 120ms;
    position: absolute;
    right: 6px;
    bottom: 0;

    svg {
      width: 90%;
      height: 90%;
      vertical-align: middle;
    }

    &.delete {
      bottom: auto;
      top: 0;
      right: 6px;
    }
  }

  .btn:hover {
    svg {
      fill: #fff;
    }

    background-color: #333;
    color: #ccc;
  }
}
</style>
