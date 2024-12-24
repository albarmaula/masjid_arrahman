<template>
  <div class="pages">
    <div class="login-container">
      <div class="login-card">
        <h2><i class="bi bi-shield-lock"></i> Admin Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control"
              required
            />
          </div>
          <div v-if="message" class="notification-error">
            <i class="bi bi-x-circle-fill"></i>
            {{ message }}
          </div>
          <button type="submit" class="btn-form w-100" :disabled="isLoading">
            {{ isLoading ? "Loading..." : "Login" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const email = ref("");
const password = ref("");
const message = ref("");
const isLoading = ref(false);
const isError = ref(false);
const router = useRouter();

const handleLogin = async () => {
  try {
    isLoading.value = true;
    const token = useCookie("admin_token");
    const user = useCookie("user");

    const { data, error } = await useFetch("/api/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (error.value) {
      message.value = error.value.data?.statusMessage || "Login failed";
      isError.value = true;
      return;
    }

    if (data.value?.statusCode === 200) {
      token.value = data.value.data.token;
      user.value = JSON.stringify(data.value.data.user);
      router.push("/admin");
    }
  } catch (err) {
    message.value = "An unexpected error occurred";
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>