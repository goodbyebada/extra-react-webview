import { BeatLoader } from "react-spinners";

type LoadingProps = {
  loading: boolean;
};

const Loading = ({ loading }: LoadingProps) => {
  return (
    <div style={containerStyle}>
      <BeatLoader
        color="#f5c001"
        loading={loading}
        size={25}
        speedMultiplier={0.5}
        margin={5}
      />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
};

export default Loading;
