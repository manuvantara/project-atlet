import { useTheme } from '@react-navigation/native';
import { Text as RNText, type TextProps } from 'react-native';

export default function Text({ children, ...props }: TextProps) {
  const theme = useTheme();
  return (
    <RNText {...props} style={[{ color: theme.colors.text }, props.style]}>
      {children}
    </RNText>
  );
}
