import BackIconImg from "@assets/backIcon.png";
import { SpaceBetweenNavBar } from "@components/template/Layout";
import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";
import { BackButton } from "@components/atoms/Button";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export function CompanyNavBar() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <BackButton />
      <SpaceBetweenNavBar>
        <div> 모집 공고</div>
        <div> 드라마 </div>
      </SpaceBetweenNavBar>
    </Wrapper>
  );
}
