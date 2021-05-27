<template>
  <!-- Add forms -->
  <div :class="$style.container">
    <div :class="$style.form" class="shadow">
      <Input
        icon="key"
        type="password"
        placeholder="Enter master password..."
        style="margin-bottom: 10px"
        v-model="password"
      />
      <Button @click="unlock" icon="lock" text="Unlock" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Select from './Select.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import SHA1 from 'sha1';

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
    unlock() {
      this.$emit('unlock', SHA1(this.password));
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
