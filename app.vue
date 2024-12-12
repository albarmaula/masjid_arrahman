<template>
  <div id="app">
    <div class="loader"></div>
    <div id="myDiv">
      <!-- HEADER -->
      <header id="home">
        <nav class="navbar navbar-expand-lg navbar-default fixed-top">
          <div class="container navbar-header">
            <a href="#">
              <img src="/static/logoRBG.png" class="img-responsive nav-logo" />
            </a>
            <a class="navbar-brand" href="#" style="margin-left: 10px">
              Masjid Oasis Ar-Rahman
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/">
                    <i class="bi bi-house-fill"></i> Beranda
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#profile">
                    <i class="bi bi-person"></i> Profil
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#activities">
                    <i class="bi bi-calendar-event"></i> Kegiatan
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#infaq">
                    <i class="bi bi-wallet2"></i> Infaq
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#gallery">
                    <i class="bi bi-image"></i> Galeri
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <!-- HEADER -->

      <main>
        <br /><br /><br />
        <NuxtPage />
      </main>

      <!-- FOOTER -->
      <footer>
        <div class="footer-top footer-bg-color py-4">
          <div class="container text-center">
            <div class="row">
              <!-- About Section -->
              <div class="col-md-8 col-sm-8 col-xs-12">
                <div class="wrap-item" style="text-align: justify;">
                  <img
                    src="/static/logoRBG.png"
                    alt="Masjid Oasis Ar-Rahman"
                    class="footer-logo"
                    style="min-width: 8rem;"
                  />
                  <h3 style="font-weight: 600;">
                    MASJID OASIS AR-RAHMAN SURABAYA
                  </h3>
                  <p style="margin-bottom: 0px;">
                    Jl. Jepara 10 No. 7, Kel. Jepara, Kec. Bubutan, Surabaya, Jawa Timur, 60171 <br/>
                    Telp. 082140442025
                  </p>
                  <div class="social-icons" style="margin-top: 0px;">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://wa.me/6282140442025"
                      class="me-3"
                      ><i class="bi bi-whatsapp"></i
                    ></a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="masjid-oasis-arrahman.com"
                      class="me-3"
                      ><i class="bi bi-globe2"></i
                    ></a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/people/Masjid-Oasis-Ar-Rahman/61570329506995/"
                      class="me-3"
                      ><i class="bi bi-facebook"></i
                    ></a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/masjid.oasis.arrahman/"
                      class="me-3"
                      ><i class="bi bi-instagram"></i
                    ></a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.tiktok.com/@masjidoasisarrahman"
                      class="me-3"
                      ><i class="bi bi-tiktok"></i
                    ></a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.youtube.com/@Masjid-Oasis-Ar-Rahman"
                      class="me-3"
                      ><i class="bi bi-youtube"></i
                    ></a>
                    
                  </div>
                </div>
              </div>

              <!-- Map Section -->
              <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="wrap-item">
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                      class="embed-responsive-item"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.614694254846!2d112.72160717468048!3d-7.238763992781228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f900571a4799%3A0x50aa6e7d825282fc!2sMasjid%20AR-RAHMAN%20Surabaya!5e0!3m2!1sen!2sid!4v1691234567890!5m2!1sen!2sid"
                      width="100%"
                      height="300"
                      style="border: 0"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom text-center py-2 text-white">
          <small
            >&copy; 2024 Masjid Oasis Ar-Rahman. All rights reserved.</small
          >
        </div>
      </footer>
      <!-- FOOTER -->
    </div>
  </div>
</template>
