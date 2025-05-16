export default function LocaleLayout({ children, params }) {
  // Get the locale from the URL parameter
  const { locale } = params;
  
  // We'll pass children through as locale handling is done in RootLayout and ClientWrapper
  return children;
} 