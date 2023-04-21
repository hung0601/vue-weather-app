<template>
    <div class="main-view">
        <a-alert v-if="error" class="error-alert" message="Error" :description="error" type="error" closable />
        <a-form :model="formState" name="normal_login" class="login-form" @finish="Login" @finishFailed="onFinishFailed">
            <h3>{{ langData.loginform }}</h3>
            <a-form-item name="email" :rules="[{ type: 'email', required: true, message: 'Email is not a valid email!' }]">
                <a-input :placeholder="langData.email" v-model:value="formState.email">
                    <template #prefix>
                        <MailOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password :placeholder="langData.password" v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <!-- <a-form-item>
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember">{{ langData.remember }}</a-checkbox>
                </a-form-item>
                <a class="login-form-forgot" href="">{{ langData.forgotpass }}</a>
            </a-form-item> -->

            <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                    {{ langData.login }}
                </a-button>
                <RouterLink :to="{ name: 'register' }">{{ langData.register }}</RouterLink>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LockOutlined, MailOutlined } from '@ant-design/icons-vue';

export default {
    components: {
        LockOutlined,
        MailOutlined
    },
    setup() {
        const langData = computed(() => store.getters.getLangData("login"))
        const formState = reactive({
            email: '',
            password: '',
            remember: true,
        });
        const error = ref(null)

        const store = useStore()
        const router = useRouter()

        const Login = async () => {
            console.log(formState)
            try {
                await store.dispatch('logIn', {
                    email: formState.email,
                    password: formState.password
                })
                console.log(store.state.user)
                router.push('/')
            }
            catch (err) {
                console.log(err)
                error.value = err.message
            }

        }
        const onFinishFailed = (error) => {
            console.log('Failed:', error);
        };
        const disabled = computed(() => {
            return !(formState.email && formState.password);
        });
        return { langData, Login, onFinishFailed, disabled, formState, error }
    }
};
</script>
<style>
.login-form {
    background-color: white;
    padding: 20px 20px;
    border-radius: 5px;
    max-width: 40%;
    min-width: 300px;
    margin-left: 50%;
    margin-top: 250px;
    transform: translate(-50%, -50%);

}


.login-form-forgot {
    float: right;
}

.login-form-button {
    width: 100%;
}

.error-alert {
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 50px;
}
</style>