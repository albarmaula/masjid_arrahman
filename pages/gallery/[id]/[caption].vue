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
  router.back();
};
</script>

<template>
  <div v-if="showModal" class="modal-background" @click.self="closeModal">
    <button class="close-button" @click="closeModal" aria-label="Close modal">
      &times;
    </button>
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-grid">
          <!-- Left side - Image -->
          <div class="modal-image-container">
            <Gallery-Data />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90vh;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.modal-content {
  height: 100%;
  display: flex;
}

.modal-grid {
  display: flex;
  width: 100%;
  height: 100%;
}

.modal-image-container {
  flex: 1;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Close Button */
.close-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  color: #ffffff;
  cursor: pointer;
  z-index: 10000;
  transition: transform 0.2s ease;
}

.close-button:hover {
  transform: scale(1.1);
  color: #e74c3c;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .modal-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .modal-grid {
    flex-direction: column;
  }

  .modal-image-container {
    height: 60%;
  }
}
</style>