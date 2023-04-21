<template>
    <div class="div">
        <canvas id="myChart" ref="chart"></canvas>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue';
import Chart from 'chart.js/auto';
export default {
    setup() {
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("chart"))
        const options = {
            responsive: true,
            maintainAspectRatio: false
        }
        return { langData, options }
    },
    props: {
        info: null,
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
                    label: this.langData.snow,
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
    data() {
        return {
            loaded: false,
            mixedChart: null
        }
    },
    watch: {
        langData() {
            this.setData();
        }
    },
    methods: {
        setData() {
            this.info.forEach((day) => {

                this.chartData.labels.push(day.datetime.slice(5));
                this.chartData.datasets[0].data.push(day.temp);
                this.chartData.datasets[1].data.push(day.snow);
                // this.chartData.datasets[2].data.push(hour.snowdepth);

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
    min-height: 250px;
    max-height: 300px;
}

@media only screen and (max-width: 500px) {
    #myChart {
        max-height: 200px;
    }
}
</style>