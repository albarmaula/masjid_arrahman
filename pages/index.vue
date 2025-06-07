<template>
  <div>
    <div class="header">
      <div class="header-bg-color">
        <div class="wrapper">
          <div class="container">
            <div class="row">
              <div class="banner-info text-center wow fadeIn delay-05s">
                <h1 class="bnr-title">Selamat datang di Website</h1>
                <h2 class="bnr-sub-title">Masjid Oasis Ar-Rahman Surabaya</h2>
                <div class="overlay-detail">
                  <a
                    href="#profile"
                    @click="handleScrollClick($event, '/#profile')"
                  >
                    <i class="bi bi-chevron-down"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PROFIL -->
    <div class="section" id="profile">
      <section class="section-padding wow fadeIn delay-05s">
        <Profile />
      </section>
    </div>
    <!-- PROFIL -->
    <!-- FITUR -->
    <div class="section" id="features">
      <section class="section-padding wow fadeIn delay-05s">
        <Features />
      </section>
    </div>
    <!-- FITUR -->
    <!-- KEGIATAN -->
    <div class="section" id="activities">
      <section class="section-padding wow fadeIn delay-05s">
        <Activities />
      </section>
    </div>
    <!-- KEGIATAN -->
    <!-- YOUTUBE KAJIAN -->
    <div class="section" id="youtube">
      <section class="section-padding wow fadeIn delay-05s">
        <Youtube-Kajian />
      </section>
    </div>
    <!-- YOUTUBE KAJIAN -->
    <!-- INFAQ -->
    <div class="section" id="infaq">
      <section class="section-padding wow fadeIn delay-05s">
        <Infaq />
      </section>
    </div>
    <!-- INFAQ -->
    <!-- YOUTUBE KEGIATAN -->
    <div class="section" id="youtube">
      <section class="section-padding wow fadeIn delay-05s">
        <Youtube-Kegiatan />
      </section>
    </div>
    <!-- YOUTUBE KEGIATAN -->
    <!-- GALERI -->
    <div class="section" id="gallery">
      <section class="section-padding wow fadeIn delay-05s">
        <Gallery />
      </section>
    </div>
    <!-- GALERI -->
  </div>
</template>

<script setup>
definePageMeta({
  title: "Home Page",
});

const handleScrollClick = (event, path) => {
  if (path.startsWith("/#")) {
    event.preventDefault();
    const targetId = path.substring(2);
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Use requestAnimationFrame for smoother animation
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000; // 1 second
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth animation
        const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        window.scrollTo(0, startPosition + distance * ease(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
      closeNavbar();
    }
  }
};
</script>
