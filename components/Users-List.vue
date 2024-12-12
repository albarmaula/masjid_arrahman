<template>
  <div>
    <br />
    <div class="container text-center table-responsive-sm">
      <h1 class="title">Daftar User</h1>
      <table class="table table-striped table-hover table-bordered">
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
              <button class="btn btn-danger" @click="deleteUsers(user.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "UsersList",
  setup() {
    const users = ref([]);

    const fetchUsers = async () => {
      try {
        const { data } = await useFetch("/api/users");
        users.value = data.value;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const deleteUsers = async (id: number) => {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          const response: any = await $fetch("/api/users", {
            method: "delete",
            body: { id },
          });

          if (response.statusCode === 200) {
            alert(response.message);
            fetchUsers();
          } else {
            console.error("Failed to delete user:", response.message);
            alert(response.message || "Failed to delete user.");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("An error occurred while deleting the user.");
        }
      }
    };

    fetchUsers();

    return { users, deleteUsers };
  },
});
</script>
