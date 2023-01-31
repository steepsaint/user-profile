<template>
  <div>
    <div class="multiselect" v-click-outside="onClose">
      <div class="multiselect__field" @click="onToggle">
        <template v-if="selected.length !== 0">
          <MultiSelectSelectedItem
            v-for="(item, index) in selected"
            :key="index"
            :name="
              options.find((value) => value.value === item)?.placeholder || ''
            "
            @remove="onChange(item)"
          />
        </template>
        <span v-else>{{ placeholder }}</span>

        <span class="multiselect__arrow" :class="{ active: open }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            style="enable-background: new 0 0 512 512"
            viewBox="0 0 512 512"
          >
            <path
              d="m396.6 160 19.4 20.7L256 352 96 180.7l19.3-20.7L256 310.5z"
            /></svg
        ></span>
      </div>
      <div class="multiselect__dropdown" :class="{ active: open }">
        <CustomCheckbox
          v-for="(item, index) in options"
          :key="item.placeholder + index"
          :value="item.value"
          :placeholder="item.placeholder"
          :checked="selected.includes(item.value)"
          @onChange="onChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from "./CustomCheckbox.vue";
import MultiSelectSelectedItem from "./MultiSelectSelectedItem";
export default {
  data() {
    return {
      open: false,
      selected: [],
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    selectedItems: {
      type: Array,
      required: false,
    },
  },
  components: {
    CustomCheckbox,
    MultiSelectSelectedItem,
  },
  methods: {
    onToggle() {
      this.open = !this.open;
    },
    onChange(value) {
      if (this.selected.includes(value)) {
        this.selected = this.selected.filter((item) => item !== value);
      } else {
        this.selected.push(value);
      }
      console.log(this.selected);
      this.$emit("input", this.selected);
    },
    onClose() {
      this.open = false;
    },
  },
  watch: {
    selectedItems() {
      this.selected = this.selectedItems;
    },
  },
};
</script>

<style lang="scss" scoped>
.multiselect {
  position: relative;

  &__field {
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    color: #333;
    font-size: 18px;
    outline: none;
    padding: 5px 50px 5px 10px;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
  }

  &__arrow {
    width: 40px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;

    &.active {
      transform: rotate(180deg);
    }

    svg {
      width: 15px;
      height: 15px;
    }
  }
  &__dropdown {
    position: absolute;
    right: 0;
    left: 0;
    background: #ffff;
    padding: 0 15px;
    margin-top: 10px;
    border: 1px solid #ccc;
    opacity: 0;
    transition: 0.2s;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
