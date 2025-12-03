// import Navbar from '@/components/Navbar';
// import Link from 'next/link';

// interface RootLayoutProps {
//   children: React.ReactNode;
// }

// export default async function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       {children}
//     </div>
//   );
// }

'use client'
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { MessageSquare, Heart, Twitter, Github } from 'lucide-react';
import Footer from '@/components/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div 
    // className="flex flex-col min-h-screen bg-gray-950 text-white"
    >
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

