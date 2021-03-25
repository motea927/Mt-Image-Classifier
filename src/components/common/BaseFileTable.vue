<template>
  <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg">
    <thead class="text-white text-center">
      <tr
        v-for="i in fileLists.length"
        :key="i"
        class="bg-primary flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
      >
        <th class="p-3">檔名</th>
        <th class="p-3">大小</th>
        <th class="p-3" width="110px">刪除</th>
      </tr>
    </thead>
    <tbody class="flex-1 sm:flex-none">
      <tr
        v-for="(file, index) in fileLists"
        :key="index"
        class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
      >
        <td class="border-grey-light border hover:bg-gray-100 p-3">{{ file.name }}</td>
        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{{ file.size }} kb</td>
        <td
          class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
          @click="$emit('deleteImg', file.name)"
        >
          Delete
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    fileLists: {
      type: Array,
      default: []
    }
  },
  emits: ['deleteImg']
}
</script>

<style>
@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, .1);
}
</style>
