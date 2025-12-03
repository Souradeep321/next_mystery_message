// 'use client'

// import { ApiResponse } from "@/types/ApiResponse"
// import { zodResolver } from "@hookform/resolvers/zod"
// import Link from "next/link"
// import { useForm } from "react-hook-form"
// import { useEffect, useState } from "react"
// import { useDebounceCallback } from 'usehooks-ts'
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import axios, { AxiosError } from "axios"
// import { toast } from "sonner"
// import { ArrowRight, Loader2 } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { signUpSchema } from "@/schemas/signUpSchema"


// const page = () => {
//     const [username, setUsername] = useState('');
//     const [usernameMessage, setUsernameMessage] = useState('')
//     const [isCheckingUsername, setIsCheckingUsername] = useState(false)
//     const [isSubmitting, setIsSubmitting] = useState(false)

//     const debounced = useDebounceCallback(setUsername, 300)
//     const router = useRouter()

//     // zod implementation
//     const form = useForm<z.infer<typeof signUpSchema>>({
//         resolver: zodResolver(signUpSchema),
//         defaultValues: {
//             username: '',
//             email: '',
//             password: '',
//         },
//     })

//     useEffect(() => {
//         const checkUsernameUnique = async () => {
//             if (!username.trim()) {
//                 setUsernameMessage("")
//                 return
//             }

//             setIsCheckingUsername(true)
//             setUsernameMessage("")

//             try {
//                 const response = await axios.get<ApiResponse>(
//                     `/api/check-username-unique?username=${username}`
//                 )
//                 console.log(response.data)
//                 setUsernameMessage(response.data.message)
//             } catch (error) {
//                 const axiosError = error as AxiosError<ApiResponse>
//                 setUsernameMessage(
//                     axiosError.response?.data.message ?? "Error checking username"
//                 )
//             } finally {
//                 setIsCheckingUsername(false)
//             }
//         }

//         checkUsernameUnique()
//     }, [username])


//     const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//         setIsSubmitting(true)
//         console.log({ data })
//         try {
//             const response = await axios.post<ApiResponse>('/api/sign-up', data)
//             console.log(response.data)
//             toast.success(response.data.message)
//             form.reset()

//             router.replace(`/verify/${data.username}`);
//             setIsSubmitting(false)
//         } catch (error) {
//             console.error('Error during sign-up:', error);
//             const axiosError = error as AxiosError<ApiResponse>;

//             let errorMessage = axiosError.response?.data.message;
//             // ('There was a problem with your sign-up. Please try again.');

//             toast.error('Error during sign-up: ' + errorMessage);
//             setIsSubmitting(false)
//             form.reset()
//         }
//     }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join True Feedback
//           </h1>
//           <p className="mb-4">Sign up to start your anonymous adventure</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="username"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <Input
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e);
//                       setUsername(e.target.value);
//                     }}
//                   />
//                   {isCheckingUsername && <Loader2 className="animate-spin" />}
//                   {!isCheckingUsername && usernameMessage && (
//                     <p
//                       className={`text-sm ${
//                         usernameMessage === 'Username is unique'
//                           ? 'text-green-500'
//                           : 'text-red-500'
//                       }`}
//                     >
//                       {usernameMessage}
//                     </p>
//                   )}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <Input {...field} name="email" />
//                   <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
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
//                   <Input type="password" {...field} name="password" />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className='w-full' disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Already a member?{' '}
//             <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page


'use client'

