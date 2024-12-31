import Container from "@components/atoms/Container";
import { MainButton, HistoryBackButton } from "@components/atoms/Button";
import Margin from "@components/atoms/Margin";
import Text from "@components/atoms/Text";
import { COMMON_COLORS, BACKGROUND_COLORS, FONT_COLORS } from "@/styled/colors";
import Window from "./Window";

interface SignWindowProps {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  submitText?: string;
  buttonProps: Parameters<typeof MainButton>[0];
}

const SignWindow = ({
  children,
  title,
  subTitle = "",
  submitText = "다음",
  buttonProps,
}: SignWindowProps) => {
  return (
    <Window paddingHorizontal={40} background={BACKGROUND_COLORS.sign}>
      <Container flex={30} alignItems="flex-start">
        <HistoryBackButton />
        <Margin size={30} />
        <Text size={35} color={COMMON_COLORS.main} weight={600}>
          {title}
        </Text>
        <Margin size={10} />
        {subTitle.length > 0 && (
          <Text size={15} color={FONT_COLORS.gray} weight={400}>
            {subTitle}
          </Text>
        )}
      </Container>
      <Container flex={55} justifyContent="flex-start">
        {children}
      </Container>
      <Container flex={15}>
        <MainButton {...buttonProps}>{submitText}</MainButton>
      </Container>
    </Window>
  );
};

export default SignWindow;
