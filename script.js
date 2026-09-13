/* =====================================================
   DESA SEPINGGAN GELIK
   SCRIPT.JS
===================================================== */


/* =====================================================
   DATA KEGIATAN DESA
===================================================== */

const kegiatanCadangan = [

    {
        Judul: "Kegiatan Posyandu",

        Deskripsi:
        "Kegiatan pelayanan kesehatan masyarakat desa yang dilaksanakan secara rutin untuk membantu memantau kesehatan ibu dan anak.",

        Tanggal: "2026-01-15",

        Lokasi: "Desa Sepinggan Gelik",

        Gambar: "./masyarakat.jpg"
    },

    {
        Judul: "Gotong Royong Desa",

        Deskripsi:
        "Masyarakat bersama-sama menjaga kebersihan lingkungan dan fasilitas umum desa.",

        Tanggal: "2026-02-10",

        Lokasi: "Desa Sepinggan Gelik",

        Gambar: "./masyarakat.jpg"
    },

    {
        Judul: "Kegiatan Keamanan Lingkungan",

        Deskripsi:
        "Kegiatan menjaga keamanan dan ketertiban lingkungan melalui ronda malam dan poskamling.",

        Tanggal: "2026-02-20",

        Lokasi: "Poskamling Desa Sepinggan Gelik",

        Gambar: "./poskamling.jpg"
    }

];


/* =====================================================
   SAAT HALAMAN SELESAI DIMUAT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       DARK MODE
    ================================================= */

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("desaTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "desaTheme",
                isDark ? "dark" : "light"
            );

            themeToggle.textContent =
                isDark ? "☀️" : "🌙";

        });

    }


    /* =================================================
       MENU HP
    ================================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("show");

        });

    }


    /* =================================================
       ANIMASI SCROLL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("show");

        });

    }


    /* =================================================
       MUSIK DESA
    ================================================= */

    const music =
        document.getElementById("musikDesa");

    const playButton =
        document.getElementById("playMusic");

    if (music) {

        const savedTime =
            localStorage.getItem("musicTime");

        if (savedTime) {

            try {

                music.currentTime =
                    parseFloat(savedTime);

            } catch (error) {

                console.log(
                    "Posisi musik tidak dapat dipulihkan."
                );

            }

        }


        const wasPlaying =
            localStorage.getItem("musicPlaying");

        if (wasPlaying === "true") {

            music.play().catch(() => {

                console.log(
                    "Autoplay diblokir browser."
                );

            });

        }


        /* =============================================
           SIMPAN POSISI MUSIK
        ============================================= */

        setInterval(() => {

            if (!music.paused) {

                localStorage.setItem(
                    "musicTime",
                    music.currentTime
                );

                localStorage.setItem(
                    "musicPlaying",
                    "true"
                );

            }

        }, 1000);


        window.addEventListener(
            "beforeunload",
            () => {

                localStorage.setItem(
                    "musicTime",
                    music.currentTime
                );

                localStorage.setItem(
                    "musicPlaying",
                    String(!music.paused)
                );

            }
        );

    }


    /* =================================================
       TOMBOL MUSIK
    ================================================= */

    if (playButton && music) {

        playButton.addEventListener(
            "click",
            () => {

                if (music.paused) {

                    music.play()
                        .then(() => {

                            localStorage.setItem(
                                "musicPlaying",
                                "true"
                            );

                            playButton.innerHTML =
                                "⏸️ Jeda Musik";

                        })
                        .catch(() => {

                            alert(
                                "Silakan tekan tombol musik kembali."
                            );

                        });

                } else {

                    music.pause();

                    localStorage.setItem(
                        "musicPlaying",
                        "false"
                    );

                    playButton.innerHTML =
                        "🎵 Putar Musik";

                }

            }
        );

    }


    /* =================================================
       PINDAH HALAMAN
    ================================================= */

    document
        .querySelectorAll("nav a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                if (!music) return;

                localStorage.setItem(
                    "musicTime",
                    music.currentTime
                );

                localStorage.setItem(
                    "musicPlaying",
                    String(!music.paused)
                );

            });

        });


    /* =================================================
       COBA PUTAR MUSIK SETELAH INTERAKSI USER
    ================================================= */

    document.addEventListener(
        "click",
        () => {

            if (!music) return;

            const wasPlaying =
                localStorage.getItem(
                    "musicPlaying"
                );

            if (
                wasPlaying === "true" &&
                music.paused
            ) {

                music.play().catch(() => {});

            }

        },
        {
            once: true
        }
    );


    /* =================================================
       TAMPILKAN KEGIATAN DESA
    ================================================= */

    tampilkanKegiatan();

});


/* =====================================================
   MENAMPILKAN KEGIATAN DESA
   Data tersimpan langsung di website
===================================================== */

function tampilkanKegiatan() {

    const container =
        document.getElementById(
            "kegiatanContainer"
        );

    if (!container) return;

    tampilkanDataKegiatan(
        container,
        kegiatanCadangan
    );

}


/* =====================================================
   MENAMPILKAN CARD KEGIATAN
===================================================== */

