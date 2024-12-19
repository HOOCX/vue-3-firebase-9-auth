<template>
    <h1 class="text-center">Login</h1>
    <a-row>
        <a-col :xs="{ span:24 }" :sm="{ span: 12, offset: 6}">
            <a-form  name="basicLogin" autocomplete="off" 
            layout="vertical" :model="formstate" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item name="email" label="Ingrese su correo" 
                :rules="[{required: true, whitespace: true,  message: 'Ingrese un email valido'}]" >
                    <a-input v-model:value="formstate.email">

                    </a-input>
                </a-form-item>
                <a-form-item name="password" label="Ingrese su contraseña" 
                :rules="[{required: true, min: 8, whitespace: true, message: 'Ingrese una contraseña de 8 caracteres'}]" >
                    <a-input-password v-model:value="formstate.password" >

                    </a-input-password>

                </a-form-item>
                
                <a-form-item>
                    <a-button type="primary" html-type="submit" 
                    :disabled="userStore.loadingUser" 
                    :loading="userStore.loadingUser">Acceso</a-button>
                </a-form-item>
               
            </a-form>
        </a-col>

    </a-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '../store/user';
import { message } from 'ant-design-vue';

// import {useRouter} from 'vue-router';

const userStore = useUserStore()
// const router = useRouter()

const formstate = reactive({
    email: 'hans@test.com',
    password: '12345678'
})
// const email = ref('')
// const password = ref('')



const onFinish = async(values) => {
    //console.log('Success', values);
    const errorRes = await userStore.loginUser(formstate.email, formstate.password)

    if (!errorRes) {
        return message.success('Welcome to the app: ' + formstate.email)
    }

    switch (errorRes) {
        case 'auth/user-not-found':
            message.error('User not found')
            
            break;
        case 'auth/invalid-credential':
            message.error('Invalid credential')

            break;
    
        default:
            message.error('Something went wrong in firebase')
            break;
    }
};

const onFinishFailed = erroInfo => {
    console.log('Failed', erroInfo);
};
</script>