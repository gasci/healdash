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
        
          <!-- <div class="is-user-avatar">
            <img :src="userAvatar" :alt="firstName" />
          </div>
          <div class="is-user-name">
            <span>{{ firstName }} {{ lastName }}</span>
          </div> -->

          <!-- <div slot="dropdown" class="navbar-dropdown">
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
          </div> -->
          <b-dropdown aria-role="list" position="is-bottom-left" class="m-left-10">
            
            <template #trigger="{ active }" expanded>
                <b-button
                    :label="`${ firstName } ${ lastName }`"
                    type="is-white"
                    icon-left="account"
                    style="height:100%"
                    :icon-right="active ? 'close' : 'menu-down'" />
            </template>

            <b-dropdown-item aria-role="listitem" @click="$router.push({ path: 'profile' })">
              <div class="media">
                <b-icon class="media-left" icon="account"></b-icon>
                <div class="media-content">
                  <h3>My Profile</h3>
                  <small>Edit account information/password</small>
                </div>
              </div>
            </b-dropdown-item>

            <b-dropdown-item aria-role="listitem">
              <div class="media">
                <b-icon class="media-left" icon="settings"></b-icon>
                <div class="media-content">
                  <h3>Settings</h3>
                  <small>General settings</small>
                </div>
              </div>
            </b-dropdown-item>

             <b-dropdown-item aria-role="listitem" @click="logout">
              <div class="media">
                <b-icon class="media-left" icon="logout"></b-icon>
                <div class="media-content">
                  <h3>Log Out</h3>
                  <small>End your session</small>
                </div>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        
        <!-- <a href="https://justboil.me/bulma-admin-template/two" class="navbar-item" title="About">
          <b-icon icon="help-circle-outline" custom-size="default"/>
          <span>About</span>
        </a> -->
        <!-- <a class="navbar-item" title="Log out" @click="logout">
          <b-icon icon="logout" custom-size="default" />
          <span>Log out</span>
        </a> -->
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
      "firstName",
      "lastName",
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
    },
  },
};
</script>
