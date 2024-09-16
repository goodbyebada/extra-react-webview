import ExtraHomeWrapper from "@components/ExtraHomeWrapper";
import ExtraHomeContent from "@components/ExtraHomeContent";

/**
 * 보조 출연자 홈화면
 *
 * @returns 보조 출연자 홈화면 UI
 */
export default function ExtrasHome() {
  // useEffect(() => {
  //   const listener = (event: MessageEvent) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === "POST_DATA") {
  //       setName(data.payload.name);
  //     }
  //   };

  //   window.addEventListener("message", listener);
  //   document.addEventListener("message", listener as EventListener);
  // }, []);

  return (
    <ExtraHomeWrapper>
      <ExtraHomeContent />
    </ExtraHomeWrapper>
  );
}
