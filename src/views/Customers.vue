<template>
  <section class="hero is-fullheight has-background-primary-light">
    <div class="m-20">
      <card-component title="Patients" class="has-table">
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
  name: "customers",
  data() {
    return {};
  },
  components: {
    ClientsTableSample,
    CardComponent,
  },
  computed: {},
  methods: {},
};
</script>
