<template>
  <div id="app">
    <div id="myDiv">
      <!-- Enhanced Header -->
      <header id="home" >
        <nav class="navbar navbar-expand-lg navbar-default fixed-top" >
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
              @click="toggleNavbar"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              :class="['navbar-collapse', { show: isNavbarOpen }]"
              id="navbarNav"
            >
              <ul class="navbar-nav ms-auto">
                <li
                  class="nav-item"
                  v-for="(item, index) in navItems"
                  :key="index"
                >
                  <a
                    :href="item.path"
                    class="nav-link"
                    @click="handleScrollClick($event, item.path)"
                  >
                    <i :class="item.icon"></i>
                    <span class="nav-text">{{ item.text }}</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/profile" @click="closeNavbar">
                    <i class="bi bi-person"></i>
                    <span class="nav-text">Profil</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/activities" @click="closeNavbar">
                    <i class="bi bi-calendar-event"></i>
                    <span class="nav-text">Kegiatan</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/infaq" @click="closeNavbar">
                    <i class="bi bi-wallet2"></i>
                    <span class="nav-text">Infaq</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/gallery" @click="closeNavbar">
                    <i class="bi bi-image"></i>
                    <span class="nav-text">Galeri</span>
                  </a>
                </li>
              </ul>
            </div> -->
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
                    <h3 class="footer-title">
                      MASJID OASIS AR-RAHMAN SURABAYA
                    </h3>
                  </div>
                  <p class="footer-address">
                    Jl. Jepara 10 No. 7, Kel. Jepara, Kec. Bubutan,<br />
                    Surabaya, Jawa Timur, 60171<br />
                    Telp. 082140442025
                  </p>
                  <div class="social-links">
                    <a
                      href="https://chat.whatsapp.com/GpeWn1df4O478Ohyh0mBmt"
                      target="_blank"
                    >
                      <i class="bi bi-whatsapp"></i>
                    </a>
                    <a href="https://masjidoasisarrahman.com" target="_blank">
                      <i class="bi bi-globe2"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/people/Masjid-Oasis-Ar-Rahman/61570329506995/"
                      target="_blank"
                    >
                      <i class="bi bi-facebook"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/masjid.oasis.arrahman/"
                      target="_blank"
                    >
                      <i class="bi bi-instagram"></i>
                    </a>
                    <a
                      href="https://www.tiktok.com/@masjidoasisarrahman"
                      target="_blank"
                    >
                      <i class="bi bi-tiktok"></i>
                    </a>
                    <a
                      href="https://www.youtube.com/@Masjid-Oasis-Ar-Rahman"
                      target="_blank"
                    >
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

<script setup>
import { ref, onMounted } from "vue";

const isNavbarOpen = ref(false);

const isHomePage = computed(() => {
  return window.location.pathname === '/';
});

const navItems = computed(() => [
  {
    path: isHomePage.value ? '/#profile' : 'https://masjidoasisarrahman.com/#profile',
    icon: 'bi bi-person',
    text: 'Profil',
    delay: 0.1,
  },
  {
    path: isHomePage.value ? '/#activities' : 'https://masjidoasisarrahman.com/#activities',
    icon: 'bi bi-calendar-event',
    text: 'Kegiatan',
    delay: 0.2,
  },
  {
    path: isHomePage.value ? '/#infaq' : 'https://masjidoasisarrahman.com/#infaq',
    icon: 'bi bi-wallet2',
    text: 'Infaq',
    delay: 0.3,
  },
  {
    path: isHomePage.value ? '/#gallery' : 'https://masjidoasisarrahman.com/#gallery',
    icon: 'bi bi-image',
    text: 'Galeri',
    delay: 0.4,
  },
]);


const handleScrollClick = (event, path) => {
  if (isHomePage.value && path.startsWith('/#')) {
    event.preventDefault();
    const targetId = path.substring(2);
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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
        const ease = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
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

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

const closeNavbar = () => {
  isNavbarOpen.value = false;
};
</script>

<style scoped>
@media (max-width: 768px) {
  .navbar-collapse {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform-origin: top;
  }

  .navbar-collapse:not(.show) {
    opacity: 0;
    transform: scaleY(0);
  }

  .navbar-collapse.show {
    opacity: 1;
    transform: scaleY(1);
    padding: 1rem;
  }

  .nav-item {
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  }

  .navbar-collapse.show .nav-item {
    opacity: 1;
    transform: translateY(0);
  }

  /* Stagger animation for nav items */
  .nav-item:nth-child(1) {
    transition-delay: 0.1s;
  }
  .nav-item:nth-child(2) {
    transition-delay: 0.2s;
  }
  .nav-item:nth-child(3) {
    transition-delay: 0.3s;
  }
  .nav-item:nth-child(4) {
    transition-delay: 0.4s;
  }
}

@media (min-width: 992px) {
  .navbar-collapse {
    display: flex !important;
    max-height: none;
    opacity: 1;
    transform: none;
  }

  .nav-item {
    opacity: 1;
    transform: none;
  }
}
</style>
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
