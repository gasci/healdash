<template>
  <section class="section">
    <!-- <title-bar> Welcome, {{ firstName }} {{ lastName }}! </title-bar> -->
    <!-- <b-button class="m-bottom-20 box-shadow is-danger" @click="getUsers"
      >Example API Call (Brings all usernames)</b-button
      
    >  -->
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
    <div class="m-20">
      <!-- src="http://127.0.0.1:5000/dashboards/app-2" -->
      <iframe title="app" style="widht:100%;" width=100% height="1200" @load="isLoading = false"></iframe>
    </div>
    

  </section>
</template>
<style lang="scss">
.second-row {
  position: relative;
  background-color: red;
}
.second-row iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
<script>
// @ is an alias to /src
import { mapState } from "vuex";
import * as chartConfig from "@/components/Charts/chart.config";
import CardComponent from "@/components/CardComponent";
import Tiles from "@/components/Tiles";
import CardWidget from "@/components/CardWidget";
import LineChart from "@/components/Charts/LineChart";
import ClientsTableSample from "@/components/ClientsTableSample";
import TitleBar from "@/components/TitleBar";

export default {
  name: "home",
  components: {
    TitleBar,
    ClientsTableSample,
    CardWidget,
    Tiles,
    CardComponent,
    LineChart,
  },
  data() {
    return {
      isLoading: true,
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
    };
  },
  computed: {
    ...mapState(["userAvatar", "userEmail", "firstName", "lastName"]),
  },
  mounted() {
    // this.fillChartData();
  },
  methods: {
    load: function(){
    	this.iframe.loaded = true;
    },
    getUsers() {
      this.axios
        .post(this.requestUrl + `account/user/`)
        .then((response) => {
          // console.log(response.data);
          this.$buefy.toast.open({
            message: response.data,
          });
        })
        .catch((error) => {
          if (!error.response) {
            // network error
            this.$buefy.snackbar.open({
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
