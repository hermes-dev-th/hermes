import "./globals.css";
import ScrollToTopOnRefresh from './components/ScrollToTopOnRefresh'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Hermes-Dev</title>
        <link rel="icon" href="/images/FavIcon.png"></link>
        
      </head>
      <body className="font-sukhumvit">
        
        <ScrollToTopOnRefresh />

        <div className="h-[1vh]"></div>
        {children}
      

      </body>
    </html>
  );
}