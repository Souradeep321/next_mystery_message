// 'use client'

// import { Button } from "@/components/ui/button"
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { toast } from "sonner"
// import { useParams, useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import axios, { AxiosError } from "axios"
// import { ApiResponse } from "@/types/ApiResponse"
// import * as z from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { verifySchema } from "@/schemas/verifySchema"
// import { useState } from "react"

// const page = () => {
//     const router = useRouter();
//     const params = useParams<{ username: string }>();
//     const [isLoading, setIsLoading] = useState(false);

//     if (!params.username) {
//         return <p className="text-center mt-10">Invalid verification link</p>;
//     }

//     const form = useForm<z.infer<typeof verifySchema>>({
//         resolver: zodResolver(verifySchema),
//         defaultValues: {
//             verifyCode: "",
//         },
//     });

//     const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//         try {
//             setIsLoading(true);
//             const response = await axios.post<ApiResponse>('/api/verify-code', {
//                 username: params.username,
//                 verifyCode: data.verifyCode
//             });

//             toast.success(response.data.message || "Verification successful");
//             router.replace(`/sign-in`);
//         } catch (error) {
//             const axiosError = error as AxiosError<ApiResponse>;
//             toast.error(axiosError.response?.data.message || "Error verifying code");
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//                 <div className="text-center">
//                     <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//                         Verify Your Account
//                     </h1>
//                     <p className="mb-4">Enter the verification code sent to your email</p>
//                 </div>

//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                         <FormField
//                             name="verifyCode"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Verification Code</FormLabel>
//                                     <Input
//                                         type="text"
//                                         inputMode="numeric"
//                                         maxLength={6}
//                                         {...field}
//                                     />
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <Button type="submit" disabled={isLoading}>
//                             {isLoading ? "Verifying..." : "Verify"}
//                         </Button>
//                     </form>
//                 </Form>
//             </div>
//         </div>
//     )
// }

// export default page;

'use client'

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { verifySchema } from "@/schemas/verifySchema"
import { useState } from "react"
import { Loader2, Mail, Key, Shield, ArrowRight, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"

const page = () => {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle')

    if (!params.username) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 to-black flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="h-20 w-20 rounded-full bg-linear-to-r from-red-500 to-amber-500 flex items-center justify-center mx-auto mb-6">
                        <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Invalid Verification Link</h2>
                    <p className="text-gray-400 mb-6">The verification link appears to be invalid or expired.</p>
                    <Button 
                        onClick={() => router.push('/sign-up')}
                        className="bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                    >
                        Go to Sign Up
                    </Button>
                </div>
            </div>
        )
    }

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            verifyCode: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            setIsLoading(true);
            setVerificationStatus('idle');
            
            const response = await axios.post<ApiResponse>('/api/verify-code', {
                username: params.username,
                verifyCode: data.verifyCode
            });

            setVerificationStatus('success');
            toast.success(response.data.message || "Verification successful!");
            
            // Redirect after short delay to show success state
            setTimeout(() => {
                router.replace(`/sign-in`);
            }, 1500);
            
        } catch (error) {
            setVerificationStatus('error');
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || "Invalid verification code");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${
                        verificationStatus === 'success' 
                            ? 'bg-linear-to-r from-emerald-500 to-green-500' 
                            : verificationStatus === 'error'
                            ? 'bg-linear-to-r from-red-500 to-amber-500'
                            : 'bg-linear-to-r from-emerald-500 to-cyan-500'
                    }`}>
                        {verificationStatus === 'success' ? (
                            <CheckCircle className="h-8 w-8 text-white" />
                        ) : (
                            <Shield className="h-8 w-8 text-white" />
                        )}
                    </div>
                </div>
                
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        {verificationStatus === 'success' ? 'Verified!' : 'Verify Your Account'}
                    </h2>
                    <p className="mt-2 text-gray-400">
                        {verificationStatus === 'success' 
                            ? 'Your account is now verified!'
                            : `Enter the 6-digit code sent to your email`
                        }
                    </p>
                    
                    {verificationStatus !== 'success' && (
                        <div className="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-emerald-900/30 border border-emerald-800/50">
                            <Mail className="h-4 w-4 text-emerald-400 mr-2" />
                            <span className="text-sm text-emerald-300">Verifying: @{params.username}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800/50 backdrop-blur-sm py-8 px-4 shadow-xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-gray-700">
                    {verificationStatus === 'success' ? (
                        <div className="text-center py-8">
                            <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-12 w-12 text-emerald-400 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Account Verified!</h3>
                            <p className="text-gray-300 mb-6">
                                Your account has been successfully verified. You can now sign in.
                            </p>
                            <div className="animate-pulse text-sm text-emerald-400">
                                Redirecting to sign in...
                            </div>
                        </div>
                    ) : (
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        name="verifyCode"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200 flex items-center">
                                                    <Key className="h-4 w-4 mr-2" />
                                                    Verification Code
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={6}
                                                            placeholder="000000"
                                                            className="bg-gray-900/50 border-gray-700 text-white text-center text-2xl tracking-widest font-mono placeholder:text-gray-600 focus:border-emerald-500 focus:ring-emerald-500/20 h-16"
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                field.onChange(value);
                                                            }}
                                                        />
                                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                                    </div>
                                                </FormControl>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Enter the 6-digit code from your email
                                                </p>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Code Input Tips */}
                                    <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-700">
                                        <div className="flex items-start space-x-3">
                                            <Mail className="h-5 w-5 text-cyan-400 mt-0.5" />
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-gray-300">Check your email</p>
                                                <p className="text-xs text-gray-400">
                                                    We sent a 6-digit verification code to the email associated with @{params.username}.
                                                    The code expires in 15 minutes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-6 text-lg bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all duration-200"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Verifying...
                                                </>
                                            ) : (
                                                <>
                                                    Verify Account
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>

                            {/* Resend Code & Help */}
                            <div className="mt-8 space-y-4">
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">
                                        Didn't receive the code?{' '}
                                        <button
                                            type="button"
                                            onClick={() => toast.info("Resend functionality coming soon")}
                                            className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors font-medium"
                                        >
                                            Resend code
                                        </button>
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-700 text-center">
                                    <p className="text-sm text-gray-500">
                                        Having trouble?{' '}
                                        <Link 
                                            href="/help" 
                                            className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                                        >
                                            Get help
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Security Note */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <Shield className="h-4 w-4" />
                            <span>Verification ensures your account security</span>
                        </div>
                    </div>
                </div>

                {/* Back to Sign Up */}
                {verificationStatus !== 'success' && (
                    <div className="mt-6 text-center">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/sign-up')}
                            className="text-gray-400 hover:text-white"
                        >
                            ← Back to Sign Up
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page;