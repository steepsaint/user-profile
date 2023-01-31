<template>
  <div>
    <label class="container">
      {{ placeholder }}
      <input
        :value="value"
        type="checkbox"
        @change="$emit('onChange', value)"
        :checked="checked"
      />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 8px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  & input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 3px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
}
</style>
