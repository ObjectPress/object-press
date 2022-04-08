import { styled } from 'baseui';

export const LoaderItem = styled('div', () => ({
  width: '100%',
  padding: '0 15px',
  marginBottom: '30px',
}));

export const ImageContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '200px',
  alignItems: 'center',
  backgroundColor: $theme.colors.white,
  padding: '10px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
}));

export const AltTag = styled('p', ({ $theme }) => ({
  ...$theme.typography.font13,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  width: '100%',
}));

export const ButtonContainer = styled('div', () => ({
  display: 'flex',
}));
