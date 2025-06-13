<template>
  <div class="container text-center table-responsive-sm">
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <table v-else class="table table-striped table-hover table-borderless">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Tanggal</th>
          <th>Caption</th>
          <th>Images</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="gallery in galleries" :key="gallery.id">
          <td>{{ gallery.id }}</td>
          <td>{{ formatDate(gallery.date) }}</td>
          <td>{{ gallery.caption }}</td>
          <td>
            <div class="gallery-images">
              <img
                v-for="(image, index) in gallery.images"
                :key="index"
                :src="image"
                alt="Gallery Image"
                class="table-image"
              />
            </div>
          </td>
          <td>
            <button class="btn btn-danger" @click="showDeleteModal(gallery.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="messageError" class="notification-error">
      <i class="bi bi-x-circle-fill"></i>
      {{ messageError }}
    </div>
    <div v-if="messageSuccess" class="notification">
      <i class="bi bi-check-circle-fill"></i>
      {{ messageSuccess }}
    </div>

    <div class="modal fade" id="deleteGalleryModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Konfirmasi Hapus</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            Apakah anda yakin ingin menghapus galeri ini?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Batal
            </button>
            <button
              @click="confirmDelete"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

interface Gallery {
  id: number;
  caption: string;
  date: string;
  images: string[]; 
}

export default defineComponent({
  name: "GalleryList",
  setup() {
    const { $bootstrap } = useNuxtApp();
    const galleries = ref<Gallery[]>([]);
    const isLoading = ref(true);
    const messageError = ref("");
    const messageSuccess = ref("");
    const selectedId = ref(null);
    const modal = ref(null);

    const fetchGalleries = async () => {
      isLoading.value = true;
      try {
        const response = await $fetch("/api/gallery");
        if (response.statusCode === 200) {
          galleries.value = response.data;
        } else {
          console.error("Failed to fetch galleries:", response.message);
          messageError.value = "Gagal memuat data galeri!";
        }
      } catch (error) {
        console.error("Error fetching galleries:", error);
        messageError.value = "Gagal memuat data pengguna!";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      modal.value = new $bootstrap.Modal(
        document.getElementById("deleteGalleryModal"),
        {
          backdrop: false, // Tambahkan ini
        }
      );
      fetchGalleries();
    });

    const showDeleteModal = (gallery_id) => {
      selectedId.value = gallery_id;
      modal.value.show();
    };

    const confirmDelete = async () => {
      try {
        const response = await $fetch("/api/gallery", {
          method: "DELETE",
          body: { id: selectedId.value },
        });

        if (response.statusCode === 200) {
          messageSuccess.value = "Galeri berhasil dihapus!";
          setTimeout(() => {
            messageSuccess.value = "";
          }, 3000);
          await fetchGalleries();
        }
      } catch (error) {
        messageError.value = "Gagal menghapus galeri!";
        setTimeout(() => {
          messageError.value = "";
        }, 3000);
        console.error("Error deleting gallery:", error);
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("id-ID", options);
    };

    return {
      galleries,
      showDeleteModal,
      confirmDelete,
      formatDate,
      messageError,
      messageSuccess,
      isLoading,
    };
  },
});
</script>
