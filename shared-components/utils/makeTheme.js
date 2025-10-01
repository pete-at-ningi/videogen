export default function makeTheme(config) {
  const theme = {
    alignment: config?.alignment || 'left',
    colors: {
      primary: config?.colors_primary || '#283149',
      secondary: config?.colors_secondary || '#3a476a',
      accent: config?.colors_accent || '#9146FF',
      almostLight: config?.colors_almostLight || '#F4F5F3',
      light: config?.colors_light || '#9E9E9E',
      background: config?.colors_background || '#FBFBFB',
      dark: config?.colors_dark || '#161b28',
      white: '#ffffff',
    },
    fonts: {
      primary: config?.font || "'Outfit', sans-serif",
    },
    fontSizes: {
      small: config?.font_small || '0.875rem',
      medium: config?.font_medium || '1rem',
      large: config?.font_large || '1.25rem',
      xlarge: config?.font_xlarge || '2.5rem',
      massive: config?.font_massive || '3.5rem',
    },
    spacings: {
      small: config?.spacings_small || '8px',
      medium: config?.spacings_medium || '16px',
      large: config?.spacings_large || '24px',
      xlarge: config?.spacings_xlarge || '64px',
      massive: config?.spacings_massive || '128px',
    },
    borders: {
      radius: config?.borders_radius || '4px',
    },
    breakpoints: {
      mobile: 'only screen and (max-width: 600px)',
      tablet: 'only screen and (min-width: 601px) and (max-width: 900px)',
      desktop: 'only screen and (min-width: 901px)',
      maxWidth: '1400px',
    },
    hover: { opacity: 0.5 },
  };

  return theme;
}
