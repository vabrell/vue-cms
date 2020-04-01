<template>
  <b-container>
    <h2 class="m-3">
      Statistik
      <router-link class="mt-2 float-right btn btn-sm btn-primary" to="/admin">&laquo; Tillbaka</router-link>
    </h2>
    <div>
      <b-form-select @change="setChartData" v-model="selected" :options="selectOptions"></b-form-select>
      <div class="mt-3">
        Valt år:
        <strong>{{ selected }}</strong>
      </div>
    </div>
    <Barchart v-if="loaded" :chartdata="chartdata" :options="options" :key="chart" />
    <!-- <Linechart v-if="loaded" :chartdata="chartdata" :options="options" /> -->
    <!-- <Doughnutchart class="m-5" :chartdata2="chartdata2" :options2="options2" /> -->
  </b-container>
</template>

<script>
import moment from "moment";
import Barchart from "./Barchart.vue";
//import Linechart from './Linechart.vue'
//import Doughnutchart from './Doughnutchart.vue'

export default {
  components: {
    Barchart
    //Linechart,
    //Doughnutchart
  },
  data() {
    return {
      // randomBorderColor: null,
      // randomBackgroundColor: null,
      chart: 0,
      ordersData: null,
      loaded: false,
      selected: moment().year(),
      currentYear: moment().year(),

      selectOptions: [
        {
          value: moment().year(),
          text: moment().year()
        },
        {
          value: moment()
            .subtract(1, "years")
            .year(),
          text: moment()
            .subtract(1, "years")
            .year()
        },
        {
          value: moment()
            .subtract(2, "years")
            .year(),
          text: moment()
            .subtract(2, "years")
            .year()
        }
      ],

      chartdata: {
        labels: [
          "Januari",
          "Februari",
          "Mars",
          "April",
          "Maj",
          "Juni",
          "Juli",
          "Augusti",
          "September",
          "Oktober",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Ordrar Mottagna",
            backgroundColor: "rgba(25, 140, 255, .5)",
            pointBorderColor: "rgb(80, 80, 80)"
          }
          // {
          //     label: 'Ordrar Genomförda',
          //     borderColor: 'rgb(25, 140, 255)',
          //     backgroundColor: 'rgba(25, 140, 255, .5)',
          //     pointBorderColor: 'rgb(50, 50, 50)',
          //     data: [24, 70, 45, 25, 69, 80]
          // }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Försäljningsstatistik",
          fontSize: 22
        }
      }
      // chartdata2: {
      //     labels: [
      //         'Sko 1',
      //         'Sko 2',
      //         'Sko 3'
      //     ],
      //     datasets: [{
      //         backgroundColor: ['rgb(255, 51, 51)', 'rgb(255, 221, 51)', 'rgb(25, 140, 255)'],
      //         data: [34, 22, 45]
      //     }]
      // },
      // options2: {
      //     title: {
      //         display: true,
      //         text: 'Andelar sålda produkter',
      //         fontSize: 32
      //     }
      // }
    };
  },
  created() {
    fetch("http://localhost:8080/api/orders/statistics")
      .then(response => response.json())
      .then(result => {
        this.ordersData = result;
        this.setChartData();
      });
  },
  methods: {
    // generateColor() {
    //     this.randomBorderColor = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() *
    //         256) + ', ' + Math.floor(Math.random() * 256) + ', 1)'
    //     this.randomBackgroundColor = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math
    //     .random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 0.5)'
    // },
    getStatistics(month, year) {
      let counter = 0;
      for (let [key, value] of Object.entries(this.ordersData)) {
        if (key.startsWith(month) && key.endsWith(year)) {
          counter += value.length;
        }
      }
      return counter;
    },
    setChartData() {
      this.loaded = false;

      let months = [
        "january",
        "february",
        "mars",
        "april",
        "maj",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ];
      let statistics = [];
      for (let i = 0; i < 12; i++) {
        statistics.push(this.getStatistics(months[i], this.selected));
      }
      this.chartdata.datasets[0].data = statistics;
      this.loaded = true;
      this.chart += 1;
    }
  }
};
</script>

<style scoped>
#doughnut-chart {
  width: 80% !important;
  height: 80% !important;
  margin: auto;
}
</style>