# Project Plan: GEO-SENTINEL (US-IRAN Strategic Monitoring Room)

Platform monitoring geopolitik real-time dengan estetika taktis DEFCON, dirancang untuk visualisasi *command center* 24/7 menggunakan agregasi cerdas dan pemetaan geospasial.

---

## 1. Referensi & Visi Visual
* **Inspirasi Teknologi:** * **NewFeeds:** Mengadopsi mekanisme *content cleaning* dan *infinite feed management* yang efisien.
    * **WorldMonitor:** Mengadopsi visualisasi peristiwa berbasis peta global dengan sistem *clustering* peristiwa.
* **Tema Estetika:** "Dark Ops" / Tactical Command Center.
* **UI/UX:** High-contrast (Neon on Black), font monospaced (JetBrains Mono/VT323), komponen berpendar (glow), dan animasi *scanning* radar.

---

## 2. Arsitektur Teknis (JS Stack)
* **Framework:** **Next.js 15** (App Router) untuk performa optimal dan SEO (jika dibutuhkan).
* **State Management:** **Zustand** untuk sinkronisasi data antar widget secara real-time.
* **Map Engine:** **React-Leaflet** dengan kustomisasi *Tile Layer* (Dark Matter) untuk meminimalkan *eye-strain* di ruang gelap.
* **Styling:** **Tailwind CSS** + **Framer Motion** untuk transisi UI yang halus dan taktis.
* **AI Integration:** **OpenAI SDK (GPT-4o)** untuk ekstraksi entitas dan ringkasan eksekutif otomatis.

---

## 3. Fitur Utama & Struktur Data

### A. Intelligence Feed Management (Ref: NewFeeds)
Sistem akan melakukan *scraping*, filtrasi, dan pembersihan konten dari sumber berita global:
* **Sources:** Reuters, Al Jazeera, IRNA (Iran), AP News.
* **Cleaning Logic:** Menghilangkan elemen non-esensial (iklan, metadata) agar teks murni siap diproses oleh AI.
* **Categorization:** Memisahkan berita berdasarkan urgensi militer, diplomatik, atau ekonomi.

### B. Pemetaan Taktis (Ref: worldmonitor)
Visualisasi aset dan insiden di peta menggunakan koordinat dinamis hasil ekstraksi LLM.

| Entitas | Sub-Tipe (Markers) | Tingkat Urgensi/Status |
| :--- | :--- | :--- |
| **Serangan** | Missile, Drone, Sabotage, Cyber | Major (Blinking Red), High, Medium, Low |
| **Aset** | Nuclear, Base, Aircraft, Datacenter | High Alert, Elevated, Monitoring |

### C. Executive Summary (Dual Perspective)
Output AI yang dioptimasi untuk pengambil keputusan di Indonesia:
1.  **Status Eskalasi:** Ringkasan teknis situasi di lapangan (Siapa, Melakukan Apa, Di Mana).
2.  **IDN Interest Report:** Analisis dampak terhadap ekonomi (BBM/ICP), Volatilitas Rupiah, posisi Diplomasi RI (Bebas Aktif), dan keamanan WNI.

---

## 4. Fitur Strategis Tambahan (Command Center Ready)
1.  **Escalation Barometer:** Widget visual (Skala 1-10) tingkat ketegangan berdasarkan frekuensi kata kunci agresif.
2.  **Global Market Impact Ticker:** Pantauan real-time harga Minyak Dunia (Brent/WTI) dan kurs USD/IDR.
3.  **Military Presence Overlay:** Toggle visual untuk estimasi lokasi *US Carrier Strike Groups* dan pangkalan rudal Iran.
4.  **Tactical Audio Alert:** Notifikasi suara minimalis (bip radar) saat terdeteksi peristiwa kategori "Major".

---

## 5. Struktur Folder Project
```text
geo-sentinel/
├── src/
│   ├── app/                # Next.js Pages & API Routes (Proxy AI & RSS)
│   ├── components/
│   │   ├── map/            # Leaflet implementation (worldmonitor style)
│   │   ├── tactical/       # Bento Box UI & Glow components
│   │   └── feed/           # Clean news list (NewFeeds style)
│   ├── hooks/              # SWR/Zustand for real-time updates
│   ├── lib/
│   │   ├── openai.js       # AI analysis prompt & config
│   │   └── parser.js       # RSS scrubbing & normalization logic
│   └── styles/             # Global CSS with scanline & glow effects
├── public/                 # Custom SVG Icons (Nuclear, Drone, Radar)
└── project_plan.md
```

## 6. Prompt AI Strategis (Antigravity Prompt)
1. Role: Senior Intelligence Analyst.
2. Input: Cleaned RSS Feed Text.
3. Task: Ekstraksi entitas taktis (lokasi, level serangan, tipe aset).
4. Analisis Khusus: Berikan ringkasan dalam 3 poin utama. Tambahkan 'Indonesian Perspective' yang mencakup risiko subsidi energi, stabilitas nilai tukar, dan rekomendasi posisi diplomatik Kemlu RI.
5. Format: JSON object untuk sinkronisasi peta dan UI.