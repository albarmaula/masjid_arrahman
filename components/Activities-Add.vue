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
      <button type="submit" class="btn w-100 mb-3" id="btn-submit">
        Tambah
      </button>
    </form>
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

const submitForm = async () => {
  const formData = new FormData();
  const [year, month] = monthYear.value.split("-");
  const date = `${year}-${month}-01`;
  formData.append("agenda", agendaFile.value);
  formData.append("date", date);
  flyerFiles.value.forEach((file, index) => {
    formData.append(`flyer[${index}]`, file);
  });

  // Log FormData to check the contents
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  try {
    const response = await axios.post("/api/activities", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response after uploading the activity:", response.data);
    messageSuccess.value = "Tambah data berhasil! Mohon refresh halaman";
    setTimeout(() => {
      messageSuccess.value = "";
    }, 3000);
  } catch (error) {
    console.error("Error:", error);
    messageError.value = "Terjadi kesalahan saat menambah data";
    setTimeout(() => {
      messageError.value = "";
    }, 3000);
  }
};
</script>
