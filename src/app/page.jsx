import { redirect } from 'next/navigation';

export default function Home() {
  // This page should never be rendered directly
  // The middleware should handle the redirection to the proper locale
  redirect('/en');
  
  return null;
}
