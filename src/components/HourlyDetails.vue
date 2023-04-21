<template>
    <div class="grid-item">
        <a-col :span="24">
            <a-collapse expand-icon-position="right">
                <a-collapse-panel :header="test">
                    <div class="details-content">
                        <a-row>
                            <a-col class="feel-like" :span="24">
                                <!-- <detail-condition :title="'Feels like'" :value="info.temp"
                            style="margin-right: 50px"></detail-condition> -->
                                <h1>{{ info.temp }}<span>&#176;</span></h1>
                                <p>{{ langDataDetails.feelslike }}</p>
                                <a-divider />
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :xs="21" :sm="10" :md="11" :lg="7">
                                <detail-condition :title="langDataDetails.humidity" :unit="'&#37;'" :precision="2"
                                    :value="info.humidity">
                                    <font-awesome-icon class="icons" :icon="['fas', 'droplet']" />
                                </detail-condition>
                            </a-col>
                            <a-col :xs="21" :sm="10" :md="11" :lg="7">
                                <detail-condition :title="langDataDetails.uv" :value="info.uvindex">
                                    <font-awesome-icon class="icons" :icon="['fas', 'sun']" />
                                </detail-condition>
                            </a-col>
                            <a-col :xs="21" :sm="10" :md="11" :lg="7">
                                <detail-condition :title="langDataDetails.windspeed" :unit="'km/h'" :value="info.windspeed">
                                    <font-awesome-icon class="icons" :icon="['fas', 'wind']" />
                                </detail-condition>
                            </a-col>
                        </a-row>
                        <a-row>

                            <a-col :xs="21" :sm="10" :md="11" :lg="7">
                                <detail-condition :title="langDataDetails.visibility" :unit="'km'" :precision="2"
                                    :value="info.visibility">
                                    <font-awesome-icon class="icons" :icon="['fas', 'eye']" />
                                </detail-condition>
                            </a-col>
                            <a-col :xs="21" :sm="10" :md="11" :lg="7">
                                <detail-condition :title="langDataDetails.cloud" :unit="'&#37;'" :precision="2"
                                    :value="info.cloudcover">
                                    <font-awesome-icon class="icons" :icon="['fas', 'cloud']" />
                                </detail-condition>
                            </a-col>
                            <a-col :xs="21" :sm="10" :md="11" :lg="7">
                                <detail-condition :title="langDataDetails.winddir" :precision="2" :value="info.winddir">
                                    <font-awesome-icon class="icons" :icon="['fas', 'location-arrow']" />
                                </detail-condition>
                            </a-col>
                        </a-row>
                    </div>
                </a-collapse-panel>
            </a-collapse>
        </a-col>
    </div>
</template>
<script>
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
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'vuex'
import { computed } from 'vue';
import DetailCondition from '@/components/DetailCondition.vue'
library.add(faDroplet, faTemperatureHalf, faEye, faWind, faSun, faLocationArrow, faCloud, faUpLong, faDownLong)
export default {
    setup() {
        const store = useStore()
        const langDataDetails = computed(() => store.getters.getLangData("details"))
        const langDataConditions = computed(() => store.getters.getLangData("conditions"))
        const getCondition = (condition) => {

            if (condition.includes(', ')) {
                const arr = condition.split(', ').map(element => {
                    return langDataConditions.value[element]
                });
                return arr.join(', ')
            }
            return langDataConditions.value[condition]
        }
        return { getCondition, langDataDetails, langDataConditions }
    },
    props: ['info'],
    components: {
        FontAwesomeIcon, DetailCondition
    },
    computed: {
        test() {
            return <div className="collapse-header">
                <p className="datetime"> {this.info.datetime.slice(0, 2)}h</p>
                <h3> {this.info.temp}<span>&#176;</span></h3>
                <div className="icon-info image">
                    <img src={this.imageSource} />
                    <p className="conditions-text">{this.getCondition(this.info.conditions)}<span class="tooltiptext">{this.getCondition(this.info.conditions)}</span></p>
                </div>
                <div className="icon-info">
                    <i class="fa-solid fa-droplet"></i>
                    <p>{this.info.humidity}<span>&#37;</span></p>
                </div>
                <div className="icon-info">
                    <i class="fa-solid fa-wind"></i>
                    <p>{this.info.windspeed}<span> km/h</span></p>
                </div>
            </div>
        },
        imageSource() {
            return "/icons/" + this.info.icon + ".png"
        }
    }
}
</script>
<style>
.ant-collapse-header {
    display: flex;
    align-items: center !important;
    padding: 2px 10px !important;
}

.collapse-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}

.collapse-header h3 {
    margin-bottom: 0;
    font-size: 20px;
    width: 50px;
}

.collapse-header p {
    margin-bottom: 0;
}

.icon-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 150px;
}

.icon-info img {
    width: 50px;
    min-height: 50px;
}

.icon-info p {
    margin-bottom: 0;
    margin-left: 10px;
    margin-right: 20px;
}

.image {
    width: 30% !important;
    white-space: nowrap;
}



.details-content {
    margin-top: 0px;
    color: black;
    padding: 0px 10px;
    border: solid 1px rgba(97, 92, 92, 0.715);
    border-radius: 5px;
}

.feel-like h1 {
    font-size: 50px !important;
}

.feel-like p {
    margin-bottom: 0px;
}

.datetime {
    margin-right: 10px;
}

.conditions-text {
    width: 60%;
    max-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;

}

.conditions-text:hover .tooltiptext {
    visibility: visible;
}

.tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    background-color: #d1cbcb;
    position: absolute;
    transform: translate(-50%, -100%);
    z-index: 1;
}

@media only screen and (max-width: 850px) {

    .icon-info img {
        width: 30px;
        min-height: 30px;
        margin-right: 10px;
    }

    .datetime {
        margin-right: 5px;
    }

    .icon-info p {
        margin-bottom: 0;
        margin-left: 5px;
        margin-right: 5px;
        min-width: 35px;
    }

    .collapse-header p {
        font-size: 12px !important;
    }

    .collapse-header h3 {
        font-size: 16px !important;
        min-width: 30px;
        width: 30px;
    }

    .feel-like h1 {
        font-size: 30px !important;
    }

    .icons {
        font-size: 16px;
    }

}

@media only screen and (max-width: 500px) {
    .conditions-text {
        display: none;
    }

    .collapse-header p {
        font-size: 10px !important;
    }

    .collapse-header h3 {
        font-size: 14px !important;
    }

    .feel-like h1 {
        font-size: 25px !important;
    }
}

@media only screen and (min-width: 1500px) {}

.conditions-text {
    width: 80%;
}
</style>