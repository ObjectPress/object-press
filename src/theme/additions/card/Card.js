const Card = {
  baseStyle: {
    p: '22px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    minWidth: '0px',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
  },
  variants: {
    panel: (props) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
      width: '100%',
      boxShadow: 'rgba(0, 0, 0, 0.04) 0px 7px 11px',
      borderRadius: '15px',
    }),
  },
  defaultProps: {
    variant: 'panel',
  },
};

export const CardComponent = {
  components: {
    Card,
  },
};
