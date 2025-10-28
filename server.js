import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const PORT = 3000;

// Setup storage for uploaded files
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.use(express.static("public"));

// Handle upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/");
});

// List uploaded files
app.get("/files", (req, res) => {
  fs.readdir("./uploads", (err, files) => {
    if (err) return res.status(500).send("Error reading files");
    res.json(files);
  });
});

// Download a file
app.get("/download/:filename", (req, res) => {
  res.download(`./uploads/${req.params.filename}`);
});

app.listen(PORT, () => console.log(`✅ Running on http://localhost:${PORT}`));