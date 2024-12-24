<template>
  <div class="gallery-detail">
    <div class="gallery-content">
      <!-- Left side - Image with navigation -->
      <div class="gallery-images-container">
        <div class="image-wrapper">
          <img
            v-for="(image, index) in paginatedImages"
            :key="index"
            :src="'data:image/jpeg;base64,' + image"
            alt="Gallery Image"
            class="gallery-image-modal"
          />
          <!-- Navigation buttons -->
          <button
            v-if="currentPage > 1"
            class="nav-btn prev"
            @click="previousPage"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            v-if="currentPage < totalPages"
            class="nav-btn next"
            @click="nextPage"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Right side - Info -->
      <div class="gallery-info">
        <!-- Header -->
        <div class="info-header">
          <h3>Galeri Masjid Oasis Ar-Rahman</h3>
        </div>

        <!-- Caption -->
        <div class="info-caption">
          <h4>{{ gallery?.caption }}</h4>
          <p class="date">{{ formatDate(gallery?.date) }}</p>
        </div>

        <!-- Image counter -->
        <div class="image-counter">{{ currentPage }} / {{ totalPages }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "GalleryDetail",
  setup() {
    const route = useRoute();
    const gallery = ref<null | {
      caption: string;
      date: string;
      images: string[];
    }>(null);
    const error = ref<string | null>(null);

    const currentPage = ref(1);
    const imagesPerPage = 1;

    const fetchGallery = async () => {
      try {
        const { id } = route.params;
        const response = await axios.get(`/api/gallery/${id}`);
        if (response.data.statusCode === 200) {
          gallery.value = response.data.data;
        } else {
          error.value = response.data.message || "Gallery item not found";
        }
      } catch (err) {
        error.value = "An error occurred while fetching gallery item";
      }
    };

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const paginatedImages = computed(() => {
      if (!gallery.value) return [];
      const start = (currentPage.value - 1) * imagesPerPage;
      const end = start + imagesPerPage;
      return gallery.value.images.slice(start, end);
    });

    const totalPages = computed(() => {
      if (!gallery.value) return 0;
      return Math.ceil(gallery.value.images.length / imagesPerPage);
    });

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    onMounted(fetchGallery);

    return {
      gallery,
      error,
      formatDate,
      paginatedImages,
      currentPage,
      totalPages,
      previousPage,
      nextPage,
    };
  },
});
</script>
