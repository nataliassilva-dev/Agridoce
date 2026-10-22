import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfGenerationProgress {
  status: 'idle' | 'preparing' | 'rendering_page_1' | 'rendering_page_2' | 'rendering_page_3' | 'assembling' | 'completed' | 'error';
  progress: number;
  message: string;
}

export interface GeneratedPdfResult {
  blobUrl: string;
  dataUri: string;
  pageImages: string[];
  pdf: jsPDF;
}

export async function generateDirectPdf(
  onProgress?: (progress: PdfGenerationProgress) => void
): Promise<GeneratedPdfResult> {
  try {
    onProgress?.({
      status: 'preparing',
      progress: 10,
      message: 'Preparando as 3 páginas do catálogo...',
    });

    // Ensure elements are available
    const page1El = document.getElementById('pagina-1');
    const page2El = document.getElementById('pagina-2');
    const page3El = document.getElementById('pagina-3');

    if (!page1El || !page2El || !page3El) {
      throw new Error('As páginas do catálogo precisam estar carregadas na tela.');
    }

    const pages = [
      { el: page1El, name: 'Página 1 (Tortas & Quiches)', status: 'rendering_page_1' as const, progress: 30 },
      { el: page2El, name: 'Página 2 (Folhados & Entradas)', status: 'rendering_page_2' as const, progress: 60 },
      { el: page3El, name: 'Página 3 (Taças & Prazos)', status: 'rendering_page_3' as const, progress: 85 },
    ];

    // Initialize jsPDF A4 portrait
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const pageImages: string[] = [];

    for (let i = 0; i < pages.length; i++) {
      const { el, name, status, progress } = pages[i];

      onProgress?.({
        status,
        progress,
        message: `Processando ${name}...`,
      });

      // Render page element to canvas
      const canvas = await html2canvas(el, {
        scale: 1.5, // optimal balance between speed and high-resolution print sharpness
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1200,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      pageImages.push(imgData);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Calculate aspect ratio so it fits cleanly on A4
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      } else {
        const scaledWidth = (canvas.width * pdfHeight) / canvas.height;
        const xOffset = (pdfWidth - scaledWidth) / 2;
        pdf.addImage(imgData, 'JPEG', xOffset, 0, scaledWidth, pdfHeight, undefined, 'FAST');
      }
    }

    onProgress?.({
      status: 'assembling',
      progress: 95,
      message: 'Criando documento PDF...',
    });

    const fileName = 'Catalogo_Agridoce_Gourmet_Natal_Reveillon.pdf';
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const dataUri = pdf.output('datauristring');

    // Attempt direct save
    try {
      pdf.save(fileName);
    } catch (saveErr) {
      console.warn('pdf.save was blocked or restricted by iframe sandbox:', saveErr);
    }

    // Attempt anchor tag download
    try {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 2000);
    } catch (linkErr) {
      console.warn('Anchor download fallback failed:', linkErr);
    }

    onProgress?.({
      status: 'completed',
      progress: 100,
      message: 'PDF pronto com sucesso!',
    });

    return {
      blobUrl,
      dataUri,
      pageImages,
      pdf,
    };
  } catch (error: any) {
    console.error('Erro ao gerar PDF:', error);
    onProgress?.({
      status: 'error',
      progress: 0,
      message: error?.message || 'Houve um erro ao processar o catálogo.',
    });
    throw error;
  }
}
