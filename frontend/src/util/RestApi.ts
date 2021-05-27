import Axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || `${window.location.origin}/api`;

export const RestApi = {
  main: {
    async items() {
      return (await Axios.get(`${API_URL}/main/list`)).data.response;
    },
    async addItem(args: { type: string; service: string; description: string; content: string[] }) {
      return (await Axios.post(`${API_URL}/main/item`, args)).data.response;
    },
    async deleteItem(id: string) {
      return (await Axios.delete(`${API_URL}/main/item?id=${id}`)).data.response;
    },
    async updateItem(args: {
      id: string;
      service: string;
      description: string;
      content: string[];
    }) {
      return (await Axios.patch(`${API_URL}/main/item`, args)).data.response;
    },
  },
};
