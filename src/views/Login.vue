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
                <b-field :label="'username_or_email'">
                  <b-input
                    v-model="username"
                    type="text"
                    :placeholder="'username_or_email_c'"
                  ></b-input>
                </b-field>
                <b-field :label="'password'">
                  <b-input
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
                <div class="field has-text-centered m-top-10">
                  <b-button type="is-text has-text-black" tag="a"
                    >forgot_password</b-button
                  >
                  <!-- <br />
                  <a
                    class="has-text-underlined has-text-black"
                    type="is-text"
                    @click="resendConfirmationEmailPrompt"
                    >{{ t.resend_confirmation_email }}</a
                  > -->
                </div>
                <!-- <hr class="m-top-10" />
                  <b-button
                    class="has-shadow is-warning is-medium"
                    expanded
                    icon-left="envelope"
                    @click="
                      sendEvent('sign_up_with_email_clicked', {
                        username: 'anon',
                      });
                      $router.push({ name: 'register' });
                    "
                    >sign_up_with_email</b-button
                  > -->
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
  name: "Login",
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
        .post(this.requestUrl + `login/`, this.formData)
        .then((response) => {
          
          localStorage.setItem("userToken", response.data.access); // set user token
    
          this.applyTokenHeader(); // apply token header
          
          this.checkToken(); 
        })
        .catch((error) => {
          if (!error.response) {
            this.$buefy.snackbar.open({ // network error
              message: `No connection`,
            });
          } else {
            this.$buefy.snackbar.open({
              message: `Error: ${error.response.data}`,
            });
          }
        });
    },
  },
};
</script>
