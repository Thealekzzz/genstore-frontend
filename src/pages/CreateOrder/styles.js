export const horizontalContainer = {
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: {
    xs: 'column',
    sm: 'row',
  },
  gap: 3,
};

export const horizontalSideContainer = {
  sx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  },
};

export const horizontalFixedContainer = {
  sx: {
    display: 'grid',
    gridTemplateColumns: 'max-content 2fr',
    gap: 2,
    px: 2,
    mt: 2,
  },
};

export const section = {
  sx: {
    backgroundColor: '#efefef',
    padding: 2,
    borderRadius: 2,
  },
};

export const label = {
  sx: {
    fontSize: 14,
    fontWeight: 600,
    mb: 2,
    // mr: 3,
  },
};

export const wrapper = {
  sx: {
    width: '100%',
    px: 2,
  },
};

export const container = {
  sx: {
    minHeight: 200,
    backgroundColor: 'white',
    px: 3,
    py: 2,
    my: 2,

    borderRadius: 2,

    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  maxWidth: 'sm',
};

export const header = {
  sx: {
    // marginBottom: 4,
  },
};

export const title = {
  variant: 'h6',
  sx: {
    fontWeight: 700,
  },
};

export const form = {
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
};

export const fileWrapper = {
  // display: 'flex',
  // alignItems: 'center',
  // gap: 2,
  // padding: 1,
  // borderRadius: 1,
  // border: '1px solid #00000040',
};

export const fileButton = {
  variant: 'text',
  component: 'label',
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    minWidth: {
      xs: '100%',
      sm: 220,
    },
    height: 120,

    textAlign: 'center',

    border: '2px dashed #3580E8',
    borderRadius: 2,
  },
};

export const fileText = {
  fontSize: 10,
};

export const inputList = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
  gap: 1,
};

const input = {
  variant: 'outlined',
  fullWidth: true,
  // size: 'small',
  min: 2,
  sx: {
    fontSize: 8,
  },
};

export const orderNameInput = {
  ...input,
  required: true,
  label: 'Название',
  helperText: 'По нему позже можно будет найти этот расчет',
};

export const orderCommentInput = {
  ...input,
  label: 'Комментарий',
  helperText: 'Дополнительные пожелания / вопросы',
};

export const extraInfo = {
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
};

export const typeGroup = {
  sx: {
    mt: 1,
    px: 1,
  },
};

export const typeContainer = {
  sx: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    gap: 1,
  },
};

export const typeOption = {
  sx: {
    border: '1px solid #0002',
    borderRadius: 1,
    padding: 1,
    cursor: 'pointer',
    transition: 'background-color .2s, color .2s',

    pb: {
      xs: 2,
      sm: 1,
    },

    // '&:hover': {
    //   backgroundColor: '#00000018',
    // },
  },
};

export const typeTitle = {
  sx: {
    fontSize: 14,
    fontWeight: 'bold',
    mb: 1,
  },
};

export const typeText = {
  sx: {
    fontSize: 12,
  },
};

export const promoInput = {
  ...input,
  placeholder: 'SALE10',
  label: 'Промокод',
  size: 'small',
  sx: {
    fontSize: 8,
  },
};

export const promoButton = {
  variant: 'contained',
  sx: {
    px: 5,
    py: 1,
  },
};

export const promoName = {
  sx: {
    fontSize: 12,
    fontWeight: 600,
  },
};

export const promoDescription = {
  sx: {
    fontSize: 12,
  },
};
