import { config } from '../config';
import type { HuntStop } from '../data/hunt';
import { getPhoto, type PhotoMap } from './photoStorage';

const W = 1080;
const H = 2200;

const COLORS = {
  bgTop: '#0f1f33',
  bgMid: '#152a42',
  bgBottom: '#1a3352',
  gold: '#fbbf24',
  goldSoft: '#fde68a',
  pink: '#f472b6',
  mint: '#34d399',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  card: 'rgba(30, 61, 92, 0.9)',
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, COLORS.bgTop);
  grad.addColorStop(0.5, COLORS.bgMid);
  grad.addColorStop(1, COLORS.bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const glow1 = ctx.createRadialGradient(W * 0.2, H * 0.1, 0, W * 0.2, H * 0.1, W * 0.5);
  glow1.addColorStop(0, 'rgba(96, 165, 250, 0.18)');
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, W, H);

  const glow2 = ctx.createRadialGradient(W * 0.85, H * 0.85, 0, W * 0.85, H * 0.85, W * 0.4);
  glow2.addColorStop(0, 'rgba(244, 114, 182, 0.12)');
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, W, H);

  // Gold top accent line
  const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.2, COLORS.gold);
  lineGrad.addColorStop(0.8, COLORS.gold);
  lineGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(60, 36);
  ctx.lineTo(W - 60, 36);
  ctx.stroke();
}

function drawHeader(ctx: CanvasRenderingContext2D) {
  ctx.textAlign = 'center';

  ctx.font = '600 22px Outfit, system-ui, sans-serif';
  ctx.fillStyle = COLORS.mint;
  ctx.fillText(config.huntTitle.toUpperCase(), W / 2, 90);

  const titleGrad = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
  titleGrad.addColorStop(0, COLORS.goldSoft);
  titleGrad.addColorStop(0.5, COLORS.pink);
  titleGrad.addColorStop(1, COLORS.gold);
  ctx.font = '700 52px Fraunces, Georgia, serif';
  ctx.fillStyle = titleGrad;
  ctx.fillText(`Joyeux Anniversaire`, W / 2, 155);
  ctx.fillText(`${config.recipientName} !`, W / 2, 215);

  ctx.font = '500 28px Fraunces, Georgia, serif';
  ctx.fillStyle = COLORS.text;
  ctx.fillText(`Pour ${config.recipientName}`, W / 2, 260);

  ctx.font = 'italic 20px Fraunces, Georgia, serif';
  ctx.fillStyle = COLORS.textMuted;
  ctx.fillText('La Touche Souvenir — Mont-Tremblant', W / 2, 295);
}

function drawPhotoCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const aspect = img.width / img.height;
  const targetAspect = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (aspect > targetAspect) {
    sw = img.height * targetAspect;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / targetAspect;
    sy = (img.height - sh) / 2;
  }

  ctx.save();
  roundRect(ctx, x, y, w, h, 14);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  ctx.restore();

  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, w, h, 14);
  ctx.stroke();
}

function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  emoji: string,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  ctx.fillStyle = COLORS.card;
  roundRect(ctx, x, y, w, h, 14);
  ctx.fill();
  ctx.font = '48px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(emoji, x + w / 2, y + h / 2 + 16);
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, w, h, 14);
  ctx.stroke();
}

function drawFooter(ctx: CanvasRenderingContext2D) {
  const y = H - 130;
  roundRect(ctx, 48, y, W - 96, 90, 16);
  ctx.fillStyle = 'rgba(251, 191, 36, 0.1)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 48, y, W - 96, 90, 16);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'italic 18px Fraunces, Georgia, serif';
  ctx.fillStyle = COLORS.textMuted;
  const msg = config.finalTreasure.surpriseHint;
  ctx.fillText(msg.length > 55 ? `${msg.slice(0, 52)}…` : msg, W / 2, y + 38);

  ctx.font = '600 16px Outfit, system-ui, sans-serif';
  ctx.fillStyle = COLORS.gold;
  const date = new Date().toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  ctx.fillText(`${date} · Avec amour, pour toujours`, W / 2, y + 68);
}

async function drawPhotoGrid(
  ctx: CanvasRenderingContext2D,
  stops: HuntStop[],
  photos: PhotoMap,
) {
  const padX = 48;
  const gap = 28;
  const colW = (W - padX * 2 - gap) / 2;
  const photoH = 280;
  const captionH = 44;
  const rowH = photoH + captionH + gap;
  let startY = 330;

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];
    const row = Math.floor(i / 2);
    const col = i % 2;
    const isLastOdd = stops.length % 2 === 1 && i === stops.length - 1;

    let x = padX + col * (colW + gap);
    const y = startY + row * rowH;

    if (isLastOdd) {
      x = (W - colW) / 2;
    }

    const src = getPhoto(photos, stop.order);
    if (src) {
      try {
        const img = await loadImage(src);
        drawPhotoCover(ctx, img, x, y, colW, photoH);
      } catch {
        drawPlaceholder(ctx, stop.emoji, x, y, colW, photoH);
      }
    } else {
      drawPlaceholder(ctx, stop.emoji, x, y, colW, photoH);
    }

    // Stop number badge
    ctx.fillStyle = COLORS.gold;
    roundRect(ctx, x + 10, y + 10, 32, 32, 8);
    ctx.fill();
    ctx.font = '700 16px Outfit, system-ui, sans-serif';
    ctx.fillStyle = COLORS.bgTop;
    ctx.textAlign = 'center';
    ctx.fillText(String(stop.order), x + 26, y + 32);

    // Caption
    ctx.textAlign = 'center';
    ctx.font = '600 15px Outfit, system-ui, sans-serif';
    ctx.fillStyle = COLORS.mint;
    const label = stop.shortName;
    ctx.fillText(label, x + colW / 2, y + photoH + 28);
  }
}

export async function generateAlbumImage(
  stops: HuntStop[],
  photos: PhotoMap,
): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas non supporté');

  drawBackground(ctx);
  drawHeader(ctx);
  await drawPhotoGrid(ctx, stops, photos);
  drawFooter(ctx);

  // Watermark sparkle
  ctx.font = '20px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText('✨ 🏔️ 💛', W / 2, H - 24);

  return canvas;
}

export async function canvasToJpegBlob(canvas: HTMLCanvasElement, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Export impossible'))),
      'image/jpeg',
      quality,
    );
  });
}

export async function canvasToDataUrl(canvas: HTMLCanvasElement): Promise<string> {
  return canvas.toDataURL('image/jpeg', 0.92);
}
