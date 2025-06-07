<template>
  <div class="container text-center">
    <div class="section-header text-center mb-5">
      <div class="row justify-content-center align-items-center">
        <div
          class="title-wrapper d-flex align-items-center justify-content-center gap-3 nav-link"
        >
          <a class="title mb-0" href="/infaq">INFAQ MASJID <i class="bi bi-box-arrow-up-right"></i
        ></a>
        </div>
      </div>
    </div>

    <div class="row align-items-center">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="qris-card">
          <div class="qris-wrapper">
            <img class="qris-img" src="../static/qris.png" alt="QRIS Code" />
          </div>
          <div class="scan-text">
            <i class="bi bi-qr-code-scan"></i>
            Scan untuk Berinfaq
          </div>
          Atau
          <div class="transfer-title">
            <i class="bi bi-bank"></i>
            Transfer Bank (BSI)
          </div>
          <div class="bank-info">
            <p class="account-name">Masjid Ar Rahman</p>
            <button @click="copyToClipboard('1011000777')" class="copy-btn">
              <span class="account-number">1011000777</span>
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="content-card">
          <p class="main-description">
            Setiap rezeki yang kita miliki adalah titipan dari Allah.
            Sebagaimana Allah berjanji dalam Al-Qur'an:
          </p>

          <blockquote class="quran-quote">
            <i class="bi bi-quote"></i>
            "Perumpamaan orang yang menafkahkan hartanya di jalan Allah adalah
            seperti sebutir benih yang menumbuhkan tujuh bulir; pada tiap-tiap
            bulir terdapat seratus biji. Allah melipatgandakan (balasan) bagi
            siapa yang Dia kehendaki. Dan Allah Maha Luas (karunia-Nya) lagi
            Maha Mengetahui."
            <footer class="quote-source">Q.S. Al-Baqarah: 261</footer>
          </blockquote>

          <p class="main-description">
            Setiap infaq yang Anda berikan akan digunakan untuk pembangunan
            masjid dan kegiatan ibadah, dakwah, dan berbagai program sosial.
            Semoga Allah senantiasa melapangkan rezeki kita dan memberkahi
            setiap langkah kebaikan.
          </p>

          <p class="closing-text">Jazakumullahu khairan.</p>

          <hr class="bottom-line" />
        </div>
      </div>
    </div>
  </div>
  <div v-if="showCopySuccess" class="notification">
    <i class="bi bi-check-circle-fill"></i>
    Nomor rekening berhasil disalin!
  </div>
</template>

<script setup>
const showCopySuccess = ref(false);

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showCopySuccess.value = true;
    setTimeout(() => {
      showCopySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
</script>
