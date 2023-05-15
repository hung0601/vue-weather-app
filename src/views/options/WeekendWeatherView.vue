<template>
    <div v-if="info">


        <div class="main-section">
            <h3>{{ langData.text }} {{ info.resolvedAddress }}</h3>
            <div class="export">
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1" title="pdf"><font-awesome-icon :icon="['fas', 'file-pdf']" />
                                pdf</a-menu-item>
                            <a-menu-item key="2" title="csv"><font-awesome-icon :icon="['fas', 'table']" />
                                csv</a-menu-item>
                            <a-menu-item key="2" title="excel"><font-awesome-icon :icon="['fas', 'table']" />
                                excel</a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        <font-awesome-icon :icon="['fas', 'file-export']" />
                        <DownOutlined />
                    </a-button>
                </a-dropdown>
            </div>
            <div class="grid-container">
                <weekend-details v-for="(day, index) in info.days" v-show="index != 14" :key="day.datetime" :info="day" />
            </div>
        </div>
    </div>
</template>
<script>
import { jsPDF } from "jspdf"
import 'jspdf-autotable'
import exportFromJSON from "export-from-json";

import { mapState } from 'vuex'
import WeekendDetails from '@/components/WeekendDetails.vue'


import { DownOutlined } from '@ant-design/icons-vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'vuex'
import { computed } from 'vue';
import * as XLSX from 'xlsx/xlsx.mjs';
library.add(faFileExport, faFilePdf, faTable)
export default {
    setup() {
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("days"))
        const langDataDetails = computed(() => store.getters.getLangData("details"))
        return { langData, langDataDetails }
    },
    computed: {
        ...mapState([
            'info'
        ])
    },
    components: {
        WeekendDetails, FontAwesomeIcon, DownOutlined
    },
    methods: {
        print() {
            console.log(this.info)
        },
        handleMenuClick(e) {
            switch (e.item.title) {
                case "pdf":
                    this.exportPdf();
                    break;
                case "csv":
                    this.exportExcel();
                    break;
                case "excel":
                    this.exportSheet();
                    break;
                default:
                    console.log('error');
                    break;
            }
        },
        exportPdf() {
            const doc = new jsPDF({
                orientation: "p", //set orientation
                unit: "pt", //set unit for document
                format: "letter" //set document standard
            });
            var columns = [
                { title: "Datetime", dataKey: "datetime" },
                { title: "Temperature", dataKey: "temp" },
                { title: "Conditions", dataKey: "conditions" },
                { title: "Feels like", dataKey: "feelslike" },
                { title: "Humidity", dataKey: "humidity" },
                { title: "UV index", dataKey: "uvindex" },
                { title: "Wind Speed", dataKey: "windspeed" }
            ];
            var rows = [];
            this.info.days.forEach(day => {
                rows.push({
                    'datetime': day.datetime,
                    'temp': day.temp,
                    'conditions': day.conditions,
                    'feelslike': day.feelslike,
                    'humidity': day.humidity,
                    'uvindex': day.uvindex,
                    'windspeed': day.windspeed
                });
            });
            doc.autoTable(columns, rows, {
                margin: { top: 60 },
                addPageContent: () => {
                    doc.text(" 15 days Weather " + this.info.address, 40, 30);
                }
            });
            doc.save(this.info.resolvedAddress + " 15 days weather data" + '.pdf');
        },

        exportExcel() {
            const data = this.info.days;
            const fileName = this.info.resolvedAddress + " 15 days weather data";
            const exportType = exportFromJSON.types.csv;
            const fields = {
                datetime: 'Datetime',
                temp: 'Temperature',
                conditions: 'Conditions',
                feelslike: 'Feels like',
                humidity: 'Humidity',
                uvindex: 'UV index ',
                windspeed: 'Wind Speed'
            };

            if (data) exportFromJSON({ data: data, fileName: fileName, exportType: exportType, fields: fields });
        },
        exportSheet: function () {
            const data = this.info.days.map((e) => {
                return {
                    datetime: e.datetime,
                    temp: e.temp,
                    conditions: e.conditions,
                    feelslike: e.feelslike,
                    humidity: e.humidity,
                    uvindex: e.uvindex,
                    windspeed: e.windspeed
                }
            })
            const fileName = this.info.resolvedAddress + " 15 days weather data.xlsx";
            const workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Weather data");
            XLSX.writeFileXLSX(workbook, fileName, { bookType: "xlsx" });
        }
    }
}
</script>
<style>
:root {
    --border: 10px;
}

.main-section {
    margin: 30px 20px;
    padding: 10px 10px;
    background-color: white;
    border-radius: var(--border);
}

.export {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.grid-container {
    display: grid;
    grid-template-columns: 100%;
}

@media only screen and (min-width: 1200px) {
    .grid-container {
        display: grid;
        grid-template-columns: 50% 50%;
    }
}
</style>