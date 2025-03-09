import styled from "styled-components";
import { COMMON_COLORS } from "@/styled/colors";
import MainWindow from "@components/mocules/MainWindow";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const UploadPDFPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
    }
  };

  const handleReupload = () => {
    setSelectedFile(null);
    localStorage.removeItem("uploadedPdf");
  };

  return (
    <MainWindow bottomNavigationShown={false}>
      {!selectedFile && (
        <FileSelector>
          <label htmlFor="file">PDF 업로드</label>
          <input
            id="file"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </FileSelector>
      )}
      {selectedFile && <PreviewText>{selectedFile.name}</PreviewText>}
      {selectedFile && (
        <ViewerContainer>
          <Document
            file={URL.createObjectURL(selectedFile)}
            onLoadSuccess={async (pdf) => {
              const numPages = pdf.numPages;
              setNumPages(numPages);
              await pdf.getPage(1).then((page) => {
                const { viewBox } = page.getViewport({ scale: 1 });
                const bodyWidth = document.body.clientWidth;
                const scale = bodyWidth / viewBox[2];
                setScale(scale);
              });
            }}
          >
            <Page pageNumber={currentPage} scale={scale} />
          </Document>
          <Navigation>
            <NavButton
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전
            </NavButton>
            <PageIndicator>
              {currentPage} / {numPages}
            </PageIndicator>
            <NavButton
              disabled={currentPage >= numPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음
            </NavButton>
          </Navigation>
          <ReuploadButton onClick={handleReupload}>재등록</ReuploadButton>
        </ViewerContainer>
      )}
    </MainWindow>
  );
};

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
    cursor: pointer;
    color: #fff;
  }

  & > input {
    display: none;
  }
`;

const PreviewText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

const ViewerContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navigation = styled.div`
  margin-top: 10px;
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

const PageIndicator = styled.span`
  font-size: 14px;
  color: #000;
`;

const ReuploadButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export default UploadPDFPage;
