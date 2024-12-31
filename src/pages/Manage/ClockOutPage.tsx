import MainWindow from "@components/mocules/MainWindow";
import QRScanner from "@components/organisms/QRScanner";

const ClockOutPage = () => {
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

export default ClockOutPage;
