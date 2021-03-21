<template>
  <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
    <div class="image">
      <a >
        <img class="has-shadow" src="../assets/logo.png"/>
      </a>
    </div>
    <div class="menu is-menu-main">
      <aside-menu-list @menu-click="menuClick" :menu="menu" />
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import AsideMenuList from "@/components/AsideMenuList";

export default {
  name: "AsideMenu",
  components: { AsideMenuList },
  data() {
    return {
      menu: eval('this.menuUnauthorized'),
    };
  },
  computed: {
    ...mapState(["isAsideVisible"]),
    menuAuthorized() {
      return [
        {
          to: "/home",
          icon: "desktop-mac",
          label: "Dashboard",
        },
        {
          to: "/tables",
          label: "Tables",
          icon: "table",
          updateMark: true,
        },
        {
          to: "/forms",
          label: "Forms",
          icon: "square-edit-outline",
        },
        {
          to: "/profile",
          label: "Profile",
          icon: "account-circle",
        },
        {
          label: "Submenus",
          subLabel: "Submenus Example",
          icon: "view-list",
          menu: [
            {
              href: "#void",
              label: "Sub-item One",
            },
            {
              href: "#void",
              label: "Sub-item Two",
            },
          ],
        },
      ];
    },
    menuUnauthorized() {
      return [
        {
          to: "/",
          icon: "login",
          label: "Login",
        },
      ];
    },
  },
  mounted() {},
  created() {
    this.$root.$on("updateSidebar", (isAuthenticatedSidebar) => {
      this.menu = isAuthenticatedSidebar
        ? this.menuAuthorized
        : this.menuUnauthorized;
    });
  },
  methods: {
    menuClick(item) {
      //
    },
  },
};
</script>