import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { ArrowRight, Loader2, Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"


const page = () => {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const debounced = useDebounceCallback(setUsername, 300)
    const router = useRouter()

    // zod implementation
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    })

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (!username.trim()) {
                setUsernameMessage("")
                return
            }

            setIsCheckingUsername(true)
            setUsernameMessage("")

            try {
                const response = await axios.get<ApiResponse>(
                    `/api/check-username-unique?username=${username}`
                )
                setUsernameMessage(response.data.message)
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>
                setUsernameMessage(
                    axiosError.response?.data.message ?? "Error checking username"
                )
            } finally {
                setIsCheckingUsername(false)
            }
        }

        checkUsernameUnique()
    }, [username])

    // Password strength checker
    useEffect(() => {
        const password = form.watch("password")
        let strength = 0
        
        if (password.length >= 8) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[a-z]/.test(password)) strength += 1
        if (/[0-9]/.test(password)) strength += 1
        if (/[^A-Za-z0-9]/.test(password)) strength += 1
        
        setPasswordStrength(strength)
    }, [form.watch("password")])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/sign-up', data)
            toast.success(response.data.message)
            form.reset()
            router.replace(`/verify/${data.username}`);
        } catch (error) {
            console.error('Error during sign-up:', error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast.error(errorMessage || 'There was a problem with your sign-up. Please try again.');
        } finally {
            setIsSubmitting(false)
        }
    }

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-300"
        if (passwordStrength <= 2) return "bg-red-500"
        if (passwordStrength === 3) return "bg-yellow-500"
        if (passwordStrength === 4) return "bg-emerald-400"
        return "bg-emerald-600"
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                    Join SecretMessages
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Create your anonymous messaging link in seconds
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800/50 backdrop-blur-sm py-8 px-4 shadow-xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-gray-700">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Username Field */}
                            <FormField
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 flex items-center">
                                            <User className="h-4 w-4 mr-2" />
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    placeholder="Choose a unique username"
                                                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 pl-10"
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        setUsername(e.target.value)
                                                    }}
                                                />
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                            </div>
                                        </FormControl>
                                        <div className="flex items-center space-x-2 mt-2">
                                            {isCheckingUsername && (
                                                <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                                            )}
                                            {!isCheckingUsername && usernameMessage && (
                                                <>
                                                    {usernameMessage === 'Username is unique' ? (
                                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4 text-red-500" />
                                                    )}
                                                    <p className={`text-sm ${usernameMessage === 'Username is unique' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        {usernameMessage}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            {/* Email Field */}
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 flex items-center">
                                            <Mail className="h-4 w-4 mr-2" />
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 pl-10"
                                                />
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                            </div>
                                        </FormControl>
                                        <p className="text-xs text-gray-400 mt-1">
                                            We'll send a verification code to this email
                                        </p>
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
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Create a strong password"
                                                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 pl-10 pr-10"
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
                                        
                                        {/* Password Strength Indicator */}
                                        {field.value && (
                                            <div className="mt-3 space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-400">Password strength:</span>
                                                    <span className={`font-medium ${
                                                        passwordStrength === 0 ? "text-gray-400" :
                                                        passwordStrength <= 2 ? "text-red-400" :
                                                        passwordStrength === 3 ? "text-yellow-400" :
                                                        "text-emerald-400"
                                                    }`}>
                                                        {passwordStrength === 0 ? "None" :
                                                         passwordStrength <= 2 ? "Weak" :
                                                         passwordStrength === 3 ? "Good" :
                                                         passwordStrength === 4 ? "Strong" : "Very Strong"}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                                        style={{ width: `${passwordStrength * 20}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-gray-400 space-y-1">
                                                    <p>Password should contain:</p>
                                                    <ul className="list-disc list-inside ml-2 space-y-1">
                                                        <li className={field.value.length >= 8 ? "text-emerald-400" : "text-gray-500"}>
                                                            At least 8 characters
                                                        </li>
                                                        <li className={/[A-Z]/.test(field.value) ? "text-emerald-400" : "text-gray-500"}>
                                                            One uppercase letter
                                                        </li>
                                                        <li className={/[0-9]/.test(field.value) ? "text-emerald-400" : "text-gray-500"}>
                                                            One number
                                                        </li>
                                                        <li className={/[^A-Za-z0-9]/.test(field.value) ? "text-emerald-400" : "text-gray-500"}>
                                                            One special character
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 text-lg bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white   transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Free Account
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {/* Terms */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            By signing up, you agree to our{' '}
                            <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                    {/* Login Link */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <div className="text-center">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <Link 
                                    href="/sign-in" 
                                    className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                                >
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mt-8 p-4 bg-gray-900/30 rounded-xl border border-gray-700">
                        <p className="text-sm text-gray-400 text-center">
                            <span className="font-medium text-emerald-400">Free forever plan includes:</span>{' '}
                            Unlimited messages • Custom link • Anonymous replies • No credit card required
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page