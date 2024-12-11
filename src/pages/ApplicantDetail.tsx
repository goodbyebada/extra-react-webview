import Modal from "../components/Modal";
import backIcon from "@assets/backIcon.png";
import { sendMessage } from "@api/utils";
import { useEffect, useState } from "react";

export function ApplicantDetail() {
  const [data, setData] = useState({
    id: "",
    name: "",
  });

  const messageHandler = (event: globalThis.MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.type === "POST_DATA") {
      setData(data.payload);
    }
  };

  useEffect(() => {
    window.addEventListener("message", messageHandler);
    document.addEventListener("message", messageHandler as EventListener);

    return () => {
      window.removeEventListener("message", messageHandler);
      document.removeEventListener("message", messageHandler as EventListener);
    };
  }, []);

  return (
    <Modal isVisible={true} onClose={() => {}}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <img
          src={backIcon}
          alt="back"
          onClick={() => {
            sendMessage({
              type: "HISTORY_BACK",
              version: "1.0",
            });
          }}
          style={{ width: "20px" }}
        />
        <p style={{ fontSize: "24px", fontWeight: "900" }}>상세 프로필</p>
      </div>

      <p style={{ fontSize: "20px", fontWeight: "700" }}>이름 : {data.name}</p>
    </Modal>
  );
}
