<template>
  <div class="container">
    <!-- Header Section -->
    <div class="section-header text-center mb-5">
      <div class="row justify-content-center align-items-center">
        <div
          class="title-wrapper d-flex align-items-center justify-content-center gap-3 nav-link"
        >
          <a class="title mb-0" href="/profile">PROFIL MASJID <i class="bi bi-box-arrow-up-right"></i
        ></a>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="row">
      <!-- Welcome & Tabs Section -->
      <div class="col-lg-7">
        <div class="welcome-section">
          <h2 class="section-title">SELAMAT DATANG</h2>

          <p class="main-description">
            Masjid Oasis Ar-Rahman adalah masjid yang terletak di Jalan Jepara X
            No. 7 Surabaya, Jawa Timur. Kami berkomitmen untuk menyediakan
            fasilitas ibadah yang aman, nyaman, dan ramah bagi seluruh umat
            Islam.
          </p>

          <!-- Vision & Mission Tabs -->
          <div class="tabs-wrapper">
            <ul class="nav nav-pills" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  data-bs-toggle="pill"
                  data-bs-target="#visi"
                >
                  <i class="bi bi-eye-fill me-2"></i>VISI
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  data-bs-toggle="pill"
                  data-bs-target="#misi"
                >
                  <i class="bi bi-flag-fill me-2"></i>MISI
                </button>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="visi">
                <div class="vision-content">
                  <ul class="feature-list">
                    <li>
                      Sebagai fasilitas ibadah yang aman, nyaman, dan ramah
                      untuk umat Islam di sekitar masjid dan seluruh umat Islam
                      secara meluas.
                    </li>
                    <li>
                      Menjadi pusat da’wah dan syi’ar Islam dengan mengembangan
                      ekosistem islami berorientasi pada bidang pendidikan,
                      kesehatan, dan ekonomi, berbasis istiqamah dalam berbagi
                      berkah dan manfaat, untuk meningkatkan kualitas dan
                      kesejahteraan hidup jama’ah masjid, umat Islam di sekitar
                      masjid, dan secara meluas.
                    </li>
                    <li>
                      Sebagai wasilah menuju Masjidil Haram, Masjid Nabawi, dan
                      Masjid Al-Aqsha.
                    </li>
                  </ul>
                </div>
              </div>
              <div class="tab-pane fade" id="misi">
                <div class="mission-content">
                  <ul class="feature-list">
                    <li>
                      Meningkatkan kapasitas dan kualitas fasilitas ibadah
                      secara terencana, bertahap, dan berkelanjutan menyesuaikan
                      kebutuhan dan potensi, dengan berfokus pada keamanan,
                      kenyamanan, dan keramahan jama’ah.
                    </li>
                    <li>
                      Mengembangkan intelektualitas dan spiritualitas umat Islam
                      secara meluas melalui pendidikan.
                    </li>
                    <li>
                      Mengembangkan pemahaman Islam yang modern dan toleran
                      serta mensyi’arkan nilai-nilai keislaman sebagai
                      perwujudan Islam sebagai rahmat seluruh alam.
                    </li>
                    <li>
                      Mengembangkan platform ekosistem islami berbasis komunitas
                      berorientasi ekonomi, pendidikan, dan kesehatan untuk
                      meningkatkan kualitas dan kesejahteraan hidup umat Islam
                      di sekitar masjid dan seluruh umat Islam secara meluas.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Section -->
      <div class="col-lg-5">
        <div class="logo-wrapper text-center">
          <img class="logo-img" src="../static/logoRBG.png" alt="Logo Masjid" />
        </div>
        <div class="video-section">
          <h2 class="section-title">VIDEO PROFIL</h2>
          <div class="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/sw_6VBZwZug"
              title="Video Profil Masjid Oasis Ar-Rahman"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
