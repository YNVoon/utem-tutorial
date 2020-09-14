<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from "../vue-chart/lineChart";
import axios from "axios";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
      actualProcessedData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    fillData(actualProcessedData) {
      this.datacollection = {
        labels: [],
        datasets: [
          {
            label: "Place 16",
            backgroundColor: "#f87979",
            data: []
          },
          {
            label: "Place 5",
            backgroundColor: "#34eb7a",
            data: []
          },
        ],
      };
      for (var item in actualProcessedData) {
          if (actualProcessedData[item].place_id == 5) {
              this.datacollection.labels.push(item);
              this.datacollection.datasets[0].data.push(actualProcessedData[item].temperature_value);
          } else {
              this.datacollection.labels.push(item);
              this.datacollection.datasets[0].data.push(actualProcessedData[item].temperature_value);
          }
          
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    getData() {
      axios({
        method: "post",
        url: "http://localhost:5000/getAllSensorData",
        data: {},
      })
        .then((response) => {
          //   console.log(response.data);
          if (response.data.status == "OK" && response.data.result.length > 0) {
            var sensorData = response.data.result;
            for (var item in sensorData) {
              if (sensorData[item].place_id == 5 || sensorData[item].place_id == 16) {
                this.actualProcessedData.push(sensorData[item]);
              }
            }
            console.log(this.actualProcessedData);
            this.fillData(this.actualProcessedData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
