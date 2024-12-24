<template>
  <div id="app">
    <div class="loader"></div>
    <div id="myDiv">
      <!-- Enhanced Header -->
      <header id="home">
        <nav class="navbar navbar-expand-lg navbar-default fixed-top">
          <div class="container navbar-header">
            <div class="brand-wrapper">
              <a href="/" class="logo-link">
                <img src="/static/logoRBG.png" class="nav-logo" alt="Logo" />
                <span class="brand-text">MASJID OASIS AR-RAHMAN</span>
              </a>
            </div>
            
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
                  <a class="nav-link" href="/#profile">
                    <i class="bi bi-person"></i>
                    <span class="nav-text">Profil</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#activities">
                    <i class="bi bi-calendar-event"></i>
                    <span class="nav-text">Kegiatan</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#infaq">
                    <i class="bi bi-wallet2"></i>
                    <span class="nav-text">Infaq</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#gallery">
                    <i class="bi bi-image"></i>
                    <span class="nav-text">Galeri</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
          <NuxtPage />
      </main>

      <!-- Enhanced Footer -->
      <footer class="footer">
        <div class="py-4">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-8 col-xs-12">
                <div class="footer-info">
                  <div class="footer-brand">
                    <img
                      src="/static/logoRBG.png"
                      alt="Masjid Logo"
                      class="footer-logo"
                    />
                    <h3 class="footer-title">MASJID OASIS AR-RAHMAN SURABAYA</h3>
                  </div>
                  <p class="footer-address">
                    Jl. Jepara 10 No. 7, Kel. Jepara, Kec. Bubutan,<br>
                    Surabaya, Jawa Timur, 60171<br>
                    Telp. 082140442025
                  </p>
                  <div class="social-links">
                    <a href="https://wa.me/6282140442025" target="_blank">
                      <i class="bi bi-whatsapp"></i>
                    </a>
                    <a href="https://masjid-oasis-arrahman.com" target="_blank">
                      <i class="bi bi-globe2"></i>
                    </a>
                    <a href="https://www.facebook.com/people/Masjid-Oasis-Ar-Rahman/61570329506995/" target="_blank">
                      <i class="bi bi-facebook"></i>
                    </a>
                    <a href="https://www.instagram.com/masjid.oasis.arrahman/" target="_blank">
                      <i class="bi bi-instagram"></i>
                    </a>
                    <a href="https://www.tiktok.com/@masjidoasisarrahman" target="_blank">
                      <i class="bi bi-tiktok"></i>
                    </a>
                    <a href="https://www.youtube.com/@Masjid-Oasis-Ar-Rahman" target="_blank">
                      <i class="bi bi-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="map-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.614694254846!2d112.72160717468048!3d-7.238763992781228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f900571a4799%3A0x50aa6e7d825282fc!2sMasjid%20AR-RAHMAN%20Surabaya!5e0!3m2!1sen!2sid!4v1691234567890!5m2!1sen!2sid"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Masjid Oasis Ar-Rahman. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<!-- <style scoped>
/* Add these styles to your CSS */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.24);
  transition: all 0.3s ease;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.02);
}

.brand-text {
  color: #1F6533;
  font-weight: 700;
  font-size: 1.2rem;
  margin-left: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  /* background: rgba(31, 101, 51, 0.1); */
  transform: translateY(-2px);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.footer-logo {
  padding: 0px 0px;
  max-width: 50px;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F6533;
  margin: 0;
}

.footer-address {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f5;
  color: #1F6533;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: #1F6533;
  color: #fff;
  transform: translateY(-3px);
}

.map-wrapper {
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.footer-bottom {
  background: #1F6533;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .brand-text {
    font-size: 1rem;
  }

  .footer-brand {
    text-align: center;
  }

  .footer-title {
    font-size: 1.2rem;
  }

  .social-links {
    justify-content: center;
  }

  .map-wrapper {
    margin-top: 2rem;
  }
}
</style> -->