<template>
  <div class="flex justify-center">
    <form
      @submit.prevent="storeFilm()"
      action="#"
      method="POST"
      class="text-left"
    >
      <ul
        class="text-white bg-red-500 p-2 mb-4 rounded-md"
        v-if="Object.keys(errors).length"
      >
        <li class="text-center" v-for="(err, key) in errors" :key="key">
          {{ err[0] }}
        </li>
      </ul>
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <!-- carátula -->
            <div class="col-span-3 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                Carátula
              </label>
              <div
                class="
                  mt-1
                  flex
                  justify-center
                  px-6
                  pt-5
                  pb-6
                  border-2 border-gray-300 border-dashed
                  rounded-md
                "
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="
                        relative
                        cursor-pointer
                        bg-white
                        rounded-md
                        font-medium
                        text-indigo-600
                        hover:text-indigo-500
                        focus-within:outline-none
                        focus-within:ring-2
                        focus-within:ring-offset-2
                        focus-within:ring-indigo-500
                      "
                    >
                      <span>Subir archivo</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        @change="getImage"
                      />
                    </label>
                    <p class="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
              <p class="text-sm text-green-500" v-if="upload">¡Hecho!</p>
            </div>
            <!-- title -->
            <div class="col-span-3 sm:col-span-3">
              <label
                for="title"
                class="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="title"
                  class="
                    focus:ring-indigo-500 focus:border-indigo-500
                    flex-1
                    block
                    w-full
                    rounded-none rounded-r-md
                    sm:text-sm
                    border-gray-300
                  "
                  v-model="form.title"
                />
              </div>
            </div>
            <!-- description -->
            <div class="col-span-3 sm:col-span-3">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                Descrición
              </label>
              <div class="mt-1">
                <textarea
                  id="description"
                  rows="3"
                  class="
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    mt-1
                    block
                    w-full
                    sm:text-sm
                    border border-gray-300
                    rounded-md
                  "
                  v-model="form.description"
                />
              </div>
            </div>
            <!-- duration -->
            <div class="col-span-3 sm:col-span-2">
              <label
                for="duration"
                class="block text-sm font-medium text-gray-700"
              >
                Duración
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="duration"
                  class="
                    focus:ring-indigo-500 focus:border-indigo-500
                    flex-1
                    block
                    w-full
                    rounded-none rounded-r-md
                    sm:text-sm
                    border-gray-300
                  "
                  v-model="form.duration"
                />
              </div>
            </div>
            <!-- release date -->
            <div class="col-span-3 sm:col-span-2">
              <label
                for="release_date"
                class="block text-sm font-medium text-gray-700"
              >
                Fecha de estreno
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="date"
                  id="release_date"
                  class="
                    focus:ring-indigo-500 focus:border-indigo-500
                    flex-1
                    block
                    w-full
                    rounded-none rounded-r-md
                    sm:text-sm
                    border-gray-300
                  "
                  v-model="form.release_date"
                />
              </div>
            </div>
            <!-- categories -->
            <div class="col-span-3 sm:col-span-3" v-if="categories.length">
              <label
                for="categories"
                class="block text-sm font-medium text-gray-700"
              >
                Categorías
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <vSelect
                  multiple
                  class="w-full"
                  :options="categories"
                  :reduce="(categories) => categories.id"
                  label="name"
                  v-model="form.categories"
                />
              </div>
            </div>
            <div class="col-span-3 sm:col-span-3" v-else>
              Cargando categorias...
            </div>
            <!-- trailer -->
            <div class="col-span-3 sm:col-span-3">
              <label
                for="tailer"
                class="block text-sm font-medium text-gray-700"
              >
                Trailer
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span
                  class="
                    inline-flex
                    items-center
                    px-3
                    rounded-l-md
                    border border-r-0 border-gray-300
                    bg-gray-50
                    text-gray-500 text-sm
                  "
                >
                  http://
                </span>
                <input
                  type="text"
                  id="tailer"
                  class="
                    focus:ring-indigo-500 focus:border-indigo-500
                    flex-1
                    block
                    w-full
                    rounded-none rounded-r-md
                    sm:text-sm
                    border-gray-300
                  "
                  placeholder="www.example.com"
                  v-model="form.trailer"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="
              inline-flex
              justify-center
              py-2
              px-4
              border border-transparent
              shadow-sm
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "@/axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    vSelect,
  },
  data() {
    return {
      categories: [],
      upload: false,
      errors: [],
      form: {
        caratula: "",
        title: "Prueba",
        description: "lorem ipsum",
        duration: 190,
        categories: [],
        trailer: "https://youtube.com",
        release_date: null,
      },
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios.get("/categories").then((data) => {
        this.categories = data.data;
      });
    },
    getImage(event) {
      this.form.caratula = event.target.files[0];
      this.upload = true;
    },
    storeFilm() {
      const data = new FormData();
      data.append("caratula", this.form.caratula);
      data.append("title", this.form.title);
      data.append("description", this.form.description);
      data.append("duration", this.form.duration);
      data.append("release_date", this.form.release_date);
      for (let i = 0; i < this.form.categories.length; i++) {
        data.append("categories[]", this.form.categories[i]);
      }

      data.append("trailer", this.form.trailer);
      axios
        .post("/films", data)
        .then(() => {
          this.errors = [];
          this.setNullForm();
          this.upload = false;
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        })
        .finally(() => {});
    },

    setNullForm() {
      (this.form.caratula = ""),
        (this.form.title = ""),
        (this.form.description = ""),
        (this.form.duration = 0),
        (this.form.categories = []),
        (this.form.trailer = ""),
        (this.form.release_date = null);
    },
  },
};
</script>