function tampilkanDataKegiatan(
    container,
    data
) {

    container.innerHTML = "";


    data.forEach((kegiatan, index) => {


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "activity-card reveal";


        /* =================================================
           JUDUL
        ================================================= */

        const judul =
            kegiatan.Judul ||
            kegiatan.judul ||
            "Kegiatan Desa";


        /* =================================================
           DESKRIPSI
        ================================================= */

        const deskripsi =
            kegiatan.Deskripsi ||
            kegiatan.deskripsi ||
            "Belum ada deskripsi kegiatan.";


        /* =================================================
           LOKASI
        ================================================= */

        const lokasi =
            kegiatan.Lokasi ||
            kegiatan.lokasi ||
            "Desa Sepinggan Gelik";


        /* =================================================
           GAMBAR
        ================================================= */

        let gambar =
            kegiatan.Gambar ||
            kegiatan.gambar ||
            "";


        /*
           Jika gambar kosong,
           gunakan gambar cadangan.
        */

        if (
            !gambar ||
            String(gambar).trim() === ""
        ) {

            const fotoCadangan = [

                "./masyarakat.jpg",
                "./sawah.jpg",
                "./masjid.jpg",
                "./sekolah.jpg",
                "./sd.jpg",
                "./tk.jpg",
                "./poskamling.jpg"

            ];

            gambar =
                fotoCadangan[
                    index %
                    fotoCadangan.length
                ];

        }


        gambar =
            String(gambar).trim();


        /*
           Jika hanya nama file,
           tambahkan "./"
        */

        if (
            !gambar.startsWith("./") &&
            !gambar.startsWith("../") &&
            !gambar.startsWith("http://") &&
            !gambar.startsWith("https://") &&
            !gambar.startsWith("/")
        ) {

            gambar =
                "./" + gambar;

        }


        /* =================================================
           TANGGAL
        ================================================= */

        let tanggal =
            kegiatan.Tanggal ||
            kegiatan.tanggal ||
            "";


        let tanggalFormat =
            "Tanggal belum tersedia";


        if (tanggal) {

            const date =
                new Date(tanggal);


            if (!isNaN(date.getTime())) {

                tanggalFormat =
                    date.toLocaleDateString(
                        "id-ID",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );

            } else {

                tanggalFormat =
                    tanggal;

            }

        }


        /* =================================================
           CARD HTML
        ================================================= */

        card.innerHTML = `

            <img
                src="${escapeHTML(gambar)}"
                alt="${escapeHTML(judul)}"
                loading="lazy"
                onerror="
                    this.onerror=null;
                    this.src='./masyarakat.jpg';
                "
            >

            <div class="activity-content">

                <span class="activity-icon">
                    🌿
                </span>

                <h2>
                    ${escapeHTML(judul)}
                </h2>

                <p>
                    ${escapeHTML(deskripsi)}
                </p>

                <div class="activity-info">

                    <small>
                        📅 ${escapeHTML(tanggalFormat)}
                    </small>

                    <small>
                        📍 ${escapeHTML(lokasi)}
                    </small>

                </div>

            </div>

        `;


        container.appendChild(card);

    });


    /* =================================================
       ANIMASI CARD
    ================================================= */

    setTimeout(() => {

        container
            .querySelectorAll(".reveal")
            .forEach((element) => {

                element.classList.add(
                    "show"
                );

            });

    }, 50);

}


/* =====================================================
   KEAMANAN TEKS HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   DATABASE BERANDA - GOOGLE SPREADSHEET
   Hanya bekerja pada halaman Beranda.
   Jika database tidak dapat diakses, isi asli Beranda
   tetap tampil seperti semula.
===================================================== */

const BERANDA_DATABASE_URL = "https://script.google.com/macros/s/AKfycbxEXPn8nesAhXldrGCLgTvCwyjsL5h-iwopHfb6n5nSx9xYJ0Yp8xN9G-zKbRXhNFy5/exec";

function loadBerandaDatabase() {
    const container = document.getElementById("berandaDatabase");
    if (!container) return;
    const callbackName = "berandaDatabaseCallback_" + Date.now();
    let script;
    const timeout = setTimeout(cleanup, 7000);
    function cleanup() {
        clearTimeout(timeout);
        if (script && script.parentNode) script.parentNode.removeChild(script);
        try { delete window[callbackName]; } catch (e) {}
    }
    window[callbackName] = function (response) {
        try {
            if (!response || !response.success || !Array.isArray(response.data) || response.data.length === 0) return;
            container.innerHTML = "";
            response.data.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "gallery-card";
                const gambar = item.gambar || ["./sawah.jpg","./masyarakat.jpg","./masjid.jpg"][index % 3];
                card.innerHTML = `
                    <img src="${escapeHTML(gambar)}" alt="${escapeHTML(item.judul || "Data Desa")}" loading="lazy" onerror="this.onerror=null;this.src='./sawah.jpg';">
                    <h3>${escapeHTML(item.judul || "Data Desa")}</h3>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.log("Database Beranda tidak dapat dimuat. Isi asli tetap digunakan.");
        } finally { cleanup(); }
    };
    script = document.createElement("script");
    script.src = BERANDA_DATABASE_URL + "?action=get&callback=" + encodeURIComponent(callbackName);
    script.async = true;
    document.head.appendChild(script);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadBerandaDatabase);
else loadBerandaDatabase();
