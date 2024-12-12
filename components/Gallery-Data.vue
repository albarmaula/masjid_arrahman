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
            class="gallery-image"
          />
          <!-- Navigation buttons -->
          <button
            class="nav-btn prev"
            :class="{ disabled: currentPage === 1 }"
            :disabled="currentPage === 1"
            @click="previousPage"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            class="nav-btn next"
            :class="{ disabled: currentPage === totalPages }"
            :disabled="currentPage === totalPages"
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
        <div class="image-counter">
          {{ currentPage }} / {{ totalPages }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-detail {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-content {
  display: flex;
  width: 100%;
  height: 100%;
  background: #fff;
}

.gallery-images-container {
  flex: 2;
  background: #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #fff;
}

.nav-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev {
  left: 16px;
}

.next {
  right: 16px;
}

.gallery-info {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #efefef;
  max-width: 350px;
}

.info-header {
  padding-bottom: 12px;
  border-bottom: 1px solid #efefef;
}

.info-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.info-caption {
  padding: 16px 0;
}

.info-caption h4 {
  font-size: 14px;
  margin: 0 0 8px 0;
}

.date {
  font-size: 12px;
  color: #8e8e8e;
  margin: 0;
}

.image-counter {
  margin-top: auto;
  text-align: center;
  font-size: 14px;
  color: #8e8e8e;
  padding: 16px 0;
}

@media (max-width: 768px) {
  .gallery-content {
    flex-direction: column;
  }

  .gallery-images-container {
    flex: none;
    height: 60vh;
  }

  .gallery-info {
    max-width: 100%;
    border-left: none;
    border-top: 1px solid #efefef;
  }
}
</style>

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

