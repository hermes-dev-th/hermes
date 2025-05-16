import "./globals.css";
import ScrollToTopOnRefresh from './components/ScrollToTopOnRefresh'

export const metadata = {
  title: 'Hermes-Dev | Software Development Solutions',
  description: 'Hermes provides high-quality software development services, web applications, and digital solutions for businesses of all sizes.',
  keywords: ['hermes', 'software development', 'web applications', 'nextjs', 'tailwind css', 'responsive design'],
  metadataBase: new URL('https://hermes.dev'),
  openGraph: {
    title: 'Hermes-Dev | Software Development Solutions',
    description: 'Professional software development services tailored to your unique business needs.',
    url: 'https://hermes.dev',
    siteName: 'Hermes',
    images: [
      {
        url: '/images/Only-Hermes-Dev-Logo.png', 
        width: 1200,
        height: 630,
        alt: 'Hermes Development',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/images/FavIcon.png' },
      { url: '/images/Only-Hermes-Dev-Logo.png', type: 'image/png' },
    ],
    apple: { url: '/images/Only-Hermes-Dev-Logo.png', type: 'image/png' },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1, 
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sukhumvit antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <ScrollToTopOnRefresh />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}