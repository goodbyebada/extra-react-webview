import { useState } from "react";
import { Place } from "@type/shared";

interface KakaoApiResponse {
  documents: Array<{
    id: string;
    place_name: string;
    road_address_name: string | null;
    address_name: string | null;
    x: string; // 경도
    y: string; // 위도
  }>;
}

const useKakaoPlaceSearch = () => {
  const [filteredPosts, setFilteredPosts] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchKakaoPlaces = async (query: string) => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`,
          },
        },
      );

      const data: KakaoApiResponse = await response.json();

      if (data.documents) {
        const results: Place[] = data.documents.map((doc) => ({
          id: doc.id,
          placeName: doc.place_name,
          roadAddress: doc.road_address_name || "도로명 주소 없음",
          jibunAddress: doc.address_name || "지번 주소 없음",
          latitude: Number(doc.y),
          longitude: Number(doc.x),
        }));
        setFilteredPosts(results);
      } else {
        setFilteredPosts([]);
      }
    } catch (err) {
      console.error("Error fetching data from Kakao API:", err);
      setError("주소 검색에 실패했습니다.");
    }
  };

  return { filteredPosts, searchKakaoPlaces, error };
};

export default useKakaoPlaceSearch;
