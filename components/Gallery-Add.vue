<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="caption" class="form-label">Caption</label>
        <input
          type="text"
          id="caption"
          class="form-control"
          v-model="caption"
          required
        />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Pilih Tanggal</label>
        <input
          type="date"
          id="date"
          class="form-control"
          v-model="date"
          required
        />
      </div>
      <div class="mb-3">
        <label for="galleryImg" class="form-label">Upload Gambar</label>
        <input
          type="file"
          id="galleryImg"
          class="form-control"
          @change="handleFileUpload"
          multiple
          required
        />
        <div v-if="galleryPreviews.length" class="mt-3">
          <div
            v-for="(preview, index) in galleryPreviews"
            :key="index"
            class="mb-2"
          >
            <img
              :src="preview"
              class="img-fluid rounded shadow-sm preview-image"
              alt="Gallery Preview"
            />
          </div>
        </div>
      </div>
    </form>
    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner-wrapper">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Sedang mengunggah...</p>
      </div>
    </div>
    <!-- Notification -->
    <div v-if="messageError" class="notification-error">
      <i class="bi bi-x-circle-fill"></i>
      {{ messageError }}
    </div>
    <div v-if="messageSuccess" class="notification">
      <i class="bi bi-check-circle-fill"></i>
      {{ messageSuccess }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const caption = ref("");
const date = ref("");
const galleryFiles = ref([]);
const galleryPreviews = ref([]);
const messageError = ref("");
const messageSuccess = ref("");
const isLoading = ref(false);

const handleFileUpload = (event) => {
  galleryFiles.value = Array.from(event.target.files);
  galleryPreviews.value = galleryFiles.value.map((file) =>
    URL.createObjectURL(file)
  );
};

const resetForm = () => {
  caption.value = "";
  date.value = "";
  galleryFiles.value = [];
  galleryPreviews.value = [];
};

const submitForm = async () => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append("caption", caption.value);
  formData.append("date", date.value);
  galleryFiles.value.forEach((file, index) => {
    formData.append(`galleryImg[${index}]`, file);
  });

  try {
    messageSuccess.value = "";
    messageError.value = "";

    const response = await fetch("/api/gallery", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      messageSuccess.value = "Tambah data berhasil! Mohon refresh halaman";
      resetForm();
    } else {
      messageError.value = "Terjadi kesalahan saat menambah data";
    }
  } catch (error) {
    messageError.value = "Terjadi kesalahan saat menambah data";
    console.error("Error:", error);
  } finally {
    isLoading.value = false;
  }

  // Clear messages after 3 seconds
  setTimeout(() => {
    messageSuccess.value = "";
    messageError.value = "";
  }, 3000);
};
</script>
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner-wrapper {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.spinner-wrapper p {
  color: #1F6533;
  font-weight: 500;
  margin: 0;
}

#btn-submit {
  position: relative;
  background-color: #1F6533;
  color: white;
  transition: all 0.3s ease;
}

#btn-submit:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.spinner-border {
  width: 1.5rem;
  height: 1.5rem;
}
</style>