<template>
  <div class="container text-center table-responsive-sm">
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <table v-else class="table table-striped table-hover table-borderless">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="btn btn-danger" @click="showDeleteModal(user.id)">
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

    <div class="modal fade" id="deleteUserModal" tabindex="-1">
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
            Apakah anda yakin ingin menghapus pengguna ini?
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
              type="button"
              class="btn btn-danger"
              @click="confirmDelete"
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
  name: "UsersList",
  setup() {
    const { $bootstrap } = useNuxtApp();
    const users = ref([]);
    const isLoading = ref(true);
    const messageError = ref("");
    const messageSuccess = ref("");
    const selectedId = ref(null);
    const modal = ref(null);

    const fetchUsers = async () => {
      isLoading.value = true;
      try {
        const response = await $fetch("/api/users");
        users.value = response;
      } catch (error) {
        console.error("Error fetching users:", error);
        messageError.value = "Gagal memuat data pengguna!";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      modal.value = new $bootstrap.Modal(
        document.getElementById("deleteUserModal"),
        {
          backdrop: false,
        }
      );
      fetchUsers();
    });

    const showDeleteModal = (user_id) => {
      selectedId.value = user_id;
      modal.value.show();
    };

    const confirmDelete = async () => {
      try {
        await $fetch("/api/users", {
          method: "DELETE",
          body: { id: selectedId.value },
        });
        messageSuccess.value = "Pengguna berhasil dihapus!";
        setTimeout(() => {
          messageSuccess.value = "";
        }, 3000);
        modal.value.hide();
        await fetchUsers();
      } catch (error) {
        messageError.value = "Gagal menghapus pengguna!";
        setTimeout(() => {
          messageError.value = "";
        }, 3000);
        console.error("Error deleting user:", error);
      }
    };

    return {
      users,
      isLoading,
      messageError,
      messageSuccess,
      showDeleteModal,
      confirmDelete,
    };
  },
});
</script>
