import { useRef, useState } from "react";
import styled from "styled-components";
import { MainButton } from "@components/atoms/Button";
import { Document, Page, pdfjs, DocumentProps } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { COMMON_COLORS } from "@styled/colors";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const pdfOptions = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

type CanvasEvent =
  | React.MouseEvent<HTMLCanvasElement>
  | React.TouchEvent<HTMLCanvasElement>;

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 300;

const keyword = "소프트웨어";

// interface HighlightLocation {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   page: number;
// }

interface TextLocation {
  x: number;
  y: number;
  fontSize: number;
  text: string;
  page: number;
}

type DocumentLoadCallback = Required<DocumentProps>["onLoadSuccess"];
type PDFDocumentProxy = Parameters<DocumentLoadCallback>[0];

const SignaturePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string>("");
  const [isRendering, setIsRendering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  // const [highlightLocations, setHighlightLocations] = useState<
  //   HighlightLocation[]
  // >([]);
  const [textLocations, setTextLocations] = useState<TextLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageScale, setPageScale] = useState(1);
  const [isSigned, setIsSigned] = useState<number[]>([]);
  const [hightlightComponent, setHighlightComponent] = useState<JSX.Element[]>(
    [],
  );

  const startDrawing = (e: CanvasEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(x - rect.left, y - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: CanvasEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(x - rect.left, y - rect.top);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const endDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setSelectedFile(file);

      // PDF 미리 보기 URL 설정
      const url = URL.createObjectURL(file);
      setPdfDataUrl(url);
      setCurrentPage(1); // 파일 변경 시 페이지 초기화
    }
  };

  const saveSignature = async () => {
    if (!selectedFile) {
      alert("파일이 존재하지 않습니다.");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureDataURL = canvas.toDataURL("image/png");

    const fileBuffer = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);

    const targetPage = pdfDoc.getPage(currentPage - 1);
    const { width, height } = targetPage.getSize();

    const pngImage = await pdfDoc.embedPng(signatureDataURL);
    const pngDims = pngImage.scale(0.25);

    // highlightLocations.forEach((loc: HighlightLocation) => {
    //   if (loc.page !== currentPage) return;

    //   const x = (loc.x / 100) * width;
    //   const y = height - (loc.y / 100) * height - loc.height;

    //   targetPage.drawImage(pngImage, {
    //     x,
    //     y,
    //     width: pngDims.width,
    //     height: pngDims.height,
    //   });
    // });

    textLocations.forEach((loc: TextLocation) => {
      const x = (loc.x / 100) * width - pngDims.width / 4;
      const y = height - (loc.y / 100) * height - pngDims.height / 2;

      targetPage.drawImage(pngImage, {
        x,
        y,
        width: pngDims.width,
        height: pngDims.height,
      });
    });

    setIsSigned((prev) => {
      const newSigned = [...prev];
      newSigned.push(currentPage);
      return newSigned;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    setPdfDataUrl(url);
    setSelectedFile(
      new File([blob], selectedFile.name, { type: "application/pdf" }),
    );
    setIsOpen(false);
    // setHighlightLocations([]);
    setTextLocations([]);
  };

  const extractHighlightPositions = async (pdf: PDFDocumentProxy) => {
    for (let i = 1; i <= pdf.numPages; i++) {
      await pdf
        .getPage(i)
        .then((page) => {
          const { viewBox } = page.getViewport({ scale: 1 });
          const bodyWidth = document.body.clientWidth;
          const scale = bodyWidth / viewBox[2];
          setPageScale(scale);
          setIsLoading(false);
          return { page, scale };
        })
        .then(async ({ page, scale }) => {
          const viewport = page.getViewport({ scale: scale });
          const textContent = await page.getTextContent();

          return { viewport, textContent };
        })
        .then(({ viewport, textContent }) => {
          for (const item of textContent.items) {
            if ("str" in item && "transform" in item) {
              const { str, transform } = item;
              if (str.includes(keyword)) {
                const x = transform[4];
                const y = transform[5];

                const left = (x / viewport.viewBox[2]) * 100;
                const top = 100 - (y / viewport.viewBox[3]) * 100;

                setTextLocations((prev) => {
                  const newLocations = [...prev];
                  newLocations.push({
                    x: left,
                    y: top,
                    fontSize: transform[0],
                    text: str,
                    page: currentPage,
                  });
                  return newLocations;
                });

                const highlight = (
                  <Highlight
                    key={str}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      fontSize: `${transform[0]}px`,
                    }}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    {str}
                  </Highlight>
                );

                setHighlightComponent((prev) => {
                  const newComponent = [...prev];
                  newComponent.push(highlight);
                  return newComponent;
                });
              }
            }
          }
        });
    }
  };

  const onDocumentLoadSuccess = async (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    await extractHighlightPositions(pdf);
  };

  const handlePageChange = (newPage: number) => {
    setIsRendering(true);
    setIsLoading(true);
    setHighlightComponent([]);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsRendering(false);
    }, 200);
  };

  return (
    <>
      <Container>
        {!pdfDataUrl && (
          <FileSelector>
            <label htmlFor="file">파일을 선택하세요</label>
            <input
              id="file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </FileSelector>
        )}
        {pdfDataUrl && (
          <>
            {!isRendering && (
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <Document
                    file={pdfDataUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={pdfOptions}
                  >
                    {!isLoading && (
                      <Page pageNumber={currentPage} scale={pageScale} />
                    )}
                  </Document>
                </div>
                {!isLoading &&
                  !isSigned.includes(currentPage) &&
                  hightlightComponent}
              </div>
            )}
            <Navigation>
              <NavButton
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = pdfDataUrl;
                  a.download = "signature.pdf";
                  a.click();
                }}
              >
                Save PDF
              </NavButton>
              <NavButton
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </NavButton>
              <span style={{ color: "#000" }}>
                {currentPage} / {numPages || 0}
              </span>
              <NavButton
                disabled={currentPage >= (numPages || 0)}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </NavButton>
            </Navigation>
          </>
        )}
        {isOpen && (
          <CanvasWrapper>
            <Canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            ></Canvas>
            <MainButton onClick={clearCanvas}>초기화</MainButton>
            <MainButton onClick={saveSignature}>완료</MainButton>
          </CanvasWrapper>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  background: #f5f5f5;
  border: 1px solid #ddd;
  overflow: hidden;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const FileSelector = styled.div`
  width: 200px;
  height: 50px;

  border-radius: 5px;

  display: flex;

  border: 1px dashed ${COMMON_COLORS.main};

  & > label {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    font-size: 15px;
    text-align: center;
    color: #000;
  }

  & > input {
    display: none;
  }
`;

const Highlight = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 0, 1);
  border: 1px solid #000;
  transform: translate(0, -75%);
  color: red;
  z-index: 2;
  cursor: pointer;
`;

const Navigation = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const NavButton = styled.button`
  padding: 5px 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Canvas = styled.canvas`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;

  border: 2px solid #aaa;

  background: #fff;

  margin-bottom: 20px;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  background: #ccc;

  display: flex;
  flex-direction: column;
  justify-content: center;

  z-index: 3;
`;

export default SignaturePage;
