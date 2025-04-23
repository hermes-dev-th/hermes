import "./globals.css";
import ScrollToTopOnRefresh from './components/ScrollToTopOnRefresh'

export const metadata = {
  title: 'Hermes-Dev',
  description: 'Description of your Hermes application',
  keywords: ['hermes', 'application', 'nextjs'],
  metadataBase: new URL('https://hermes.dev'),
  openGraph: {
    title: 'Hermes-Dev',
    description: 'Description of your Hermes application',
    url: 'https://hermes.dev',
    siteName: 'Hermes',
    images: [
      {
        url: '/images/Only-Hermes-Dev-Logo.png', 
        width: 1200,
        height: 630,
        alt: 'Hermes App',
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
    icon: '/images/Only-Hermes-Dev-Logo.png',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sukhumvit">
        <ScrollToTopOnRefresh />
        <div className="h-[1vh]"></div>
        {children}
      </body>
    </html>
  );
}