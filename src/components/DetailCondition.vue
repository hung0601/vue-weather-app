<template>
    <div class="main-text">
        <a-row>
            <a-col class="icon">
                <div class="left-icon">
                    <slot></slot>
                </div>
                <p>{{ title }}</p>
            </a-col>
            <a-col class="value">
                <p> {{ value }}<span>{{ unit }}</span></p>
            </a-col>
        </a-row>
        <a-divider class="divider" />
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        title: {},
        unit: {
            default: ''
        }
    },
    computed: {
    }
}
</script>
<style>
.main-text {
    font-weight: 500;
    margin-right: 0;
}

.ant-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.main-text .ant-col {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.main-text p {
    text-align: center;
    vertical-align: middle;
    margin-bottom: 0;
    padding: 0px 10px;
}

.value p {
    text-align: end;
    width: 100%;
}

.icon {
    font-size: 2.5rem;
}

.icon p {
    font-size: 16px;
}

.left-icon {
    margin-right: 10px;
    display: flex;
    align-items: center;
    width: 25px;
}

.divider {
    width: 80% !important;
    margin-top: 10px;
    margin-bottom: 10px;
}

@media only screen and (max-width: 850px) {

    .divider {
        margin-top: 2px;
        margin-bottom: 2px;
    }

    .main-text p {
        padding: 0px 5px;
        font-size: 14px;
    }

    .left-icon {
        width: 13px !important;
    }
}

@media only screen and (max-width: 500px) {
    .divider {
        margin-top: 2px;
        margin-bottom: 2px;
    }

    .main-text p {
        padding: 0px 5px;
        font-size: 12px;
    }
}
</style>