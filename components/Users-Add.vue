<template>
  <div class="container">
    <form @submit.prevent="addUser">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="user@email.com"/>
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
      <button type="submit" class="btn w-100 mb-3" id="btn-submit">Tambah</button>
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
const messageError = ref('')
const messageSuccess = ref('')

const resetForm = () => {
  email.value = ''
  password.value = ''
}

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
      messageError.value = 'Terjadi kesalahan saat menambah data'
    } else {
      messageSuccess.value = 'Tambah data berhasil! Mohon refresh halaman'
      resetForm()
    }
  } catch (error) {
    messageError.value = 'Terjadi kesalahan saat menambah data'
    console.error('Error:', error)
  }
};
</script>
