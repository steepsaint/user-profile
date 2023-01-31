<template>
  <div class="form-input">
    <label for="phone">Номер телефона</label>
    <select name="code" id="code" @change="onChange($event)">
      <option value="">Код</option>
      <option v-for="(item, index) in masksList" :key="index">
        {{ item }}
      </option>
    </select>
    <input
      :value="number"
      type="phone"
      name="phone"
      id="phone"
      :placeholder="selectedValue"
    />
  </div>
</template>

<script>
import phoneMasks from "../../assets/phoneMasks.json";
export default {
  data() {
    return {
      selectedValue: "",
      masksList: [],
    };
  },
  props: {
    number: {
      type: String,
      required: false,
    },
  },
  mounted() {
    this.masksList = Object.keys(phoneMasks);
  },
  methods: {
    onChange(event) {
      this.selectedValue = phoneMasks[event.target.value];
    },
    submitForm() {},
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  display: flex;
  flex-wrap: wrap;
}
label {
  flex: 0 0 100%;
}
select {
  flex: 0 0 29%;
  border-color: #ccc;
  border-radius: 3px;
  margin-right: 1%;
}
input {
  flex: 0 0 70%;
}
</style>
