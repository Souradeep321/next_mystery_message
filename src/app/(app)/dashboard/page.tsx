// 'use client'

// import { Message } from "@/model/User"
// import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
// import { ApiResponse } from "@/types/ApiResponse";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios, { AxiosError } from "axios";
// import { useSession } from "next-auth/react";
// import { useCallback, useEffect, useRef, useState } from "react"
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod"

// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Loader2, RefreshCcw } from 'lucide-react';
// import MessageCard from "@/components/MessageCard";
// import { User } from "next-auth";


// const page = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);


//   const copyRef = useRef<HTMLInputElement>(null);

//   // Function to handle message deletion it will remove the message from the state (optimistic update)
//   const handleDeleteMessage = async (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId));
//   }

//   const { data: session } = useSession();

//   const form = useForm<z.infer<typeof acceptMessageSchema>>({
//     resolver: zodResolver(acceptMessageSchema),
//   })

//   const { register, watch, setValue } = form;

//   const acceptMessages = watch('acceptMessages');

//   const fetchAcceptMessage = useCallback(async () => {
//     setIsSwitchLoading(true);
//     try {
//       const response = await axios.get<ApiResponse>('/api/accept-messages');
//       setValue(
//         "acceptMessages",
//         response.data.isAcceptingMessages ?? false
//       );
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error(axiosError.response?.data.message || "Error accepting messages");
//     } finally {
//       setIsSwitchLoading(false);
//     }
//   }, [setValue, acceptMessages])

//   const fetchMessages = useCallback(async (refresh: boolean = false) => {
//     setIsLoading(true);
//     setIsSwitchLoading(false);
//     try {
//       const response = await axios.get<ApiResponse>('/api/get-messages');

//       if (response.data.success) {
//         setMessages(response.data.messages || []);
//       }

//       if (refresh) {
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error(axiosError.response?.data.message || "Error retrieving messages");
//     } finally {
//       setIsLoading(false);
//       setIsSwitchLoading(false);
//     }
//   }, [setIsLoading, setMessages]);

//   useEffect(() => {
//     if (!session || !session.user) return;
//     fetchMessages();
//     fetchAcceptMessage();
//   }, [session, setValue, fetchAcceptMessage, fetchMessages])

//   // handle switch change
//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post<ApiResponse>('/api/accept-messages',
//         { acceptMessages: !acceptMessages }
//       );
//       setValue("acceptMessages", !acceptMessages);
//       toast.success(response.data.message);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error(axiosError.response?.data.message || "Error accepting messages");
//     }
//   }

//   // const username = session?.user && (session.user as User).username;
//   // // TODO: do more research on how to get the base url
//   // const baseUrl = `${window.location.protocol}//${window.location.host}`
//   // const profileUrl = `${baseUrl}/u/${username}`

//   const [profileUrl, setProfileUrl] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined" && session?.user) {
//       const username = (session.user as User).username;
//       const baseUrl = `${window.location.protocol}//${window.location.host}`;
//       setProfileUrl(`${baseUrl}/u/${username}`);
//     }
//   }, [session]);


//   const copyToClipboard = async () => {
//     copyRef.current?.select(); 

//     await navigator.clipboard.writeText(profileUrl);
//     toast.success("Copied!");

//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };


//   if (!session || !session.user) {
//     return (
//       <div>
//         <p>Please sign in</p>
//       </div>
//     )
//   }

//   return (
//     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//       <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={profileUrl}
//             disabled
//             ref={copyRef}
//             className="input input-bordered w-full p-2 mr-2"
//           />
//           <Button onClick={copyToClipboard}>{isCopied ? 'Copied' : 'Copy'}</Button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <Switch
//           {...register('acceptMessages')}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//         />
//         <span className="ml-2">
//           Accept Messages: {acceptMessages ? 'On' : 'Off'}
//         </span>
//       </div>
//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <MessageCard
//               key={String(message._id)}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           ))
//         ) : (
//           <p>No messages to display.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default page

'use client'

import { Message } from "@/model/User"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod"

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, RefreshCcw, Copy, Check, Link, MessageSquare, Bell, EyeOff, Globe, Shield, Mail, User, Calendar, Sparkles } from 'lucide-react';
import MessageCard from "@/components/MessageCard";
import { User as NextAuthUser } from "next-auth";


