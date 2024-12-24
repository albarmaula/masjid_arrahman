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
import { ref } from 'vue'

const caption = ref('')
const date = ref('')
const galleryFiles = ref([])
const galleryPreviews = ref([])
const messageError = ref('')
const messageSuccess = ref('')

const handleFileUpload = (event) => {
  galleryFiles.value = Array.from(event.target.files)
  galleryPreviews.value = galleryFiles.value.map((file) =>
    URL.createObjectURL(file)
  )
}

const resetForm = () => {
  caption.value = ''
  date.value = ''
  galleryFiles.value = []
  galleryPreviews.value = []
}

const submitForm = async () => {
  const formData = new FormData()
  formData.append('caption', caption.value)
  formData.append('date', date.value)
  galleryFiles.value.forEach((file, index) => {
    formData.append(`galleryImg[${index}]`, file)
  })

  try {
    const response = await fetch('/api/gallery', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    if (response.ok) {
      messageSuccess.value = 'Tambah data berhasil! Mohon refresh halaman'
      resetForm()
    } else {
      messageError.value = 'Terjadi kesalahan saat menambah data'
    }
  } catch (error) {
    messageError.value = 'Terjadi kesalahan saat menambah data'
    console.error('Error:', error)
  }

  // Clear messages after 3 seconds
  setTimeout(() => {
    messageSuccess.value = ''
    messageError.value = ''
  }, 3000)
}
</script>
