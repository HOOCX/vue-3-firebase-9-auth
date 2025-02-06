<template lang="">
  <h1>Perfil de usuario</h1>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <div class="text-center">
        <a-avatar :size="150" :src="userStore.userData.photoURL"> </a-avatar>
        <h2>{{ userStore.userData.displayName }}</h2>
      </div>

      <a-form
        name="basicPerfil"
        autocomplete="off"
        layout="vertical"
        :model="userStore.userData"
        @finish="onFinish"
        
      >
        <a-form-item
          name="email"
          label="Correo"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Ingrese un email valido',
            },
          ]"
        >
          <a-input disabled v-model:value="userStore.userData.email"> </a-input>
        </a-form-item>
        <a-form-item
          name="displayName"
          label="Ingrese su nickname"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Ingrese un nick valido',
            },
          ]"
        >
          <a-input v-model:value="userStore.userData.displayName"> </a-input>
        </a-form-item>
        <a-upload 
            v-model:file-list="fileList" 
            list-type="picture" 
            :before-upload="beforeUpload" 
            :max-count="1"
            @change="handleChange" 
        >
            <a-button>
              <span class="ant-upload-icon">
                <a-icon type="upload" />
              </span>
              <span>Subir imagen de perfil</span>
            </a-button>
  

        </a-upload>

        <a-form-item class="mt-5">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="userStore.loadingUser"
            :loading="userStore.loadingUser"
            >Actualizar Perfil</a-button
          >
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script setup>
import { useUserStore } from '../store/user';
import { message } from 'ant-design-vue';
import { ref } from 'vue';

const userStore = useUserStore()

const fileList = ref([]);

const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file];
    return false;
};

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const handleChange = (info) => {
  if (info.file.status !== 'uploading') {
    //console.log(info.file);
    const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Solo se permiten archivos JPG o PNG!');
      handleRemove(info.file)
      return;
    }
    const isLt2M = info.file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('El tamaño del archivo debe ser inferior a 2MB!');
      handleRemove(info.file)
      return;
    }
    
  }

}

const onFinish = async () =>{
    const error = await userStore.updateUser(userStore.userData.displayName, fileList.value[0]);
    

    if(!error) {
      return message.success('Se actualizó el usuario con éxito');
    }
    return message.error('Hubo un error al actualizar el usuario');
};

</script>
<style scoped>
.text-center {
  text-align: center;
}
.mt-5 {
  margin-top: 2rem;
}
</style>
