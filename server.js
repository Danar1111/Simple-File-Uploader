import express from "express";
import multer from "multer";
import path from "path";
import fs from  "fs";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

const getServerIP = () => {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (const alias of iface) {
            if (alias.family === "IPv4" && !alias.internal) {
                return alias.address;
            }
        }
    }
    return "localhost";
}

const SERVER_IP = getServerIP();

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const sanitizeFilename = (filename) => {
    return filename
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-\.]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        setImmediate(() => {
            let customFilename = req.body.filename;
    
            if (customFilename) {
                customFilename = sanitizeFilename(customFilename);
    
                if (!customFilename) {
                    customFilename = "file";
                }
                const uniqueSuffix = `${Math.round(10000 + Math.random() * 90000)}`;
                cb(null, `${customFilename}-${uniqueSuffix}${path.extname(file.originalname)}`);
            } else {
                const uniqueSuffix = `${Date.now()}-${Math.round(10000 + Math.random() * 90000)}`;
                cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
            }
        });
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "File diperlukan" });
    const fileUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    res.json({ message: "File berhasil diupload", fileUrl })
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, "0.0.0.0", () => console.log(`Server berjalan di: http://${SERVER_IP}:${PORT}`));