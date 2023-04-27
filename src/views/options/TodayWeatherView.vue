<template>
    <div v-if="info" id="contentToPrint">
        <div class="summary-info">
            <div class="address">
                <p>{{ info.resolvedAddress }} <span> {{ info.currentConditions.datetime }}</span></p>
            </div>
            <div class="main-info">
                <div>
                    <h3>{{ info.currentConditions.temp }}<span>&#176;</span></h3>
                    <p>{{ langData.day }} {{ getTime('12:00:00').temp }}<span>&#176;</span></p>
                    <p>{{ langData.night }} {{ getTime('23:00:00').temp }}<span>&#176;</span></p>
                    <p>{{ getCondition(info.currentConditions.conditions) }}</p>
                </div>
                <div class="main-img">
                    <img :src="`/svg/${info.currentConditions.icon}.svg`" />
                </div>
            </div>
        </div>

        <div class="main-section timeline">
            <a-row>
                <a-col :xs="20" :sm="10" :md="10" :xl="5">
                    <p>{{ langData.morning }} </p>
                    <h2>{{ getTime("08:00:00").temp }}<span>&#176;</span></h2>
                    <div class="img-info">
                        <img :src="`/svg/${getTime('08:00:00').icon}.svg`" />
                    </div>
                    <p><font-awesome-icon class="icons" :icon="['fas', 'droplet']" /> {{ getTime("08:00:00").humidity
                    }}<span>&#37;</span></p>
                </a-col>
                <div class="fade_rule"></div>
                <a-col :xs="20" :sm="10" :md="10" :xl="5">
                    <p>{{ langData.afternoon }} </p>
                    <h2>{{ getTime("14:00:00").temp }}<span>&#176;</span></h2>
                    <div class="img-info">
                        <img :src="`/svg/${getTime('14:00:00').icon}.svg`" />
                    </div>
                    <p><font-awesome-icon class="icons" :icon="['fas', 'droplet']" /> {{ getTime("14:00:00").humidity }}
                        <span>&#37;</span>
                    </p>
                </a-col>
                <div class="fade_rule fade_rule2"></div>
                <a-col :xs="20" :sm="10" :md="10" :xl="5">
                    <p>{{ langData.evening }} </p>
                    <h2>{{ getTime("19:00:00").temp }}<span>&#176;</span></h2>
                    <div class="img-info">
                        <img :src="`/svg/${getTime('19:00:00').icon}.svg`" />
                    </div>
                    <p><font-awesome-icon class="icons" :icon="['fas', 'droplet']" /> {{ getTime("19:00:00").humidity }}
                        <span>&#37;</span>
                    </p>
                </a-col>
                <div class="fade_rule"></div>
                <a-col :xs="20" :sm="10" :md="10" :xl="5">
                    <p>{{ langData.overnight }} </p>
                    <h2>{{ getTime("23:00:00").temp }}<span>&#176;</span></h2>
                    <div class="img-info">
                        <img :src="`/svg/${getTime('23:00:00').icon}.svg`" />
                    </div>
                    <p><font-awesome-icon class="icons" :icon="['fas', 'droplet']" /> {{ getTime("23:00:00").humidity }}
                        <span>&#37;</span>
                    </p>
                </a-col>
            </a-row>
        </div>
        <div class="main-section details">


            <h3>{{ langData.weathertoday }} {{ info.resolvedAddress }}</h3>
            <div class="details-content2">
                <a-row>
                    <a-col class="feel-like" :xs="22" :md="22" :lg="22" :xl="11">
                        <!-- <detail-condition :title="'Feels like'" :value="info.currentConditions.temp"
                            ></detail-condition> -->
                        <h1>{{ info.currentConditions.temp }}<span>&#176;</span></h1>
                        <p>{{ langDataDetails.feelslike }}</p>
                        <a-divider class="divider2" />
                    </a-col>
                    <a-col :xs="22" :md="22" :lg="22" :xl="11">
                        <detail-condition :title="langDataDetails.sunrise" :value="info.currentConditions.sunrise">
                            <font-awesome-icon class="icons" :icon="['fas', 'up-long']" />
                        </detail-condition>
                        <detail-condition :title="langDataDetails.sunset" :value="info.currentConditions.sunset">
                            <font-awesome-icon class="icons" :icon="['fas', 'down-long']" />
                        </detail-condition>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :xs="22" :md="22" :lg="22" :xl="11">
                        <detail-condition :title="langDataDetails.highlow" :unit="'&#176;C'" :value="info.days[0].tempmax + '/' +
                            info.days[0].tempmin">
                            <font-awesome-icon class="icons" :icon="['fas', 'temperature-half']" />
                        </detail-condition>
                    </a-col>
                    <a-col :xs="22" :md="22" :lg="22" :xl="11">
                        <detail-condition :title="langDataDetails.humidity" :unit="'&#37;'" :precision="2"
                            :value="info.currentConditions.humidity">
                            <font-awesome-icon class="icons" :icon="['fas', 'droplet']" />
                        </detail-condition>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :xs="22" :md="22" :lg="22" :xl="11">
                        <detail-condition :title="langDataDetails.uv" :value="info.currentConditions.uvindex">
                            <font-awesome-icon class="icons" :icon="['fas', 'sun']" />
                        </detail-condition>
                    </a-col>
                    <a-col :xs="22" :md="22" :lg="22" :xl="11">
                        <detail-condition :title="langDataDetails.visibility" :unit="'km'" :precision="2"
                            :value="info.currentConditions.visibility">
                            <font-awesome-icon class="icons" :icon="['fas', 'eye']" />
                        </detail-condition>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :xs="22" :md="22" :lg="22" :xl="11">
                        <detail-condition :title="langDataDetails.windspeed" :unit="'km/h'"
                            :value="info.currentConditions.windspeed">
                            <font-awesome-icon class="icons" :icon="['fas', 'wind']" />
                        </detail-condition>
                    </a-col>
                    <a-col :xs="22" :md="22" :lg="22" :xl="11">
                        <detail-condition :title="langDataDetails.winddir" :precision="2"
                            :value="info.currentConditions.winddir">
                            <font-awesome-icon class="icons" :icon="['fas', 'location-arrow']" />
                        </detail-condition>
                    </a-col>
                </a-row>
            </div>


        </div>


    </div>
