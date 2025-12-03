// 'use client'
// import { useSession, signOut } from "next-auth/react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//     const { data: session } = useSession();
//     console.log(session?.user.username);

//     return (
//         <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
//             <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//                 <a href="#" className="text-xl font-bold mb-4 md:mb-0">
//                     SecretMessages
//                 </a>
//                 {session ? (
//                     <>
//                         <span className="mr-4">
//                             Welcome, {session?.user?.username || session?.user?.email}
//                         </span>

//                         <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
//                             Logout
//                         </Button>
//                     </>
//                 ) : (
//                     <Link href="/sign-in">
//                         <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
//                     </Link>
//                 )}
//             </div>
//         </nav>
//     )
// }

// export default Navbar

'use client'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Home, LogOut, LogIn, User, LayoutDashboard } from "lucide-react";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo/Home Link */}
                <Link href="/" className="text-xl font-bold mb-4 md:mb-0 flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    SecretMessages
                </Link>

                {session ? (
                    <>
                        {/* Dashboard Link */}
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-white hover:bg-gray-800">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            
                            <span className="text-gray-300 flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                {session?.user?.username || session?.user?.email}
                            </span>

                            <Button 
                                onClick={() => signOut()} 
                                variant="outline" 
                                className="bg-slate-100 text-black hover:bg-slate-200"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button className="bg-slate-100 text-black hover:bg-slate-200" variant={'outline'}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar