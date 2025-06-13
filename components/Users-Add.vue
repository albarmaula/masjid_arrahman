<template>
  <div class="container">
    <form @submit.prevent="addUser">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="user@email.com"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
        />
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

<script lang="ts" setup>
import { ref } from "vue";
import bcrypt from "bcryptjs";

const password = ref("");
const email = ref("");
const message = ref("");
const messageError = ref("");
const messageSuccess = ref("");

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const addUser = async () => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password.value, salt);

    const response = await useFetch("/api/users", {
      method: "POST",
      body: {
        email: email.value,
        password: hashedPassword,
      },
    });

    if (response.error.value) {
      messageError.value = "Terjadi kesalahan saat menambah data";
    } else {
      messageSuccess.value = "Tambah data berhasil! Mohon refresh halaman";
      resetForm();
    }
  } catch (error) {
    messageError.value = "Terjadi kesalahan saat menambah data";
    console.error("Error:", error);
  }
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