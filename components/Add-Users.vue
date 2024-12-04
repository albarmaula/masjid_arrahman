<template>
  <div>
    <br />
    <div class="container">
      <div class="card shadow-sm">
        <div class="card-header" id="card-header">
          <h3 class="title mb-0">Tambah User</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="addUser">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" id="email"/>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" id="password"/>
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

<script lang="ts" setup>
import { ref } from "vue";
import bcrypt from "bcryptjs";

const password = ref("");
const email = ref("");
const message = ref("");

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
      message.value = "Failed to add user";
    } else {
      message.value = "User added successfully";
    }
  } catch (error) {
    console.error("Error adding user:", error);
    message.value = "An error occurred";
  }
};
</script>
