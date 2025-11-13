const input = document.getElementById('fileInput');
const result = document.getElementById('result');
const status = document.getElementById('status');

input.addEventListener('change', async () => {
  const file = input.files[0];
  if (!file) return;

  status.textContent = '⏳ Memproses gambar...';
  result.textContent = '';

  const image = URL.createObjectURL(file);

  // Jalankan OCR
  const { data: { text } } = await Tesseract.recognize(
    image,
    'eng', // bisa diganti 'ind' kalau mau bahasa Indonesia
    {
      logger: info => {
        status.textContent = `Proses: ${Math.round(info.progress * 100)}%`;
      }
    }
  );

  status.textContent = '✅ Selesai!';
  result.textContent = text;
});
