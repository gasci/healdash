<template>
  <section class="hero is-fullheight has-background-primary-light">
    <div class="m-20">
      <card-component title="Employees" class="has-table">
        <clients-table-sample
          :data-url="`${$router.options.base}data-sources/clients.json`"
          :checkable="true"
        />
      </card-component>
    </div>
  </section>
</template>

<script>
// import { mapState } from "vuex";
// import jwt_decode from "jwt-decode";
// import TitleBar from "@/components/TitleBar";
import ClientsTableSample from "@/components/ClientsTableSample";
import CardComponent from "@/components/CardComponent";

export default {
  name: "employees",
  data() {
    return {};
  },
  components: {
    ClientsTableSample,
    CardComponent,
  },
  computed: {},
  mounted(){
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      this.axios
        .post(this.requestUrl + `employee/list/`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          if (!error.response) {
            this.$buefy.snackbar.open({
              // network error
              message: `No connection`,
            });
          } else {
            this.$buefy.snackbar.open({
              message: `There is an error`,
            });
            console.log(error.response)
          }
        });
    },
  },
};
</script>
