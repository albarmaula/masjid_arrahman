<template>
  <div>
      <Gallery />
  </div>
</template>

<script setup>
definePageMeta({
  title: "Gallery",
  validate({ params }) {
    return /^\d+$/.test(params.page);
  },
});
</script>
