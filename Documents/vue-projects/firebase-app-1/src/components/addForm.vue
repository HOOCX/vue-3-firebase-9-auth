<script setup>
import { reactive } from "vue";
import { useDatabaseStore} from "../store/database"
import { message } from "ant-design-vue"


const databaseStore = useDatabaseStore()

const formState = reactive({
  url: "",
});

const onFinish = async (value) => {
  console.log("todo correcto " + value);
  const error = await databaseStore.addUrl(formState.url)
  if (!error) {
    formState.url = ''  
    return message.success('URL added successfully') 
  }

  switch (errorRes) {
    
        default:
            message.error('Something went wrong in firebase')
            break;
    }
  
};
</script>

<template>
  <a-form
    name="addForm"
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
      :loading="databaseStore.loading" :disabled="databaseStore.loading">Agrega URL</a-button>
    </a-form-item>
  </a-form>
</template>