</template>
<script>

import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { faUpLong } from '@fortawesome/free-solid-svg-icons'
import { faDownLong } from '@fortawesome/free-solid-svg-icons'

import DetailCondition from '@/components/DetailCondition.vue'
library.add(faDroplet, faTemperatureHalf, faEye, faWind, faSun, faLocationArrow, faUpLong, faDownLong)
import { useStore } from 'vuex'
import { computed } from 'vue';
export default {
    setup() {
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("today"))
        const langDataConditions = computed(() => store.getters.getLangData("conditions"))
        const langDataDetails = computed(() => store.getters.getLangData("details"))
        const getCondition = (condition) => {

            if (condition.includes(', ')) {
                const arr = condition.split(', ').map(element => {
                    return langDataConditions.value[element]
                });
                return arr.join(', ')
            }
            return langDataConditions.value[condition]
        }
        return { getCondition, langData, langDataDetails, langDataConditions }
    },
    computed: {
        ...mapState([
            'info'
        ])
    },
    components: { FontAwesomeIcon, DetailCondition },
    methods: {
        getTime(time) {
            if (this.info) {
                const hours = this.info.days[0].hours;
                const result = hours.find((hour) => {
                    if (hour.datetime === time) {
                        return true
                    }
                })
                return result;
            }
            return null;
        },

    },
}

</script>

<style>
:root {
    --border: 10px;
    --header-nav-bg: #001529;
    --light-bg: white;
}

.summary-info {
    background-color: #01495e;
    border-radius: var(--border);
    color: white;
    height: 250px;
    margin: 30px 20px;
}

.summary-info p {
    font-size: 1.7rem;
    margin-bottom: 0;
    margin-left: 10px;
}

.summary-info h3 {
    font-size: 8rem;
    color: aliceblue;
    margin-bottom: 5px;
}

.address {
    background-color: var(--header-nav-bg);
    border-top-right-radius: var(--border);
    border-top-left-radius: var(--border);
    padding: 5px 10px;
    align-items: center;
    display: flex;
}

.main-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}


.main-img {
    width: 100px;
}

.img-info img {
    max-width: 100px;
    height: 50px;
}

.main-section {
    margin: 30px 20px;
    padding: 10px 10px;
    background-color: white;
    border-radius: var(--border);
}

.details {
    background-color: var(--light-bg);
    border-radius: var(--border);
    color: black;
    padding: 30px 30px;
}

.details-content2 {
    margin-top: 50px;

}

.timeline {
    background-color: var(--light-bg);
    border-radius: var(--border);

}

.timeline .ant-row {
    display: flex;
    justify-content: space-around;
}

.timeline .ant-col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.timeline .img-info {
    width: 60%;
    text-align: center;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
}

.timeline h2 {
    color: #1b4de4;
    margin-bottom: 0px;
    padding-bottom: 5px;
}

.timeline .icons {
    color: #1b4de4;
}

.timeline p {
    font-weight: 500;
    margin-bottom: 0px;
    padding: 10px 0px;
}



.fade_rule {
    width: 0.7px;
    height: 150px !important;
    background-color: #E6E6E6;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.03, white), color-stop(0.5, rgba(0, 0, 0, 0.678)), color-stop(0.97, white));
}

.feel-like h1 {
    font-size: 8rem;
    margin-bottom: 0px;
}

.feel-like p {
    font-size: 18px;
    margin-left: 5px;
    margin-bottom: 0px;
}

.divider2 {
    margin-bottom: 16px;
    margin-top: 0px;
}

@media only screen and (max-width: 1200px) and (min-width: 600px) {
    .fade_rule2 {
        display: none;
    }
}

@media only screen and (max-width: 600px) {
    .fade_rule {
        display: block;
        height: 0.7px !important;
        width: 100% !important;
        background-color: #E6E6E6;
        background-image: -webkit-gradient(linear, top left, top right, color-stop(0.03, white), color-stop(0.5, rgba(0, 0, 0, 0.678)), color-stop(0.97, white));

    }

    .icons {
        font-size: 18px;
    }

    .details-content2 {
        margin-top: 10px;
    }
}
</style>
