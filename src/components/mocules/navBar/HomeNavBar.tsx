import TypeSelector from "@components/mocules/TypeSelector";
import AllOrRecommendationToggleBar from "@components/mocules/ToggleBar";
import { SpaceBetweenNavBar } from "@components/template/Layout";

export function HomeNavBar() {
  return (
    <SpaceBetweenNavBar>
      <AllOrRecommendationToggleBar />
      <TypeSelector />
    </SpaceBetweenNavBar>
  );
}
