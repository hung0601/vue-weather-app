<template>
    <Bar v-if="loaded" :data="chartData" />
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        info: null,
        now: {
            default: '00:00:00'
        }
    },
    data() {
        return {
            loaded: false,
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Temp',
                    backgroundColor: '#01495e',
                    data: []
                }
                    //     ,
                    // {
                    //     label: 'Snow',
                    //     backgroundColor: '#01495e',
                    //     data: []
                    // },
                    // {
                    //     label: 'Snow deep',
                    //     backgroundColor: 'yellow',
                    //     data: []
                    // }
                ]
            }
        }
    },
    mounted() {
        this.loaded = false;
        this.chartData.datasets[0].data = [];
        let now_test = this.now;
        if (now_test > "20:00:00") now_test = "20:00:00";
        this.info.forEach((hour) => {
            if (hour.datetime > now_test) {
                this.chartData.labels.push(hour.datetime);
                this.chartData.datasets[0].data.push(hour.temp);
                // this.chartData.datasets[1].data.push(hour.snow);
                // this.chartData.datasets[2].data.push(hour.snowdepth);
            }
        });
        this.loaded = true;
    }
}
</script>