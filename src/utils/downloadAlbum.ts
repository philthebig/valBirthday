import { jsPDF } from 'jspdf';

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export async function shareOrDownloadImage(blob: Blob, filename: string, title: string) {
  const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title,
        text: title,
      });
      return 'shared';
    } catch (err) {
      if ((err as Error).name === 'AbortError') return 'cancelled';
    }
  }

  await downloadBlob(blob, filename);
  return 'downloaded';
}

export async function downloadPdfFromCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
) {
  const imgData = canvas.toDataURL('image/jpeg', 0.92);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
    hotfixes: ['px_scaling'],
  });
  pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
  pdf.save(filename);
}