const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [stats, setStats] = useState({
    totalMessages: 0,
    thisMonth: 0,
    anonymousPercentage: 0
  });

  const copyRef = useRef<HTMLInputElement>(null);

  // Function to handle message deletion
  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
    toast.success("Message deleted");
  }

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
  })

  const { register, watch, setValue } = form;

  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue(
        "acceptMessages",
        response.data.isAcceptingMessages ?? false
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Error accepting messages");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');

      if (response.data.success) {
        const fetchedMessages = response.data.messages || [];
        setMessages(fetchedMessages);
        
        // Calculate stats
        const totalMessages = fetchedMessages.length;
        const thisMonth = fetchedMessages.filter(msg => {
          const msgDate = new Date(msg.createdAt);
          const now = new Date();
          return msgDate.getMonth() === now.getMonth() && msgDate.getFullYear() === now.getFullYear();
        }).length;
        
        setStats({
          totalMessages,
          thisMonth,
          anonymousPercentage: totalMessages > 0 ? 100 : 0 // All messages are anonymous in your platform
        });
      }

      if (refresh) {
        toast.success("Messages refreshed!");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Error retrieving messages");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
    
    // Set profile URL
    const username = (session.user as NextAuthUser).username;
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    setProfileUrl(`${baseUrl}/u/${username}`);
  }, [session, fetchAcceptMessage, fetchMessages])

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages',
        { acceptMessages: !acceptMessages }
      );
      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Error updating settings");
    }
  }

  const copyToClipboard = async () => {
    if (!profileUrl) return;
    
    copyRef.current?.select();
    await navigator.clipboard.writeText(profileUrl);
    
    setIsCopied(true);
    toast.success("Profile link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Please Sign In</h2>
          <p className="text-gray-400 mb-6">You need to be signed in to view your dashboard</p>
          <Button 
            className="bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
            onClick={() => window.location.href = '/sign-in'}
          >
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  const username = (session.user as NextAuthUser).username;
  const email = session.user.email;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-900/30 to-cyan-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="h-16 w-16 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {username}!</h1>
                <p className="text-gray-400 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                className="border-gray-700 hover:bg-gray-800 hover:border-emerald-500/50"
              >
                <Globe className="h-4 w-4 mr-2" />
                View Public Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Controls */}
          <div className="lg:col-span-1 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Messages</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalMessages}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">This Month</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.thisMonth}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Anonymous Messages</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.anonymousPercentage}%</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <EyeOff className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Link Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Link className="h-5 w-5 text-emerald-400 mr-2" />
                  <h3 className="text-lg font-semibold">Your Profile Link</h3>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                  Share this link
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={profileUrl}
                    ref={copyRef}
                    readOnly
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3 px-4 text-sm text-gray-300 pr-32 focus:outline-none focus:border-emerald-500"
                  />
                  <Button
                    onClick={copyToClipboard}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>All messages sent to this link are 100% anonymous</span>
                </div>
              </div>
            </div>

            {/* Message Settings Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-cyan-400 mr-2" />
                  <h3 className="text-lg font-semibold">Message Settings</h3>
                </div>
                {isSwitchLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                ) : null}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Accept New Messages</p>
                    <p className="text-sm text-gray-400">Allow people to send you messages</p>
                  </div>
                  <Switch
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
                
                <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-700">
                  <div className="flex items-center text-sm">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium">Status: {acceptMessages ? "Active" : "Paused"}</p>
                      <p className="text-gray-400 text-xs">
                        {acceptMessages 
                          ? "People can send you messages" 
                          : "Messages are temporarily paused"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Messages */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Your Messages</h3>
                  <p className="text-gray-400 mt-1">Anonymous messages from your community</p>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    onClick={() => fetchMessages(true)}
                    disabled={isLoading}
                    className="border-gray-700 hover:bg-gray-800 hover:border-emerald-500/50"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="h-4 w-4" />
                    )}
                    <span className="ml-2">Refresh</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800 hover:border-emerald-500/50"
                  >
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Messages Grid */}
              {messages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {messages.map((message) => (
                    <MessageCard
                      key={String(message._id)}
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex h-20 w-20 rounded-full bg-gray-900/50 items-center justify-center mb-6 border border-gray-700">
                    <MessageSquare className="h-10 w-10 text-gray-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">No messages yet</h4>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Share your profile link to start receiving anonymous messages from your community
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={copyToClipboard}
                      className="bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Copy Profile Link
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={() => window.open(profileUrl, '_blank')}
                    >
                      Preview Your Profile
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages Stats */}
              {messages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">
                      Showing {messages.length} message{messages.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-gray-400 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      All messages are anonymous
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Section */}
            {messages.length > 0 && (
              <div className="mt-8 p-6 bg-linear-to-r from-emerald-900/20 to-cyan-900/20 rounded-2xl border border-emerald-800/30">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Pro Tip: Grow Your Messages</h4>
                    <p className="text-gray-300 mb-3">
                      Share your profile link on social media, in your email signature, or with friends to receive more honest feedback.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700">
                        Social Media
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700">
                        Email Signature
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700">
                        Personal Website
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700">
                        Community Forums
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page