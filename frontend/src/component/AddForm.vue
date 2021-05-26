<template>
  <!-- Add forms -->
  <div :class="$style.container">
    <div :class="$style.form" class="shadow">
      <Input icon="service" placeholder="Service..." style="margin-bottom: 10px" />
      <Select icon="menu" placeholder="Type..." style="margin-bottom: 10px" />
      <Input icon="login" placeholder="Login..." style="margin-bottom: 10px" />
      <Input
        icon="key"
        :functionClick="sas"
        functionIcon="copy"
        placeholder="Password..."
        style="margin-bottom: 10px"
        v-model="password"
      />
      <Button @click="$emit('close')" icon="add" text="Add" style="margin-bottom: 10px" />
      <Button @click="$emit('close')" text="Cancel" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Select from '../component/Select.vue';
import Input from '../component/Input.vue';
import Button from '../component/Button.vue';

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
    sas() {
      return 'sas';
    },
  },
  data: () => {
    return {
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
