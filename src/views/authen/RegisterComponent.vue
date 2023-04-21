<template>
    <div class="main-view">
        <a-alert v-if="error" class="error-alert" message="Error" :description="error" type="error" closable />
        <a-form :model="formState" name="normal_login" class="login-form" :rules="rules" @finish="Register"
            @finishFailed="onFinishFailed">
            <h3>{{ langData.signup }}</h3>
            <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input :placeholder="langData.username" v-model:value="formState.username">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="email" :rules="[{ type: 'email', required: true, message: 'Email is not a valid email!' }]">
                <a-input :placeholder="langData.email" v-model:value="formState.email">
                    <template #prefix>
                        <MailOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item name="password"
                :rules="[{ required: true, min: 6, message: 'Password is at least 6 characters!' }]">
                <a-input-password :placeholder="langData.password" v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item name="checkPass">
                <a-input-password :placeholder="langData.checkpass" v-model:value="formState.checkPass">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>


            <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                    {{ langData.signup }}
                </a-button>
                <RouterLink :to="{ name: 'login' }">{{ langData.login }}</RouterLink>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons-vue';


export default {
    components: {
        LockOutlined, MailOutlined, UserOutlined
    },
    setup() {
        const langData = computed(() => store.getters.getLangData("register"))
        const formState = reactive({
            email: '',
            password: '',
            username: '',
            checkPass: ''
        });
        let validatePass2 = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('Please input the password again');
            } else if (value !== formState.password) {
                return Promise.reject("Password don't match!");
            } else {
                return Promise.resolve();
            }
        };

        const rules = {
            checkPass: [{
                validator: validatePass2,
                trigger: 'change',
            }],
        };
        const error = ref(null)

        const store = useStore()
        const router = useRouter()

        const Register = async () => {
            try {
                await store.dispatch('register', {
                    email: formState.email,
                    password: formState.password,
                    name: formState.username
                })
                router.push('/login')
            }
            catch (err) {
                error.value = err.message
            }
        }
        const disabled = computed(() => {
            return !(formState.email && formState.password
                && formState.username && formState.checkPass
                && (formState.password === formState.checkPass));
        });
        const onFinishFailed = (error) => {
            console.log('Failed:', error);
        };

        return { langData, Register, onFinishFailed, rules, disabled, formState, error }
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

.error-alert {
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 50px;
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