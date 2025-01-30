# Simple File Upload API

API sederhana untuk upload file dengan Node.js, Express, dan Multer. API ini memungkinkan pengguna untuk mengunggah file dan memberikan nama custom untuk file tersebut. File yang diupload disimpan di direktori **uploads/** dan dapat diakses melalui URL publik.

---

## **Fitur**
- Upload file melalui endpoint `/upload`.
- Opsional: Berikan nama file custom melalui key `filename`.
- Nama file disanitasi (spasi diganti menjadi `-`, huruf kecil, karakter spesial dihapus).
- Penanganan format nama file default jika `filename` tidak diisi.
- File dapat diunduh melalui URL yang dikembalikan di respons.

---

## **Teknologi yang Digunakan**
- **Node.js** - Runtime JavaScript di server.
- **Express** - Framework backend untuk routing dan handling request.
- **Multer** - Middleware untuk menangani file upload.
- **UUID** - (Opsional) Untuk penanganan ID unik per request.

---

## **Persyaratan Instalasi**
Pastikan Anda memiliki **Node.js** versi terbaru di sistem Anda.

---

## **Instalasi**

1. Clone atau download repository ini.
2. Jalankan perintah berikut untuk menginstal dependencies:
   ```sh
   npm install
   ```
## **Menjalankan Server**

1. Jalankan server menggunakan perintah:
    ```sh
    npm run dev
    ```
2. Server akan berjalan di http://<IP-server>:5000.
3. Folder untuk menyimpan file upload berada di direktori uploads/.

## **Endpoint API**
### **POST** `/upload`
Deskripsi: Mengunggah file ke server.
### **Headers:** `Content-Type: multipart/form-data`
#### **Body (form-data):**
| Key       | Value                    | Keterangan                                      |
|-----------|--------------------------|-------------------------------------------------|
| `filename`| *String* (Opsional)      | Nama file custom tanpa ekstensi                 |
| `file`    | *File*                   | File yang ingin diupload                        |

---

#### **Contoh Request (Postman):**

- **Method:** `POST`
- **URL:** `http://192.168.1.16:5000/upload`
- **Headers:** `Content-Type: multipart/form-data`


- **Body:**  
    - Key: `file` → Pilih file yang ingin diupload.
    - Key: `filename` → Nama custom untuk file (contoh: `my custom file name`).


---

#### **Response (Jika Berhasil):**

Jika `filename` diisi:
```json
{
  "message": "File berhasil diupload",
  "fileUrl": "http://192.168.1.16:5000/uploads/my-custom-file-name-12345.jpg"
}
```

Jika `filename` tidak diberikan:
```json
{
  "message": "File berhasil diupload",
  "fileUrl": "http://192.168.1.16:5000/uploads/file-123456789.jpg"
}
```

link dapat di akses di browser, apabila menggunakan localhost maka server harus tetap berjalan, lebih fleksibel dapat di deploy di server atau VPS.

---
## Pengembangan Lebih Lanjut
- Validasi Tipe File: Tambahkan validasi untuk hanya menerima jenis file tertentu seperti gambar atau PDF.
- Batas Ukuran File: Batasi ukuran file yang bisa diupload.
- Authentication: Tambahkan autentikasi untuk membatasi akses upload dan download file.
- Deployment: Deploy ke layanan cloud seperti Heroku, AWS, atau DigitalOcean.