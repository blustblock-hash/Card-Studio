
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';
import { Card, AspectRatio } from '../types';

const DIMENSIONS: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 1080, height: 1080 },
  '16:9': { width: 1920, height: 1080 },
  'A4': { width: 794, height: 1123 }, // Portrait A4 at 96 DPI
};

export async function exportToPng(elementId: string, scale: number = 2, aspectRatio: AspectRatio = 'A4') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const { width, height } = DIMENSIONS[aspectRatio];

  const dataUrl = await toPng(element, {
    width,
    height,
    pixelRatio: scale,
    quality: 1,
    style: {
      transform: 'none',
      width: `${width}px`,
      height: `${height}px`,
    }
  });

  const link = document.createElement('a');
  link.download = `card-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}

export async function exportToPdf(elementId: string, aspectRatio: AspectRatio = 'A4') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const { width, height } = DIMENSIONS[aspectRatio];

  const dataUrl = await toPng(element, { 
    width,
    height,
    pixelRatio: 2,
    style: {
      transform: 'none',
      width: `${width}px`,
      height: `${height}px`,
    }
  });
  
  let format: any = 'a4';
  let orientation: 'p' | 'l' = 'p';

  if (aspectRatio === '16:9') {
    format = [1920, 1080];
    orientation = 'l';
  } else if (aspectRatio === '1:1') {
    format = [1080, 1080];
    orientation = 'p';
  }

  const pdf = new jsPDF(orientation, 'px', format);
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`card-${Date.now()}.pdf`);
}

export async function exportToPptx(elementId: string, aspectRatio: AspectRatio = '16:9') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const { width, height } = DIMENSIONS[aspectRatio];

  const dataUrl = await toPng(element, { 
    width,
    height,
    pixelRatio: 2,
    style: {
      transform: 'none',
      width: `${width}px`,
      height: `${height}px`,
    }
  });
  const pptx = new PptxGenJS();
  
  if (aspectRatio === '16:9') {
    pptx.layout = 'LAYOUT_16x9';
  } else if (aspectRatio === '1:1') {
    pptx.defineLayout({ name: 'SQUARE', width: 10, height: 10 });
    pptx.layout = 'SQUARE';
  } else {
    pptx.layout = 'LAYOUT_4x3';
  }

  const slide = pptx.addSlide();
  
  slide.addImage({
    data: dataUrl,
    x: 0,
    y: 0,
    w: '100%',
    h: '100%',
  });

  pptx.writeFile({ fileName: `card-${Date.now()}.pptx` });
}
