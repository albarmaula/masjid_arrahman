<script setup>
definePageMeta({
  title: "Gallery",
  validate({ params }) {
    return /^\d+$/.test(params.page);
  },
});
</script>

<template>
  <div class="pages">
      <Gallery />
  </div>
</template>