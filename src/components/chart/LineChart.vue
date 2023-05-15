<template>
    <!-- <Line v-if="'false'" class="chart" :data="chartData" :options="options" /> -->
    <div class="div">
        <canvas id="myChart" ref="chart"></canvas>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue';
import Chart from 'chart.js/auto';


export default {
    name: 'LineChart',
    setup() {
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("chart"))
        const options = {
            responsive: true,
            maintainAspectRatio: false
        }
        return { langData, options }
    },
    // components: { Line },
    props: {
        info: null,
        now: {
            default: '00:00:00'
        }
    },
    computed: {
        chartData() {
            return {
                labels: [],
                datasets: [{
                    type: 'line',
                    label: this.langData.temp,
                    fill: false,
                    borderColor: '#fd8d3c',
                    backgroundColor: 'red',
                    tension: 0.1,
                    data: [],


                },
                {
                    type: 'bar',
                    label: this.langData.uv,
                    fill: false,
                    borderColor: 'red',
                    backgroundColor: '#045a8d',
                    tension: 0.1,
                    data: [],


                }
                ]
            }
        }
    },
    watch: {
        langData() {
            // console.log(this.mixedChart)
            // this.mixedChart.data.datasets[0].label = this.langData.temp
            // this.mixedChart.data.datasets[1].label = this.langData.uv
            // this.mixedChart.update('reset');
            this.setData()
        }
    },
    data() {
        return {
            loaded: false,
            mixedChart: null

        }
    },
    methods: {
        setData() {

            this.chartData.datasets[0].data = [];
            // let now_test = this.now;
            // if (now_test > "20:00:00") now_test = "20:00:00";
            let now_test = "00:00:00";
            this.info.forEach((hour) => {
                if (hour.datetime >= now_test) {
                    this.chartData.labels.push(hour.datetime.slice(0, 2) + 'h');
                    this.chartData.datasets[0].data.push(hour.temp);
                    this.chartData.datasets[1].data.push(hour.uvindex);
                    // this.chartData.datasets[2].data.push(hour.snowdepth);
                }
            });
            const chart = this.$refs.chart
            if (this.mixedChart) {
                this.mixedChart.destroy();
            }
            this.mixedChart = new Chart(chart, {
                data: this.chartData,
                options: this.options
            });



        }

    },
    mounted() {
        this.setData()
    }
}
</script>
<style>
#myChart {
    height: 370px;
}

@media only screen and (max-width: 500px) {
    #myChart {
        max-height: 200px;
    }
}
</style>