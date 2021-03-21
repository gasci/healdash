<template>
  <div>
    <div id="app">
      <nav-bar :authenticated="authenticated" />
      <aside-menu />
      <router-view />
      <footer-bar />
    </div>
  </div>
</template>

<style lang="scss">
</style>
<script>
import NavBar from "@/components/NavBar";
import AsideMenu from "@/components/AsideMenu";
import FooterBar from "@/components/FooterBar";

export default {
  components: { FooterBar, AsideMenu, NavBar },
  computed: {},
  data() {
    return {
      authenticated: false,
    };
  },
  created() {
    this.applyTokenHeader(); // apply token
  },
  mounted() {
    if (this.userToken) {
      this.checkToken();
    } else {
      this.confAuth(false);
    }
  },
  methods: {
  
  },
};
</script>
