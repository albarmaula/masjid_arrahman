<template>
  <div id="app">
    <div class="loader"></div>
    <div id="myDiv">
      <!-- HEADER -->
      <header id="home">
        <nav class="navbar navbar-expand-lg navbar-default fixed-top">
          <div class="container navbar-header">
            <a href="#">
              <img src="/static/logoRBG.png" class="img-responsive logo" />
            </a>
            <a class="navbar-brand" href="/" style="margin-left: 10px">
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
                <li class="nav-item ">
                  <a class="nav-link " href="/#profile">
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
                <li class="nav-item">
                  <a class="nav-link" href="/#article">
                    <i class="bi bi-newspaper"></i> Artikel
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
              <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="wrap-item">
                  <h5>Tentang Kami</h5>
                  <p>
                    Masjid Oasis Ar-Rahman merupakan pusat kegiatan keagamaan dan
                    sosial di Surabaya, berkomitmen mempererat ukhuwah dan
                    meningkatkan nilai-nilai spiritual.
                  </p>
                </div>
              </div>

              <!-- Contact Section -->
              <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="wrap-item text-center">
                  <h5>Kontak</h5>
                  <ul class="list-unstyled">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.google.com/maps/place/Masjid+AR-RAHMAN+Surabaya/@-7.238764,112.7237963,15z/data=!4m6!3m5!1s0x2dd7f900571a4799:0x50aa6e7d825282fc!8m2!3d-7.238764!4d112.7237963!16s%2Fg%2F11wm_tk2pp?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D"
                        ><i class="bi bi-map"></i> Jl. Jepara X No. 7,
                        Surabaya</a
                      >
                    </li>
                    <li><i class="bi bi-phone"></i> (031) 123-4567</li>
                    <li>
                      <i class="bi bi-envelope"></i> masjidarrahmansby@gmail.com
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Social Media & Links -->
              <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="wrap-item">
                  <h5>Ikuti Kami</h5>
                  <div class="social-icons">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/profile.php?id=61568578465750&rdid=SDMozGi5C26DynFH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14zZnaSBse%2F"
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
                      ><i class="bi bi-youtube"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom text-center py-2 text-white">
          <small
            >&copy; 2024 Masjid Oasis Ar-Rahman. All rights
            reserved.</small
          >
        </div>
      </footer>
      <!-- FOOTER -->
    </div>
  </div>
</template>
