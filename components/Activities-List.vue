<template>
  <div class="container text-center table-responsive-sm">
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <table v-else class="table table-striped table-hover table-borderless">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Bulan</th>
          <th>Agenda</th>
          <th>Flyers</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :key="activity.id">
          <td>{{ activity.id }}</td>
          <td>{{ formatDate(activity.date) }}</td>
          <td>
            <div class="activity">
              <img
                v-if="activity.agenda"
                :src="activity.agenda"
                class="table-image"
                alt="Agenda Image"
              />
            </div>
          </td>
          <td>
            <div class="activity">
              <img
                v-for="flyer in activity.flyers"
                :key="flyer.activity_id"
                :src="flyer.img"
                alt="Flyer"
                class="table-image"
              />
            </div>
          </td>
          <td>
            <button
              class="btn btn-danger"
              @click="showDeleteModal(activity.id)"
            >
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

    <div class="modal fade" id="deleteActivityModal" tabindex="-1">
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
            Apakah anda yakin ingin menghapus kegiatan ini?
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

export default defineComponent({
  name: "ActivitiesList",
  setup() {
    const { $bootstrap } = useNuxtApp();
    const activities = ref([]);
    const isLoading = ref(true);
    const messageError = ref("");
    const messageSuccess = ref("");
    const selectedId = ref(null);
    const modal = ref(null);

    const fetchActivities = async () => {
      isLoading.value = true;
      try {
        const response = await $fetch("/api/activities");
        if (response.statusCode === 200) {
          activities.value = response.data;
        } else {
          console.error("Failed to fetch activities:", response.message);
          messageError.value = "Gagal memuat data kegiatan!";
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        messageError.value = "Gagal memuat data kegiatan!";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      modal.value = new $bootstrap.Modal(
        document.getElementById("deleteActivityModal")
      );
      fetchActivities();
    });

    const showDeleteModal = (activities_id) => {
      selectedId.value = activities_id;
      modal.value.show();
    };

    const confirmDelete = async () => {
      try {
        const response = await $fetch("/api/activities", {
          method: "DELETE",
          body: { id: selectedId.value },
        });

        if (response.statusCode === 200) {
          messageSuccess.value = "Kegiatan berhasil dihapus!";
          setTimeout(() => {
            messageSuccess.value = "";
          }, 3000);
          await fetchActivities();
        }
      } catch (error) {
        messageError.value = "Gagal menghapus kegiatan!";
        setTimeout(() => {
          messageError.value = "";
        }, 3000);
        console.error("Error deleting activity:", error);
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long" };
      return date.toLocaleDateString("id-ID", options);
    };

    return {
      activities,
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
