import jwt_decode from "jwt-decode";

export default {
    components: {


    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            userToken: localStorage.getItem('userToken'),
            formData: new FormData(),
            requestUrl: 'http://127.0.0.1:8000/',
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('userToken')
            this.confAuth(false);
        },
        goToPageName(pageName) {
            if (this.$route.name !== pageName) {
                this.$router.push({ name: pageName });
            }
        },
        updateUserInfo(userInfo) {
            this.$store.commit("user", userInfo);
        },
        applyTokenHeader() {
            this.userToken = localStorage.getItem("userToken");

            if (this.userToken) {
                this.axios.defaults.headers.common = {
                    Authorization: "Bearer " + this.userToken,
                    "Content-Type": "application/json",
                };
            }
        },
        confAuth(authenticated = false, userInfo = null) {
            if (authenticated) {
                this.$root.$emit("updateSidebar", true); // update sidebar structure

                this.$store.commit("auth", { // change store data
                    authenticated: true,
                });

                if (userInfo) {
                    this.updateUserInfo({
                        email: userInfo.email,
                        firstName: userInfo.first_name,
                        lastName: userInfo.last_name,
                        avatar: "https://avatars.dicebear.com/v2/gridy/John-Doe.svg",
                    });
                }

                this.goToPageName('home'); // go to dashboard

            } else {
                this.$store.commit("auth", {
                    authenticated: false,
                });

                this.$root.$emit('updateSidebar', false);

                this.goToPageName('login');
            }
        },
        checkToken() {
            this.axios
                .post(this.requestUrl + `token_check/`)
                .then(() => {
                    var userInfo = jwt_decode(this.userToken);
                    this.confAuth(true, userInfo);
                })
                .catch((error) => {
                    if (!error.response) {
                        // network error
                        this.$buefy.snackbar.open({
                            message: `No connection`,
                        });
                    } else {
                        this.$buefy.snackbar.open({
                            message: `Session expired`,
                        });
                    }
                    this.logout();
                });
        },
    }
}