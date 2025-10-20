# MANHWAQU

## Pengaturan Firebase

Aplikasi ini menggunakan Firebase untuk otentikasi (login/pendaftaran), dan Firestore untuk menyimpan data favorit dan riwayat baca pengguna.

Untuk menjalankan aplikasi ini, Anda perlu membuat proyek Firebase Anda sendiri dan menambahkan konfigurasinya ke dalam aplikasi.

### Langkah-langkah Pengaturan Firebase:

1.  **Buat Proyek Firebase:**
    *   Buka [Firebase Console](https://console.firebase.google.com/).
    *   Klik **"Add project"** dan ikuti instruksi untuk membuat proyek baru.

2.  **Dapatkan Kunci Konfigurasi:**
    *   Di dasbor proyek Anda, klik ikon roda gigi di pojok kiri atas dan pilih **"Project settings"**.
    *   Di bawah tab **"General"**, gulir ke bawah ke bagian **"Your apps"**.
    *   Klik ikon web (`</>`) untuk membuat aplikasi web baru.
    *   Beri nama aplikasi Anda (misalnya, "ManhwaQu-Web") dan klik **"Register app"**.
    *   Firebase akan memberikan Anda objek `firebaseConfig`. Salin objek ini.

3.  **Tambahkan Konfigurasi ke Aplikasi:**
    *   Buka file `client/src/lib/firebase.ts` di proyek ini.
    *   Ganti objek `firebaseConfig` yang ada dengan yang Anda salin dari Firebase.
    *   Contohnya akan terlihat seperti ini:
        ```typescript
        const firebaseConfig = {
          apiKey: "AIzaSy...",
          authDomain: "nama-proyek-anda.firebaseapp.com",
          projectId: "nama-proyek-anda",
          storageBucket: "nama-proyek-anda.appspot.com",
          messagingSenderId: "...",
          appId: "1:..."
        };
        ```

4.  **Aktifkan Otentikasi:**
    *   Di Firebase Console, buka bagian **"Authentication"** (di menu sebelah kiri).
    *   Klik **"Get started"**.
    *   Di bawah tab **"Sign-in method"**, aktifkan metode **"Email/Password"**.

5.  **Siapkan Firestore Database:**
    *   Buka bagian **"Firestore Database"**.
    *   Klik **"Create database"**.
    *   Pilih untuk memulai dalam **production mode** (mode produksi).
    *   Pilih lokasi server (pilih yang terdekat dengan pengguna Anda).
    *   Klik **"Enable"**.

Setelah Anda menyelesaikan langkah-langkah ini, aplikasi Anda akan terhubung ke Firebase dan siap untuk digunakan.

### Aturan Keamanan Firestore

Untuk melindungi data pengguna, Anda harus menambahkan aturan keamanan ke Firestore.

1.  Di Firebase Console, buka **Firestore Database**.
2.  Klik tab **"Rules"**.
3.  Ganti aturan yang ada dengan yang berikut ini:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4.  Klik **"Publish"**.

Aturan ini memastikan bahwa hanya pengguna yang sudah login yang dapat membaca dan menulis data mereka sendiri.