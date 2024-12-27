import { Window } from "@components/atoms/Container";
import QRScanner from "@components/organisms/QRScanner";

const AttendancePage = () => {
  return (
    <Window>
      <QRScanner
        setValue={(value: string) => {
          alert(value);
        }}
      />
    </Window>
  );
};

export default AttendancePage;
