<template>
  <div>
    <h1>Home Ruta Protegida</h1>
    <p>{{ userStore.userData?.email }}</p>

    <add-form></add-form>

    <p v-if="databaseStore.loadingDocument">Loading docs...</p>

    <a-space
      direction="vertical"
      v-if="!databaseStore.loadingDocument"
      style="width: 100%"
    >
      <a-card
        v-for="item of databaseStore.document"
        :key="item.id"
        :title="item.short"
      >
        <template #extra>
          <a-space>
            <a-popconfirm title="¿Estas seguro que deseas eliminar?" 
            ok-text="Si" cancel-text="No" @confirm="confirm(item.id)" @cancel="cancel">
                <a-button danger :loading="databaseStore.loading" :disabled="databaseStore.loading"
                >Eliminar</a-button
                >
            </a-popconfirm>
            <a-button type="primary" @click="router.push(`/editar/${item.id}`)"
              >Editar</a-button
            >
          </a-space>
        </template>

        <p>{{ item.name }}</p>
      </a-card>
    </a-space>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { useDatabaseStore } from "../store/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
//import router from '../router';

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

databaseStore.getUrls();

const confirm = async(id) => {
    const error = await databaseStore.deleteUrl(id)
    if (!error) return message.success('Se elimino con exitos')
    return message.error(error);
    
}

const cancel = () => {
    message.error('No se elimino')
}
</script>
