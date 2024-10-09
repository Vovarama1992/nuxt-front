<script lang="ts" setup>
const props = defineProps({
  page: Number,
  limit: Number,
  totalPages: Number,
  totalItems: Number,
  pending: Boolean,
  columns: Array,
  rows: Array
});
const emit = defineEmits([ 'request', 'click' ]);
const selected = ref([]);

const extendedColumns = computed<any[]>(() =>
  [ ...(props.columns || []), { name: 'actions', label: '' } ]
);

const pagination = computed(() => (
  {
    page: props.page || 1,
    rowsPerPage: props.limit || 10,
    rowsNumber: props.totalItems || 10
  }
))
</script>

<template>
  <div>
    <q-table
      flat bordered
      :rows="rows || []"
      :columns="extendedColumns"
      row-key="title"
      :rows-per-page-options="[ limit ]"
      selection="multiple"
      v-model:selected="selected"
      v-model:pagination="pagination"
      @request="(e) => emit('request', e)"
      @onRowClick="(_, row) => emit('click', row)"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="chevron_right"
            flat
            @click="emit('click', props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>