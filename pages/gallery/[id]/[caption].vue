<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  title: "Galeri Masjid Oasis Ar-Rahman",
});

const showModal = ref(true);
const router = useRouter();

const closeModal = () => {
  showModal.value = false;
  // Dapatkan halaman terakhir dari localStorage
  const lastPage = parseInt(localStorage.getItem('galleryPage') || '1');
  router.back();
};
</script>

<template>
  <div v-if="showModal" class="gallery-modal-background" @click.self="closeModal">
    <button class="close-button" @click="closeModal" aria-label="Close modal">
      &times;
    </button>
    <div class="gallery-modal-container">
      <div class="gallery-modal-content">
        <div class="gallery-modal-grid">
          <div class="gallery-modal-image-container">
            <Gallery-Data />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>