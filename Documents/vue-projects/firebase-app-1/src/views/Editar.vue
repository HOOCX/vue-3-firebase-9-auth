<template>
    <div>
        <h1>Editar id: {{ route.params.id }}</h1> 
                <a-form
            name="editForm"
            autocomplete="off"
            layout="vertical"
            :model="formState"
            @finish="onFinish"
        >
            <a-form-item
            name="url"
            label="Ingrese una URL"
            type="url"
            :rules="[
                {
                required: true,
                whitespace: true,
                message: 'Ingrese una URL valida',
                
                },
            ]"
            
            >
                <a-input v-model:value="formState.url"></a-input>
            </a-form-item>
            <a-form-item>
            <a-button type="primary" html-type="submit" 
            :loading="databaseStore.loading" :disabled="databaseStore.loading">Editar URL</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
import { onMounted, reactive} from "vue";
import { useRoute } from "vue-router"
import { useDatabaseStore } from "../store/database"
import { message } from "ant-design-vue"

const databaseStore = useDatabaseStore()
const route = useRoute()

const formState = reactive({
  url: "",
});



const onFinish = async (value) => {
  console.log("todo correcto " + value);
  const error = await databaseStore.updateUrl(route.params.id, formState.url)
  if (!error) {
    formState.url = ''  
    return message.success('URL updated successfully') 
  }

  switch (errorRes) {
    
        default:
            message.error('Something went wrong in firebase')
            break;
    }
  
};


onMounted(async() => {
    formState.url = await databaseStore.leerUrl(route.params.id) 
})


</script>
