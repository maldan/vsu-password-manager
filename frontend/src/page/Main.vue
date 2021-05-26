<template>
  <div class="main">
    <!-- <div class="form shadow">
      <div class="info">Enter master password to get access</div>
      <input type="text" placeholder="Enter master password..." />
      <button>Unlock</button>
    </div> -->
    <div class="header">
      <Button icon="key" />

      <Input icon="search" placeholder="Filter..." v-model="filter" />

      <Button @click="isAdd = true" icon="add" text="Add" style="margin-left: 10px" />
      <Button @click="isSettings = true" icon="settings" />
    </div>

    <div class="items">
      <div v-for="item in selectFromFilter()" :key="item.id" class="shadow item">
        <div style="width: 80px; display: flex; align-items: center; justify-content: center">
          <img
            v-if="item.type === 'credential'"
            src="../asset/lock.svg"
            alt="Settings"
            draggable="false"
          />
          <img
            v-if="item.type === 'token'"
            src="../asset/key.svg"
            alt="Settings"
            draggable="false"
          />
          <img
            v-if="item.type === 'text'"
            src="../asset/text.svg"
            alt="Settings"
            draggable="false"
          />
        </div>
        <div style="flex: 1; margin-left: auto; display: flex; flex-direction: column">
          <div class="item-header">
            <div style="margin-right: auto">{{ item.service }}</div>
            <img
              @click="isAdd = true"
              class="clickable"
              src="../asset/pencil.svg"
              alt="Pencil"
              draggable="false"
            />
            <img
              @click="copyContent(item.content[0])"
              class="clickable"
              src="../asset/copy.svg"
              alt="Copy"
              draggable="false"
            />
            <img
              @click="copyContent(item.content[1])"
              v-if="item.type === 'credential'"
              class="clickable"
              src="../asset/copy.svg"
              alt="Copy"
              draggable="false"
            />
          </div>
          <div class="item-content">{{ item.description }}</div>
        </div>
      </div>
    </div>

    <AddForm v-if="isAdd" @close="isAdd = false" />
    <SettingsForm v-if="isSettings" @close="isSettings = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Select from '../component/Select.vue';
import Input from '../component/Input.vue';
import Button from '../component/Button.vue';
import AddForm from '../component/AddForm.vue';
import SettingsForm from '../component/SettingsForm.vue';

type Type_Item = {
  id: string;
  service: string;
  description: string;
  type: string;
  content: string[];
};

export default defineComponent({
  components: {
    Input,
    Select,
    Button,
    AddForm,
    SettingsForm,
  },
  async mounted() {},
  methods: {
    selectFromFilter() {
      if (!this.filter) {
        return this.items;
      }
      return this.items.filter(
        (x: Type_Item) => x.service.match(this.filter) || x.description.match(this.filter),
      );
    },
    copyContent(value: string): void {
      console.log(value);
    },
  },
  data: () => {
    return {
      isAdd: false,
      isSettings: false,
      filter: '',
      items: [
        {
          id: '1',
          service: 'github.com',
          description: 'Github main acc',
          type: 'credential',
          content: ['sas', 'gas'],
        },
        {
          id: '2',
          service: 'npm.com',
          description: 'Npm publish token',
          type: 'token',
          content: ['xxx'],
        },
        {
          id: '3',
          service: 'localhost',
          description: 'Some shit',
          type: 'text',
          content: ['growel night'],
        },
      ] as Type_Item[],
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  //align-items: center;
  //justify-content: center;
  height: 100%;

  .items {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;

    .item {
      background: #3d3d3d;
      display: flex;
      width: 340px;
      height: 100px;
      border-radius: 6px;
      overflow: hidden;
      flex: none;
      margin-right: 10px;
      margin-bottom: 10px;

      img {
        user-select: none;
      }

      .item-header {
        background: #515151;
        padding: 10px 15px;
        color: #a4a4a4;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #313131;
        border-left: 1px solid #313131;

        > img {
          margin-left: 10px;
        }
      }

      .item-content {
        flex: 1;
        background: #464646;
        color: #8b8b8b;
        padding: 10px 15px;
        border-left: 1px solid #313131;
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-left: 10px;

    input {
      background: #3d3d3d;
    }

    > button {
      height: 42px;
      flex: none;
      margin-right: 10px;
    }
  }
}
</style>
