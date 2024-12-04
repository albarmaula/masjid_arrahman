<template>
  <div>
    <br />
    <div class="container text-white text-center">
      <h2 class="title pad-bt15">Galeri Masjid</h2>
      <div class="row g-4">
        <div class="col-md-4 col-sm-6 col-xs-12 galeri-item" v-for="n in 6" :key="n">
          <figure>
            <img src="../static/agenda/kegiatanNopember2024.jpg" alt="Kegiatan Masjid" />
            <figcaption>
              <h2>Kegiatan Masjid</h2>
              <p>
                Beragam kegiatan keagamaan yang mempererat silaturahmi dan meningkatkan spiritualitas.
              </p>
              <button class="btn galeri-btn">Lihat Foto</button>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>
