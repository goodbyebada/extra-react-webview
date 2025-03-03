/**
 * handleImageUpload : 의상 이미지 업로드
 */

export const handleImageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const files = event.target.files;
  if (!files) return;

  const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
  setImages((prevImages) => [...prevImages, ...imageUrls]);
};
