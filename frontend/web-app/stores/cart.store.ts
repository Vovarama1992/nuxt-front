import { defineStore } from "pinia";

interface CartItem {
  product_id: string;
  size_id: string;
  price: number;
  discount?: number;
  size_grid: string;
  size_title: string;
  preview: string;
  title: string;
  quantity: number;
  maxQuantity: number;
};

export const useCartStore = defineStore("cart", {
  state: (): {
    cart: CartItem[];
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

    maxedOut(productId: string, sizeId: string) {
      const items = this.$state.cart.find(
        (el) => el.product_id === productId && el.size_id === sizeId
      );

      return items ? items.quantity >= items.maxQuantity : false;
    },

    add(item: {
      product_id: string;
      size_id: string;
      price?: number;
      discount?: number;
      size_grid?: string;
      size_title?: string;
      preview?: string;
      title?: string;
      maxQuantity?: number;
    }) {
      const foundItem = this.$state.cart.find(
        (el) => el.product_id === item.product_id && el.size_id === item.size_id
      );

      if (foundItem) {
        if (foundItem.quantity >= foundItem.maxQuantity) return;

        foundItem.quantity += 1;
      } else {
        /*
        if (Object.values(item).length < 8)
          throw new Error('not enough information to push to the cart');
        */

        this.$state.cart.push({ ...item, quantity: 1 } as CartItem);
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
