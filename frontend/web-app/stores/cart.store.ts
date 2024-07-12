import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: (): {
    cart: {
      product_id: string;
      size_id: string;
      price: number;
      size_grid: string;
      size_title: string;
      preview: string;
      title: string;
      quantity: number;
    }[];
  } => ({
    cart: [],
  }),
  getters: {
    quantity: (state) => state.cart.length,
  },
  actions: {
    quantityById(productId: string, sizeId: string) {
      return (
        this.$state.cart.find(
          (el) => el.product_id === productId && el.size_id === sizeId
        )?.quantity || 0
      );
    },

    add(item: {
      product_id: string;
      size_id: string;
      price: number;
      size_grid: string;
      size_title: string;
      preview: string;
      title: string;
    }) {
      const findedItem = this.$state.cart.find(
        (el) => el.product_id === item.product_id && el.size_id === item.size_id
      );

      if (findedItem) {
        findedItem.quantity += 1;
      } else {
        this.$state.cart.push({ ...item, quantity: 1 });
      }

      this.save();
    },

    del(productId: string, sizeId: string) {
      const index = this.$state.cart.findIndex(
        (el) => el.product_id === productId && el.size_id === sizeId
      );

      if (index === -1) return;

      if (this.$state.cart[index].quantity === 1) {
        this.$state.cart.splice(index, 1);
      } else {
        this.$state.cart[index].quantity -= 1;
      }
      
      this.save();
    },

    delAll(productId: string, sizeId: string) {
      console.log(productId, sizeId);
      const index = this.$state.cart.findIndex(
        (el) => el.product_id === productId && el.size_id === sizeId
      );

      if (index === -1) return;

      this.$state.cart.splice(index, 1);
      this.save();
    },

    save() {
      localStorage.setItem("cart", JSON.stringify(this.$state.cart));
    },
  
    laod() {
      this.$state.cart = JSON.parse(localStorage.getItem("cart") || '[]');
    },
  },
  
});
