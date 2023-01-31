<template>
  <div>
    <span class="selected-item">
      {{ name }}
      <span class="remove" @click.stop="$emit('remove')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Livello 1"
          viewBox="0 0 128 128"
        >
          <path
            d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 122a58 58 0 1 1 58-58 58.07 58.07 0 0 1-58 58Z"
          />
          <path
            d="M92.12 35.79a3 3 0 0 0-4.24 0L64 59.75l-23.87-24A3 3 0 0 0 35.88 40l23.88 24-23.88 24a3 3 0 0 0 4.25 4.24L64 68.25l23.88 24A3 3 0 0 0 92.13 88L68.24 64l23.89-24a3 3 0 0 0-.01-4.21Z"
          /></svg
      ></span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.selected-item {
  display: inline-block;
  background: #ccc;
  border-radius: 5px;
  padding: 2px 10px;
  font-size: 14px;
  margin: 5px 5px 5px 0;

  .remove {
    padding-left: 5px;
    vertical-align: text-bottom;
    cursor: pointer;

    svg {
      width: 14px;
      height: 14px;
      vertical-align: middle;
    }
  }
}
</style>
