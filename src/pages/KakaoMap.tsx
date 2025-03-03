import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { useLocation } from "react-router-dom";

/**
 * KakaoMap : 공고 주소 지도 화면
 */

function KakaoMap() {
  const location = useLocation();
  const { place } = location.state || {};

  const position = {
    lat: place?.latitude || 0,
    lng: place?.longitude || 0,
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map
        center={position}
        style={{ width: "100%", height: "100%" }}
        level={3}
        draggable={true}
      >
        <MapMarker position={position} />
        <CustomOverlayMap position={position} yAnchor={1.5}>
          <OverlayContainer>
            <Text size={18} weight={700} color="#333">
              {place.placeName}
            </Text>
            <AddressLine>
              <Tag>도로명</Tag>
              <Text size={14} weight={400} color="#555">
                {place.roadAddress}
              </Text>
            </AddressLine>
            <AddressLine>
              <Tag>지번</Tag>
              <Text size={14} weight={400} color="#555">
                {place.jibunAddress}
              </Text>
            </AddressLine>
          </OverlayContainer>
        </CustomOverlayMap>
      </Map>
    </div>
  );
}

export default KakaoMap;

const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  padding: 15px;
  max-width: 450px;
`;

const AddressLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  margin-top: 5px;
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  background-color: #f5c001;
  width: 52px;
  padding: 2px;
  border-radius: 12px;
  text-align: center;
`;
