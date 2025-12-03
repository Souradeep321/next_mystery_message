// 'use client';

// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Mail, X } from 'lucide-react';
// import {
//     Card,
//     CardAction,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Message } from '@/model/User';
// import { toast } from 'sonner'
// import axios from 'axios';
// import { ApiResponse } from '@/types/ApiResponse';

// type MessageCardProps = {
//     message: Message,
//     onMessageDelete: (messageId: string) => void
// }

// const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
//     const handleDeleteConfirm = async () => {
//         // Handle delete confirmation logic here
//         console.log('Delete confirmed');
//         const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
//         toast.success(response.data.message)
//         onMessageDelete(String(message._id));
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Card Title</CardTitle>
//                 <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                         <Button variant="destructive"><X className='w-5 h-5' /></Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                         <AlertDialogHeader>
//                             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                             <AlertDialogDescription>
//                                 This action cannot be undone. This will permanently delete your
//                                 account and remove your data from our servers.
//                             </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
//                         </AlertDialogFooter>
//                     </AlertDialogContent>
//                 </AlertDialog>
//                 <CardDescription>{message.content}</CardDescription>
//             </CardHeader>
//             <CardContent>
//             </CardContent>
//         </Card>
//     )
// }

// export default MessageCard


// 'use client';

// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Trash2 } from 'lucide-react';
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card";

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// import { Message } from '@/model/User';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { ApiResponse } from '@/types/ApiResponse';

// type MessageCardProps = {
//     message: Message,
//     onMessageDelete: (messageId: string) => void
// };

// const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
//     const handleDeleteConfirm = async () => {
//         const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
//         toast.success(response.data.message);
//         onMessageDelete(String(message._id));
//     };

//     return (
//         <Card className="relative shadow-sm">
//             <CardHeader className="pb-2">
//                 <div className="flex items-start justify-between">
//                     <CardTitle className="text-base font-semibold">
//                         New Message
//                     </CardTitle>

//                     {/* Small trash icon */}
//                     <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="h-8 w-8 text-red-500 hover:text-red-600"
//                             >
//                                 <Trash2 className="h-4 w-4" />
//                             </Button>
//                         </AlertDialogTrigger>

//                         <AlertDialogContent>
//                             <AlertDialogHeader>
//                                 <AlertDialogTitle>
//                                     Delete this message?
//                                 </AlertDialogTitle>
//                                 <AlertDialogDescription>
//                                     This action cannot be undone.  
//                                     The message will be removed permanently.
//                                 </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                 <AlertDialogAction
//                                     onClick={handleDeleteConfirm}
//                                     className="bg-red-600 hover:bg-red-700"
//                                 >
//                                     Delete
//                                 </AlertDialogAction>
//                             </AlertDialogFooter>
//                         </AlertDialogContent>
//                     </AlertDialog>
//                 </div>

//                 <CardDescription className="text-sm text-muted-foreground">
//                     {new Date(message.createdAt).toLocaleString('en-US', {
//                         dateStyle: 'medium',
//                         timeStyle: 'short',
//                     })}
//                 </CardDescription>
//             </CardHeader>

//             <CardContent>
//                 <p className="text-sm text-foreground">{message.content}</p>
//             </CardContent>
//         </Card>
//     );
// };

// export default MessageCard;


'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, X, Trash2, Calendar, User } from 'lucide-react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Message } from '@/model/User';
import { toast } from 'sonner'
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Badge } from '@/components/ui/badge';

type MessageCardProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
            toast.success(response.data.message)
            onMessageDelete(String(message._id));
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Failed to delete message');
        }
    };


    const formatDate = (date: string | Date) => {
        try {
            const d = typeof date === "string" ? new Date(date) : date;
            const now = new Date();
            const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));

            if (diffInHours < 1) return 'Just now';
            if (diffInHours < 24) return `${diffInHours}h ago`;
            if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
            return d.toLocaleDateString();
        } catch {
            return 'Recently';
        }
    };


    return (
        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            Anonymous Message
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(message.createdAt)}
                        </CardDescription>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Delete message</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                    <Trash2 className="w-5 h-5 text-destructive" />
                                    Delete Message
                                </AlertDialogTitle>
                                <AlertDialogDescription className="pt-2">
                                    This action cannot be undone. This will permanently delete this message
                                    and remove it from our servers. Are you sure you want to continue?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteConfirm}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Delete Message
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardHeader>

            <CardContent className="pt-0 pb-4">
                <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                        {message.content}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="pt-0 flex justify-between items-center">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>From Anonymous</span>
                </div>
                <Badge variant="outline" className="text-xs font-normal">
                    ID: {String(message._id).slice(-6)}
                </Badge>
            </CardFooter>
        </Card>
    )
}

export default MessageCard