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
                  <a href="#profile">
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
        <a class="nav-link text-center" href="/profile"
          ><i class="bi bi-box-arrow-up-right"></i
        ></a>
        <Profile />
      </section>
    </div>
    <!-- PROFIL -->
    <!-- FITUR -->
    <div class="section">
      <section id="features" class="section-padding wow fadeIn delay-05s">
        <Features />
      </section>
    </div>
    <!-- FITUR -->
    <!-- KEGIATAN -->
    <div class="section" id="activities">
      <section class="section-padding wow fadeIn delay-05s">
        <a class="nav-link text-center" href="/activities"
          ><i class="bi bi-box-arrow-up-right"></i
        ></a>
        <Activities />
      </section>
    </div>
    <!-- KEGIATAN -->
    <!-- YOUTUBE -->
    <div class="section" id="youtube">
      <section class="section-padding wow fadeIn delay-05s">
        <Youtube />
      </section>
    </div>
    <!-- YOUTUBE -->
    <!-- INFAQ -->
    <div class="section" id="infaq">
      <section class="section-padding wow fadeIn delay-05s">
        <a class="nav-link text-center" href="/infaq"
          ><i class="bi bi-box-arrow-up-right"></i
        ></a>
        <Infaq />
      </section>
    </div>
    <!-- INFAQ -->
    <!-- GALERI -->
    <div class="section" id="gallery">
      <section class="section-padding wow fadeIn delay-05s">
        <a class="nav-link text-center" href="/gallery"
          ><i class="bi bi-box-arrow-up-right"></i
        ></a>
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
</script>
