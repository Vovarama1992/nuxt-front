import { defineStore } from "pinia";

type names = "search" | "none" | "auth" | "menu";

export const useHeaderStore = defineStore("header", {
  state: (): {
    showMenu: boolean;
    currentMenuNema: names;
    loading: boolean;
  } => ({
    showMenu: false,
    currentMenuNema: "none",
    loading: false,
  }),
  actions: {
    show(name: names) {
      this.$state.showMenu = true;
      this.$state.currentMenuNema = name;
    },

    hide() {
      this.$state.showMenu = false;
      this.$state.currentMenuNema = "none";
    },
  },
});
