import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: (): {
    favorites: string[];
  } => ({
    favorites: [],
  }),
  getters: {
    quantity: (state) => state.favorites.length,
  },
  actions: {
    find(productId: string) {
      return this.$state.favorites.findIndex((el) => el === productId);
    },

    add(productId: string) {
      const index = this.find(productId);
      if (index !== -1) return;
      this.$state.favorites.push(productId);
      this.save();
    },

    del(productId: string) {
      const index = this.find(productId);
      if (index === -1) return;
      this.$state.favorites.splice(index, 1);
      this.save();
    },

    save() {
      localStorage.setItem("favorites", JSON.stringify(this.$state.favorites));
    },

    laod() {
      this.$state.favorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
    },
  },
});
