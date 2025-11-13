let cropper;
const input = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const scanBtn = document.getElementById('scanBtn');
const status = document.getElementById('status');
const result = document.getElementById('result');

input.addEventListener('change', () => {
  const file = input.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  preview.src = imageUrl;
  preview.style.display = 'block';
  result.textContent = '';
  status.textContent = '';

  if (cropper) cropper.destroy();

  cropper = new Cropper(preview, {
    aspectRatio: NaN,
    viewMode: 1,
    autoCropArea: 1,
  });

  scanBtn.disabled = false;
});

scanBtn.addEventListener('click', async () => {
  if (!cropper) return;

  status.textContent = '✂️ Memotong gambar...';
  const canvas = cropper.getCroppedCanvas();

  status.textContent = '🔍 Memproses OCR...';

  const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
    logger: info => {
      status.textContent = `Proses: ${Math.round(info.progress * 100)}%`;
    }
  });

  status.textContent = '✅ Selesai!';
  result.textContent = text;
});
