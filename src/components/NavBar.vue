<template>
  <nav
    v-show="isNavBarVisible"
    id="navbar-main"
    class="navbar is-fixed-top"
    :class="{ 'has-background-primary-light': !authenticated }"
  >
    <div class="navbar-brand" v-if="authenticated">
      <a
        class="navbar-item is-hidden-desktop"
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </a>
      <div class="navbar-item has-control">
        <div class="control">
          <input class="input" placeholder="Search everywhere..." />
        </div>
      </div>
    </div>
    <div class="navbar-brand is-right" v-if="authenticated">
      <div class="navbar-item navbar-item-menu-toggle is-hidden-desktop">
        <a @click.prevent="menuNavBarToggle">
          <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
        </a>
      </div>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
      v-if="authenticated"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-user-avatar">
          <div class="is-user-avatar">
            <img :src="userAvatar" :alt="firstName" />
          </div>
          <div class="is-user-name">
            <span>{{ firstName }} {{ lastName }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <router-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default"></b-icon>
              <span>My Profile</span>
            </router-link>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default"></b-icon>
              <span>Settings</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="email" custom-size="default"></b-icon>
              <span>Messages</span>
            </a>
            <!-- <hr class="navbar-divider"> -->
            <!-- <a class="navbar-item">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Log Out</span>
            </a> -->
          </div>
        </nav-bar-menu>
        <!-- <a href="https://justboil.me/bulma-admin-template/two" class="navbar-item" title="About">
          <b-icon icon="help-circle-outline" custom-size="default"/>
          <span>About</span>
        </a> -->
        <a class="navbar-item" title="Log out" @click="logout">
          <b-icon icon="logout" custom-size="default" />
          <span>Log out</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import NavBarMenu from "@/components/NavBarMenu";
import { mapState } from "vuex";

export default {
  name: "NavBar",
  components: {
    NavBarMenu,
  },
  // props: {
  //   authenticated: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      isMenuNavBarActive: false,
    };
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? "close" : "dots-vertical";
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? "backburger" : "forwardburger";
    },
    ...mapState([
      "firstName", "lastName",
      "userAvatar",
      "authenticated",
      "isNavBarVisible",
      "isAsideMobileExpanded",
    ]),
  },
  mounted() {
    this.$router.afterEach(() => {
      this.isMenuNavBarActive = false;
    });
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit("asideMobileStateToggle");
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive;
    }
  },
};
</script>
