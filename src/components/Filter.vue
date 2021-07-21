<template>
  <div>
    <label class="block" for="search">Buscar película</label>
    <input
      type="search"
      class="mr-2 pl-2 py-1 rounded-md mb-4"
      id="search"
      placeholder="Buscar película"
      v-model="name"
    />
    <button
      type="button"
      class="bg-green-500 text-white text-sm p-2 rounded-md"
      @click="searchBy"
    >
      Buscar
    </button>
  </div>
</template>
<script>
import axios from "@/axios";
export default {
  data() {
    return {
      name: "",
      films: [],
    };
  },
  methods: {
    searchBy() {
      axios
        .get("/getFilmsByName/" + this.name)
        .then((res) => {
          this.films = res.data;
        })
        .finally(() => this.$emit("films", this.films));
    },
  },
};
</script>
