<template>
  <!-- Add forms -->
  <div :class="$style.container">
    <div :class="$style.form" class="shadow">
      <Select
        icon="menu"
        placeholder="Type..."
        style="margin-bottom: 10px"
        :items="['credential', 'token', 'text']"
        v-model="type"
      />
      <Input
        icon="service"
        placeholder="Service..."
        style="margin-bottom: 10px"
        v-model="service"
      />
      <Input
        icon="service"
        placeholder="Description..."
        style="margin-bottom: 10px"
        v-model="description"
      />
      <Input
        v-if="type === 'credential'"
        icon="login"
        placeholder="Login..."
        style="margin-bottom: 10px"
        v-model="login"
      />
      <Input
        v-if="type === 'credential'"
        icon="key"
        :functionClick="generatePassword"
        functionIcon="copy"
        placeholder="Password..."
        style="margin-bottom: 10px"
        v-model="password"
      />
      <Input
        v-if="type === 'token'"
        icon="key"
        placeholder="Token..."
        style="margin-bottom: 10px"
        v-model="login"
      />
      <Input
        v-if="type === 'text'"
        icon="key"
        placeholder="Text..."
        style="margin-bottom: 10px"
        v-model="login"
      />
      <Button
        :disabled="isDisabled()"
        @click="add"
        icon="add"
        text="Add"
        style="margin-bottom: 10px"
      />
      <Button @click="$emit('close')" text="Cancel" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Select from '../component/Select.vue';
import Input from '../component/Input.vue';
import Button from '../component/Button.vue';
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
    add() {
      this.$emit('add', {
        service: this.service,
        description: this.description,
        type: this.type,
        content: [this.login, this.password],
      });
      this.$emit('close');
    },
    isDisabled() {
      return !(this.service && this.description && this.type && this.login);
    },
  },
  data: () => {
    return {
      service: '',
      description: '',
      type: '',
      login: '',
      password: '',
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
