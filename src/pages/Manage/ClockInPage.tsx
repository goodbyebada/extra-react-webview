import MainWindow from "@components/mocules/MainWindow";
import QRScanner from "@components/organisms/QRScanner";

const ClockInPage = () => {
  return (
    <MainWindow bottomNavigationShown={false}>
      <QRScanner
        setValue={(value: string) => {
          alert(value);
        }}
      />
    </MainWindow>
  );
};

export default ClockInPage;
