<template>
  <div :class="$style.select">
    <div :class="$style.icon">
      <img
        :src="require(`@/asset/${icon}.svg`)"
        alt="Settings"
        draggable="false"
        style="width: 17px"
      />
    </div>
    <input type="text" :placeholder="placeholder" />
    <button :class="$style.icon">
      <img src="../asset/arrow.down.svg" alt="Settings" draggable="false" style="width: 17px" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    placeholder: String,
    icon: String,
  },
  async mounted() {},
  methods: {},
  data: () => {
    return {};
  },
});
</script>

<style module lang="scss">
.select {
  display: flex;
  align-items: center;
  flex: 1;

  .icon {
    flex: none;
    background: #515151;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid #313131;
    box-sizing: border-box;

    img {
      display: block;
    }

    &:last-child {
      border: 0;
      border-radius: 0 4px 4px 0;
      border-left: 1px solid #313131;
    }
  }

  input {
    box-sizing: border-box;
    background: #3d3d3d;
    color: #9d9d9d;
    border: 0;
    padding: 10px;
    flex: none;
    width: calc(100% - 40px - 40px);
    outline: none;
    font-size: 16px;
    border: 1px solid transparent;

    &:focus {
      border: 1px solid #888888;
    }
  }

  button {
    background: #515151;
    color: #9d9d9d;
    border: 0;
    padding: 10px 15px;
    border-radius: 4px;
    flex: 1;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;

    img {
      display: block;
      margin-left: 15px;
    }

    img:nth-child(1) {
      margin-left: 0;
    }

    &:hover {
      opacity: 0.7;
    }

    &:active {
      position: relative;
      opacity: 0.6;
      top: 1px;
    }
  }
}
</style>
