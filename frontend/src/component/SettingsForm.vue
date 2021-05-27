<template>
  <!-- Add forms -->
  <div :class="$style.container">
    <div :class="$style.form" class="shadow">
      <Input
        :functionClick="generatePassword"
        functionIcon="copy"
        icon="key"
        placeholder="New master Password..."
        style="margin-bottom: 10px"
        v-model="newPassword"
      />
      <Button
        :disabled="isDisabled()"
        @click="$emit('close')"
        text="Save"
        style="margin-bottom: 10px"
      />
      <Button @click="$emit('close')" text="Cancel" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Select from './Select.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import { DataStorage } from '../util/DataStorage';

export default defineComponent({
  props: {
    placeholder: String,
    icon: String,
  },
  components: {
    Select,
    Input,
    Button,
  },
  async mounted() {},
  methods: {
    generatePassword() {
      return DataStorage.generatePassword();
    },
    isDisabled() {
      return !this.newPassword;
    },
  },
  data: () => {
    return {
      newPassword: '',
    };
  },
});
</script>

<style module lang="scss">
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  .form {
    display: flex;
    flex-direction: column;
    width: 280px;
    background: #464646;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>
