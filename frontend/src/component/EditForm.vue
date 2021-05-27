<template>
  <!-- Add forms -->
  <div :class="$style.container">
    <div :class="$style.form" class="shadow">
      <Input
        icon="service"
        placeholder="Service..."
        style="margin-bottom: 10px"
        v-model="service"
      />
      <Input
        icon="text"
        placeholder="Description..."
        style="margin-bottom: 10px"
        v-model="description"
      />
      <Input
        v-if="model.type === 'credential'"
        icon="login"
        placeholder="Login..."
        style="margin-bottom: 10px"
        v-model="login"
      />
      <Input
        v-if="model.type === 'credential'"
        icon="key"
        :functionClick="generatePassword"
        functionIcon="copy"
        placeholder="Password..."
        style="margin-bottom: 10px"
        v-model="password"
      />
      <Input
        v-if="model.type === 'token'"
        icon="key"
        placeholder="Token..."
        style="margin-bottom: 10px"
        v-model="login"
      />
      <Input
        v-if="model.type === 'text'"
        icon="key"
        placeholder="Text..."
        style="margin-bottom: 10px"
        v-model="login"
      />
      <Button @click="deleteItem" icon="delete" text="Delete" style="margin-bottom: 10px" />
      <Button :disabled="isDisabled()" @click="save" text="Save" style="margin-bottom: 10px" />
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
    model: Object,
  },
  components: {
    Select,
    Input,
    Button,
  },
  async mounted() {
    if (this.model) {
      this.service = this.model.service;
      this.description = this.model.description;
      this.login = this.model.content[0];
      this.password = this.model.content[1];
    }
  },

  methods: {
    deleteItem() {
      if (confirm('Are you sure?')) {
        this.$emit('delete', this.model?.id);
      }
    },
    generatePassword() {
      return DataStorage.generatePassword();
    },
    save() {
      this.$emit('save', {
        id: this.model?.id || '',
        service: this.service,
        description: this.description,
        content: [this.login, this.password],
      });
      this.$emit('close');
    },
    isDisabled() {
      return !(this.service && this.description && this.login);
    },
  },
  data: () => {
    return {
      service: '',
      description: '',

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
