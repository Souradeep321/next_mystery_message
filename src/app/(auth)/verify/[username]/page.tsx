'use client'

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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

const page = () => {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [isLoading, setIsLoading] = useState(false);

    if (!params.username) {
        return <p className="text-center mt-10">Invalid verification link</p>;
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
            const response = await axios.post<ApiResponse>('/api/verify-code', {
                username: params.username,
                verifyCode: data.verifyCode
            });

            toast.success(response.data.message || "Verification successful");
            router.replace(`/sign-in`);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || "Error verifying code");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Your Account
                    </h1>
                    <p className="mb-4">Enter the verification code sent to your email</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            name="verifyCode"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Verify"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default page;
