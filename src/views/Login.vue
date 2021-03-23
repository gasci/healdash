<template>
  <section class="hero is-fullheight has-background-primary-light">
    <!-- <div class="buttons m-bottom-0 p-left-20 p-right-20 p-top-20">
      <b-button
        type="is-warning"
        size="is-medium"
        icon-left="book"
        expanded
        @click="openGeneralGuide"
      >{{t.general_guide}}</b-button>
    </div>-->
    <div class="m-top-80">
      <b-loading
        :is-full-page="true"
        :active.sync="isLoading"
        :can-cancel="false"
      ></b-loading>
      <div class="container">
        <div class="columns is-centered">
          <div
            class="is-margin-auto column is-12-mobile is-6-tablet is-6-desktop is-6-widescreen is-4-fullhd"
          >
            <div class="has-text-centered m-bottom-5">
              <!-- <img width="250" alt="mealdoc" /> -->
              <!-- <br /> -->
              <div class="m-bottom-15 title is-5">
                Welcome to your Hospital Dashboard
              </div>
            </div>
            <form action class="box">
              <div class="field">
                <b-field :label="'Username or E-mail'">
                  <b-input
                    @keyup.native.enter="login"
                    v-model="username"
                    type="text"
                    :placeholder="'username or email'"
                  ></b-input>
                </b-field>
                <b-field :label="'Password'">
                  <b-input
                    @keyup.native.enter="login"
                    type="password"
                    v-model="password"
                    placeholder="********"
                    password-reveal
                  ></b-input>
                </b-field>
              </div>
              <div class="has-text-centered is-fullwidth m-top-20 p-bottom-5">
                <b-button
                  expanded
                  outlined
                  @click="login"
                  icon-left="login"
                  class="has-shadow is-primary is-medium"
                  >Login</b-button
                >
                <div class="field has-text-centered m-top-20">
                  <b-button type="is-text has-text-black" tag="a"
                    >Forgot password</b-button
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
// import jwt_decode from "jwt-decode";
import TitleBar from "@/components/TitleBar";

export default {
  name: "login",
  components: { TitleBar },
  data() {
    return {
      isLoading: false,
      authenticated: false,
      password: "",
      username: "",
    };
  },
  computed: {
    ...mapState(["userAvatar", "userEmail", "firstName", "lastName"]),
  },
  methods: {
    login() {
      this.formData.set("username", this.username);
      this.formData.set("password", this.password);
      this.axios
        .post(this.requestUrl + `auth/login/`, this.formData)
        .then((response) => {
          localStorage.setItem("userToken", response.data.access); // store the token

          this.applyTokenHeader(); // apply token header

          this.checkToken(); // check token and receive user info
        })
        .catch((error) => {
          if (!error.response) {
            this.$buefy.snackbar.open({
              // network error
              message: `No connection`,
            });
          } else {
            this.$buefy.snackbar.open({
              message: `Incorrect credentials`,
            });
            console.log(error.response)
          }
        });
    },
  },
};
</script>
