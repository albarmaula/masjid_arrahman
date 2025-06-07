<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="monthYear" class="form-label">Pilih Bulan dan Tahun</label>
        <input
          type="month"
          id="monthYear"
          v-model="monthYear"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="agendaFile" class="form-label">Upload Agenda</label>
        <input
          type="file"
          id="agendaFile"
          @change="handleAgendaFileUpload"
          accept="image/*"
          class="form-control"
          required
        />
        <div v-if="agendaPreview" class="mt-3">
          <img
            :src="agendaPreview"
            class="img-fluid rounded shadow-sm preview-image"
            alt="Agenda Preview"
          />
        </div>
      </div>
      <div class="mb-3">
        <label for="flyerFiles" class="form-label">Upload Flyer</label>
        <input
          type="file"
          id="flyerFiles"
          @change="handleFlyerFileUpload"
          accept="image/*"
          multiple
          class="form-control"
          required
        />

        <div v-if="flyerPreviews.length" class="mt-3">
          <div
            v-for="(preview, index) in flyerPreviews"
            :key="index"
            class="mb-2"
          >
            <img
              :src="preview"
              class="img-fluid rounded shadow-sm preview-image"
              alt="Flyer Preview"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="btn w-100 mb-3"
        id="btn-submit"
        :disabled="isLoading"
      >
        <span
          v-if="isLoading"
          class="spinner-border spinner-border-sm me-2"
          role="status"
        ></span>
        {{ isLoading ? "Mengunggah..." : "Tambah" }}
      </button>
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
import axios from "axios";

const monthYear = ref("");
const agendaFile = ref(null);
const flyerFiles = ref([]);
const agendaPreview = ref(null);
const flyerPreviews = ref([]);
const messageError = ref("");
const messageSuccess = ref("");
const router = useRouter();
const isLoading = ref(false);

const handleAgendaFileUpload = (event) => {
  const file = event.target.files[0];
  agendaFile.value = file;
  agendaPreview.value = URL.createObjectURL(file);
};

const handleFlyerFileUpload = (event) => {
  flyerFiles.value = Array.from(event.target.files);
  flyerPreviews.value = flyerFiles.value.map((file) =>
    URL.createObjectURL(file)
  );
};

const resetForm = () => {
  monthYear.value = "";
  agendaFile.value = null;
  flyerFiles.value = [];
  agendaPreview.value = null;
  flyerPreviews.value = [];
};

const submitForm = async () => {
  isLoading.value = true;
  const formData = new FormData();
  const [year, month] = monthYear.value.split("-");
  const date = `${year}-${month}-01`;
  formData.append("agenda", agendaFile.value);
  formData.append("date", date);
  flyerFiles.value.forEach((file, index) => {
    formData.append(`flyer[${index}]`, file);
  });

  try {
    messageSuccess.value = "";
    messageError.value = "";

    const response = await axios.post("/api/activities", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.statusCode === 200) {
      messageSuccess.value = "Tambah data berhasil! Mohon refresh halaman";
      resetForm();
    } else {
      messageError.value = "Terjadi kesalahan saat menambah data";
    }
  } catch (error) {
    console.error("Error:", error);
    messageError.value = "Terjadi kesalahan saat menambah data";
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
  color: #FFFFFF;
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