<script setup>
import { onMounted, ref } from "vue";
import { findAlltaskRequest, savedRequest, updateRequest, deleteRequest } from '../api/user';

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Select from 'primevue/select';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from "primevue/usetoast";


const activeSpinner = ref(false)
const columns = [
  { field: '_id', header: 'ID' },
  { field: 'title', header: 'Title' },
  { field: 'description', header: 'Description' },
  { field: 'dueDate', header: 'Date' },
  { field: 'status', header: 'Status' },
  { field: 'userId', header: 'User' },
];

const profiles = [
  { value: 'pending', name: 'pending' },
  { value: 'completed', name: 'completed' },
]

const toast = useToast();
const dataSource = ref([]);
const modalCreated = ref(false);
const modalUpdate = ref(false);
const title = ref('');

//Source of Saved Data
const id = ref(0)
const name = ref('');
const description = ref('');
const date = ref('');
const status = ref('');

const clearData = () => {
  name.value = '';
  description.value = '';
  date.value = '';
  status.value = '';
}

const loadData = async () => {
  activeSpinner.value = true;
  try {
    let result = await findAlltaskRequest()
    dataSource.value = result.data;
    activeSpinner.value = false;
  } catch (error) {
    console.log(error);
  }
}

const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const showModalCreate = async () => {
  clearData();
  modalCreated.value = true;
}

const editProduct = async (data) => {
  modalUpdate.value = true;

  //loadForm
  id.value = data._id
  name.value = data.title
  description.value = data.description
  date.value = data.dueDate
  status.value = data.status
}

const save = async () => {
  let data = {
    title: name.value,
    description: description.value,
    dueDate: date.value,
    status: status.value,
  }

  let res = await savedRequest(data);
  if (res.status == 201) {
    modalCreated.value = false;
    toast.add({ severity: 'success', summary: 'Task', detail: 'Created Success', life: 4000 });
    loadData();
    clearData();
  }
}

const update = async () => {
  let _id = id.value;
  let data = { title: name.value, description: description.value, dueDate: date.value, status: status.value }
  let res = await updateRequest(_id,data);  
  if (res.status == 200) {
    modalUpdate.value = false;
    toast.add({ severity: 'info', summary: 'Task', detail: 'Update Success', life: 4000 });
    loadData();
    clearData();
  }
}

const deleteTask = async (data) => {
  let _id = data._id;
  let res = await deleteRequest(_id);  
  console.log(res);
  
  if (res.status == 204) {
    modalUpdate.value = false;
    toast.add({ severity: 'info', summary: 'Task', detail: 'Delete Success', life: 4000 });
    loadData();
    clearData();
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Configuracion Facturador</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2 mt-4">
      <Toolbar class="mb-6 m-3">
        <template #start>
          <Button label="Crear" icon="pi pi-plus" severity="success" class="m-2" @click="showModalCreate" />
          <Button label="Recargar" icon="pi pi-replay" severity="info" class="m-2" @click="loadData" />
          <Toast />
        </template>
        <template #end>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </template>
      </Toolbar>

      <div v-if="activeSpinner" class="flex justify-content-center align-items-center text-center mb-5">
        <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
      </div>

      <DataTable v-if="!activeSpinner" class="m-3 text-center" :value="dataSource" :paginator="true" :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters" stripedRows resizableColumns columnResizeMode="fit"
        showGridlines tableStyle="min-width: 50rem">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        <Column :exportable="false" style="min-width: 1rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" severity="info" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded class="mr-2" severity="danger" @click="deleteTask(slotProps.data)" />
          </template>
        </Column>
      </DataTable>

      <!-- //---Modal Create---// -->
      <Dialog v-model:visible="modalCreated" position="top" modal :header="title" :style="{ width: '100%' }">
        <template #header>
          <div class="inline-flex items-center justify-center gap-2">
            <span class="font-bold whitespace-nowrap">Save Task</span>
          </div>
        </template>
        <!-- //---Form---// -->
        <div class="card">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" v-model="name" class="form-control inputCreate">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text" v-model="description" class="form-control inputCreate">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Date</label>
                <input type="date" v-model="date" class="form-control inputCreate">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Estado</label>
                <Select v-model="status" :options="profiles" optionValue="value" filter optionLabel="name"
                  class="form-select form-select-sm" />
              </div>
            </div>
          </div>
        </div>
        <!-- //---Form---// -->
        <template #footer>
          <Button label="Cancel" text severity="danger" @click="modalCreated = false" autofocus />
          <Button label="Guardar" outlined severity="primary" @click="save" autofocus />
        </template>
      </Dialog>

      <!-- //---Modal Update---// -->
      <Dialog v-model:visible="modalUpdate" position="top" modal :header="title" :style="{ width: '100%' }">
        <template #header>
          <div class="inline-flex items-center justify-center gap-2">
            <span class="font-bold whitespace-nowrap">Actualizar Facturador</span>
          </div>
        </template>
        <!-- //---Form---// -->
        <div class="card">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" v-model="name" class="form-control inputCreate">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text" v-model="description" class="form-control inputCreate">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Date</label>
                <input type="date" v-model="date" class="form-control inputCreate">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Status</label>
                <Select v-model="status" :options="profiles" optionValue="codigo" filter optionLabel="name"
                  class="form-select form-select-sm" />
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <Button label="Cancel" text severity="danger" @click="modalUpdate = false" autofocus />
          <Button label="Actualizar" outlined severity="primary" @click="update" autofocus />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
.inputCreate {
  height: 3rem !important;
}
</style>
