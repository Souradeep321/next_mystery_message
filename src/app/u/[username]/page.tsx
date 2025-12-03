'use client'

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schemas/messageSchema";
import { toast } from "sonner";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, Sparkles, Copy, Check, Zap, MessageSquare, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

// Split initial messages by pipes
const initialMessages = "What's a skill you'd love to learn?||If you could instantly travel anywhere in the world right now, where would you go?||What's a simple pleasure that always brightens your day?";

const page = () => {
  const params = useParams<{ username: string }>();
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [isMessageSuggesting, setIsMessageSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [streamedText, setStreamedText] = useState("");
  const [streamingComplete, setStreamingComplete] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const streamEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when streaming
  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamedText]);

  // Initialize with initial messages
  useEffect(() => {
    const initialSuggestions = initialMessages.split("||");
    setSuggestions(initialSuggestions);
  }, []);

  if (!params.username) {
    return <p className="text-center mt-10">This user does not exist</p>;
  }

  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const contentLength = form.watch("content")?.length || 0;
  const isContentTooShort = contentLength > 0 && contentLength < 10;

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    if (data.content.length < 10) {
      form.setError("content", {
        type: "manual",
        message: "Message must be at least 10 characters long"
      });
      return;
    }

    setIsMessageSending(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: data.content,
      });

      toast.success(response.data.message);
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Error sending message");
    } finally {
      setIsMessageSending(false);
    }
  };

  const fetchSuggestions = async () => {
    setIsMessageSuggesting(true);
    setStreamedText("");
    setStreamingComplete(false);
    setSuggestions([]); // Clear previous suggestions

    try {
      const response = await fetch("/api/suggest-messages", {
        method: "POST",
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to fetch suggestions");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setStreamingComplete(true);

          // Parse final suggestions
          const finalSuggestions = accumulatedText.split("||").filter(s => s.trim());
          setSuggestions(finalSuggestions);
          toast.success("Suggestions generated!");
          break;
        }

        // Decode chunk
        const chunk = decoder.decode(value);
        accumulatedText += chunk;

        // Update streamed text with smooth animation
        setStreamedText(accumulatedText);

        // Optionally update suggestions in real-time
        const partialSuggestions = accumulatedText.split("||").filter(s => s.trim());
        setSuggestions(partialSuggestions);
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate suggestions");
      // Fallback to initial messages
      const initialSuggestions = initialMessages.split("||");
      setSuggestions(initialSuggestions);
    } finally {
      setIsMessageSuggesting(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("content", suggestion);
    // Focus the input field
    const input = document.querySelector('input[name="content"]') as HTMLInputElement;
    if (input) input.focus();
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header - Neon Green/Purple */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 mb-4 shadow-lg shadow-emerald-500/30">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent mb-2">
            Send a Message
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Share your thoughts with <span className="font-semibold text-emerald-600 dark:text-emerald-400">@{username}</span>
          </p>
        </div>

        <div className="space-y-8">
          {/* Message Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Your Message
                        </label>
                        <div className="flex items-center space-x-2">
                          {/* Character count with warning */}
                          <span className={`text-xs font-medium ${contentLength === 0
                            ? "text-gray-500"
                            : contentLength < 10
                              ? "text-red-500"
                              : contentLength < 30
                                ? "text-amber-500"
                                : "text-emerald-500"
                            }`}>
                            {contentLength}/500
                          </span>
                          {isContentTooShort && (
                            <span className="text-xs text-red-500 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Min 10 chars
                            </span>
                          )}
                        </div>

                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Write your message here..."
                            {...field}
                            disabled={isMessageSending}
                            className="min-h-[100px] py-4 px-4 text-lg rounded-xl border-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all resize-none"
                            maxLength={500}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isMessageSending || !form.watch("content")}
                    className="px-8 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all duration-200"
                  >
                    {isMessageSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Suggestions Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    AI Suggestions
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click any suggestion to use it in your message
                  </p>
                </div>
              </div>
              <Button
                onClick={fetchSuggestions}
                disabled={isMessageSuggesting}
                className="rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all"
              >
                {isMessageSuggesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    New Suggestions
                  </>
                )}
              </Button>
            </div>

            <Separator className="bg-gray-300 dark:bg-gray-700" />

            {/* Streaming Animation - Neon Green Theme */}
            {isMessageSuggesting && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start space-x-4">
                  {/* AI Avatar */}
                  <div className="shrink-0">
                    <div className="h-10 w-10 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Streaming Content */}
                  <div className="flex-1 space-y-3">
                    {/* Typing Indicator - Green dots */}
                    <div className="flex items-center space-x-1.5">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500"></div>
                      <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500 delay-150"></div>
                      <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500 delay-300"></div>
                    </div>

                    {/* Streaming Text */}
                    <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {streamedText.split("||").map((part, index, array) => (
                        <div key={index} className="mb-4 last:mb-0">
                          {part}
                          {index < array.length - 1 && (
                            <div className="inline-flex items-center mx-3">
                              <span className="text-emerald-400 mx-1 animate-pulse">•</span>
                              <span className="text-cyan-400 mx-1 animate-pulse delay-150">•</span>
                              <span className="text-emerald-400 mx-1 animate-pulse delay-300">•</span>
                            </div>
                          )}
                        </div>
                      ))}
                      {/* Blinking cursor - Neon green */}
                      {!streamingComplete && (
                        <span className="inline-block h-5 w-0.5 bg-emerald-400 ml-1 animate-pulse shadow-sm shadow-emerald-400"></span>
                      )}
                    </div>

                    {/* Progress bar - linear green */}
                    {!streamingComplete && streamedText && (
                      <div className="pt-2">
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-300 shadow-sm shadow-emerald-500/50"
                            style={{
                              width: `${Math.min((streamedText.length / 300) * 100, 95)}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div ref={streamEndRef} />
              </div>
            )}

            {/* Suggestions Grid - Neon Green Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group relative bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                >
                  {/* Decorative corner - Neon linear */}
                  <div className="absolute top-0 right-0 h-12 w-12 bg-linear-to-br from-emerald-500/20 to-cyan-500/20 rounded-bl-2xl rounded-tr-xl"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Index badge - Neon linear */}
                    <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold mb-3 shadow-sm shadow-emerald-500/50">
                      {index + 1}
                    </div>

                    {/* Suggestion text */}
                    <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-4">
                      {suggestion}
                    </p>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={() => handleSuggestionClick(suggestion)}
                        variant="ghost"
                        size="sm"
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      >
                        Use this
                      </Button>

                      <Button
                        onClick={() => copyToClipboard(suggestion, index)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* After the suggestions grid */}
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 p-4 bg-linear-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                  Want to receive messages like this?
                </p>
                <Link href="/">
                  <Button
                    size="sm"
                    className="ml-4 bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white"
                  >
                    Get Your Link
                  </Button>
                </Link>
              </div>
            </div>

            {/* Empty State - Neon theme */}
            {suggestions.length === 0 && !isMessageSuggesting && (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="inline-flex h-20 w-20 rounded-full bg-linear-to-r from-emerald-500/20 to-cyan-500/20 items-center justify-center mb-6 shadow-inner shadow-emerald-500/10">
                  <Zap className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  No suggestions yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Generate AI-powered message suggestions to get inspired
                </p>
                <Button
                  onClick={fetchSuggestions}
                  className="rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg shadow-emerald-500/30"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Suggestions
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

