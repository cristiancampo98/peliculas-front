<template>
  <div class="grid grid-cols-12 gap-4">
    <div
      class="
        border border-blue-100
        hover:border-blue-500 hover:bg-blue-500 hover:text-white
        rounded-md
      "
    >
      <button @click="$emit('category_id', 'reset')">Novedades</button>
    </div>

    <div
      v-for="(cat, key) in categories"
      :key="key"
      class="
        border border-blue-100
        hover:border-blue-500 hover:bg-blue-500 hover:text-white
        rounded-md
      "
    >
      <button @click="$emit('category_id', cat.id)">{{ cat.name }}</button>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
export default {
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    getCategories() {
      axios.get("/categories").then((res) => {
        this.categories = res.data;
      });
    },
  },
};
</script>
