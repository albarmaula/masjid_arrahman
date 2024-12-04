<template>
  <div>
    <br />
    <div class="container">
      <div class="card shadow-sm">
        <div class="card-header" id="card-header">
          <h3 class="title mb-0">Tambah Kegiatan</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="monthYear" class="form-label"
                >Pilih Bulan dan Tahun</label
              >
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
            <button type="submit" class="btn w-100" id="btn-submit">
              Tambah
            </button>
          </form>
        </div>
      </div>
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

// Handle agenda file upload
const handleAgendaFileUpload = (event) => {
  const file = event.target.files[0];
  agendaFile.value = file;
  agendaPreview.value = URL.createObjectURL(file);
};

// Handle multiple flyer files upload
const handleFlyerFileUpload = (event) => {
  flyerFiles.value = Array.from(event.target.files);
  flyerPreviews.value = flyerFiles.value.map((file) =>
    URL.createObjectURL(file)
  );
};

// Submit the form with agenda and flyer image files
const submitForm = async () => {
  const formData = new FormData();
  const [year, month] = monthYear.value.split("-");
  const date = `${year}-${month}-01`; // Add the first day of the selected month
  formData.append("agenda", agendaFile.value);
  formData.append("date", date);
  flyerFiles.value.forEach((file, index) => {
    formData.append(`flyer[${index}]`, file); // Add each flyer file to the form data
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
    alert(response.data.message);
  } catch (error) {
    console.error("Error uploading the activity:", error);
    alert("An error occurred while uploading the activity");
  }
};
</script>
