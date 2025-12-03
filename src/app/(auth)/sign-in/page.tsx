// 'use client'

// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { signInSchema } from "@/schemas/signInSchema"
// import Link from "next/link"
// import axios, { AxiosError } from "axios"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"
// import { signIn } from "next-auth/react"

// const page = () => {
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
//   const router = useRouter();

//   // zod implementation
//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       identifier: '',
//       password: ''
//     },
//   })

//   // or we can write it like this too instead of ...data
//   // identifier: data.identifier, 
//   // password: data.password
//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     setIsSubmitting(true)
//     try {
//       const result = await signIn('credentials', {
//         redirect: false,
//         ...data,
//       })

//       if (result?.error) {
//         if (result.error === 'CredentialsSignin') {
//           toast.error('Invalid username or password');
//         }
//         else {
//           toast.error(result.error);
//         }
//       } else {
//         toast.success('Login successful');
//       }

//       if (result?.url && result.ok) {
//         router.replace('/dashboard');
//       }
//     } catch (error) {
//       toast.error('There was a problem with your sign-in. Please try again.');
//     } finally {
//       setIsSubmitting(false)
//       form.reset()
//     }
//   }


//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Welcome Back to True Feedback
//           </h1>
//           <p className="mb-4">Sign in to continue your secret conversations</p>
//         </div>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6">
//             <FormField
//               name="identifier"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email/Username</FormLabel>
//                   <Input
//                     placeholder="Enter your email or username"
//                     type="text"
//                     {...field}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <Input
//                     placeholder="••••••••"
//                     type="password"
//                     {...field}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               className='w-full'
//               type="submit"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ?
//                 (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Signing In.....
//                   </>
//                 )
//                 : 'Sign In'}
//             </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Not a member yet?{' '}
//             <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default page

'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInSchema } from "@/schemas/signInSchema"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Key } from "lucide-react"
import { signIn } from "next-auth/react"

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...data,
      })

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast.error('Invalid email/username or password. Please try again.');
        } else {
          toast.error('Login failed. Please try again.');
        }
      } else {
        toast.success('Welcome back! Login successful.');
      }

      if (result?.url && result.ok) {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('There was a problem with your sign-in. Please try again.');
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
            <Key className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to access your anonymous messages
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-sm py-8 px-4 shadow-xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-gray-700">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Email/Username Field */}
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email or Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your email or username"
                          type="text"
                          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 pl-10"
                          {...field}
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 pl-10 pr-10"
                          {...field}
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <div className="flex justify-end">
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  className="w-full py-6 text-lg bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white  transition-all duration-200"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Demo/Test Account */}
          <div className="mt-6 p-4 bg-gray-900/30 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 text-center">
              <span className="font-medium text-amber-400">Demo Account:</span>{' '}
              demo@example.com / demodemo123
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/sign-up" 
                  className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                >
                  Create a free account
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
            <Link 
              href="/privacy" 
              className="text-gray-500 hover:text-gray-300 transition-colors mb-2 sm:mb-0"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/help" 
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              Need help signing in?
            </Link>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="mt-8 max-w-md mx-auto text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Lock className="h-3 w-3 text-emerald-400" />
          </div>
          <span>Your login is secure and encrypted</span>
        </div>
      </div>
    </div>
  )
}

export default page