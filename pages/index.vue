<template>
  <div>
    <div class="header">
      <div class="header-bg-color">
        <div class="wrapper">
          <div class="container">
            <div class="row">
              <div class="banner-info text-center wow fadeIn delay-05s">
                <h1 class="bnr-title">Selamat datang di Website</h1>
                <h2 class="bnr-sub-title">Masjid Oasis Ar-Rahman Jepara Surabaya</h2>
                <p class="bnr-para">
                  Masjid Oasis Ar-Rahman merupakan pusat kegiatan keagamaan dan sosial
                  yang terletak di Jl. Jepara X No. 7, Surabaya, yang
                  berkomitmen untuk memperkuat nilai-nilai spiritual serta
                  mempererat silaturahmi antarumat.
                </p>
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
    <!-- FITUR -->
    <div class="section">
      <div class="fitur-bg-color">
        <section id="features" class="section-padding wow fadeIn delay-05s">
          <Features />
        </section>
      </div>
    </div>
    <!-- FITUR -->
    <!-- PROFIL -->
    <div class="section" id="profile">
      <div class="profil-bg-color">
        <section class="section-padding wow fadeIn delay-05s">
          <a class="nav-link text-center" href="/profile"><i class="bi bi-box-arrow-up-right"></i></a>
          <Profile />
        </section>
      </div>
    </div>
    <!-- PROFIL -->
    <!-- KEGIATAN -->
    <div class="section" id="activities">
      <div class="kegiatan-bg-color">
        <section class="section-padding wow fadeIn delay-05s">
          <a class="nav-link text-center" href="/activities"><i class="bi bi-box-arrow-up-right"></i></a>
          <Activities />
        </section>
      </div>
    </div>
    <!-- KEGIATAN -->
    <!-- INFAQ -->
    <div class="section" id="infaq">
      <div class="infaq-bg-color">
        <section class="section-padding wow fadeIn delay-05s">
          <a class="nav-link text-center" href="/infaq"><i class="bi bi-box-arrow-up-right"></i></a>
          <Infaq />
        </section>
      </div>
    </div>
    <!-- INFAQ -->
    <!-- GALERI -->
    <div class="section" id="gallery">
      <div class="galeri-bg-color">
        <section class="section-padding wow fadeIn delay-05s">
          <Gallery />
        </section>
      </div>
    </div>
    <!-- GALERI -->
  </div>
</template>

<script setup>
definePageMeta({
  title: "Home Page",
});
</script>
