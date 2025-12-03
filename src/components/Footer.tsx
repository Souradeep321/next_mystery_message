import Link from 'next/link';
import { MessageSquare, Heart, Twitter, Github } from 'lucide-react';

const page = () => {
 const currentYear = new Date().getFullYear();
 
   return (
     <footer className="border-t border-gray-800 bg-gray-900/50 mt-auto">
       <div className="container mx-auto px-4 py-12">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* Brand */}
           <div className="space-y-4">
             <div className="flex items-center space-x-2">
               <div className="h-10 w-10 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                 <MessageSquare className="h-5 w-5 text-white" />
               </div>
               <span className="text-xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                 SecretMessages
               </span>
             </div>
             <p className="text-sm text-gray-400">
               Anonymous messaging platform for honest conversations.
             </p>
             <div className="flex space-x-4">
               <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                 <Twitter className="h-5 w-5" />
               </a>
               <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                 <Github className="h-5 w-5" />
               </a>
             </div>
           </div>
 
           {/* Product */}
           <div>
             <h3 className="font-semibold text-gray-200 mb-4">Product</h3>
             <ul className="space-y-3">
               <li>
                 <Link href="/features" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Features
                 </Link>
               </li>
               <li>
                 <Link href="/pricing" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Pricing
                 </Link>
               </li>
               <li>
                 <Link href="/api" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   API
                 </Link>
               </li>
               <li>
                 <Link href="/status" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Status
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Company */}
           <div>
             <h3 className="font-semibold text-gray-200 mb-4">Company</h3>
             <ul className="space-y-3">
               <li>
                 <Link href="/about" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   About
                 </Link>
               </li>
               <li>
                 <Link href="/blog" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Blog
                 </Link>
               </li>
               <li>
                 <Link href="/careers" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Careers
                 </Link>
               </li>
               <li>
                 <Link href="/press" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Press
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Legal */}
           <div>
             <h3 className="font-semibold text-gray-200 mb-4">Legal</h3>
             <ul className="space-y-3">
               <li>
                 <Link href="/privacy" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Privacy Policy
                 </Link>
               </li>
               <li>
                 <Link href="/terms" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Terms of Service
                 </Link>
               </li>
               <li>
                 <Link href="/cookies" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Cookie Policy
                 </Link>
               </li>
               <li>
                 <Link href="/contact" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                   Contact
                 </Link>
               </li>
             </ul>
           </div>
         </div>
 
         <div className="mt-12 pt-8 border-t border-gray-800">
           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
             <p className="text-sm text-gray-400 flex items-center">
               <Heart className="h-4 w-4 mr-2 text-red-500 animate-pulse" />
               Made with love for meaningful conversations
             </p>
             <p className="text-sm text-gray-400">
               © {currentYear} SecretMessages. All rights reserved.
             </p>
           </div>
           <div className="text-center mt-4">
             <p className="text-xs text-gray-500">
               Messages are anonymous and end-to-end encrypted. We never share your data.
             </p>
           </div>
         </div>
       </div>
     </footer>
   );
}

export default page