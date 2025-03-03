import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import CompanyClothesUpload from "@pages/CompanyClothesUpload";

global.URL.createObjectURL = vi.fn().mockReturnValue("mocked-url");

vi.mock("@utills/imageUpload", () => ({
  handleImageUpload: vi
    .fn()
    .mockImplementation(
      (
        event: React.ChangeEvent<HTMLInputElement>,
        setImages: React.Dispatch<React.SetStateAction<string[]>>,
      ) => {
        const files = event.target.files;
        if (files) {
          setImages(Array.from(files).map((file) => URL.createObjectURL(file)));
        }
      },
    ),
}));

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={["/company/clothes-upload"]}>
      <Routes>
        <Route
          path="/company/clothes-upload"
          element={<CompanyClothesUpload />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("CompanyClothesUpload Page", () => {
  it("사용자가 의상 이미지를 업로드할 때 이미지가 화면에 표시되는지 확인", async () => {
    renderWithRouter();

    const fileInput = screen.getByLabelText("의상 추가");
    const file = new File(["image"], "image.jpg", { type: "image/jpeg" });

    // 파일 업로드 이벤트 트리거
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      // 이미지가 화면에 표시되는지 확인
      expect(screen.getByAltText("uploaded-image-0")).toBeInTheDocument();
    });
  });
});
