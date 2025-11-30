import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    const messageId = params.messageid;
    await dbConnect();
    const session = await getServerSession(authOptions);
    // const user: User = session?.user ;

    if (!session || !session.user) {
        return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }


    try {
        const updatedResult = await UserModel.updateOne(
            { _id: session.user._id },
            { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageId) } } }
        );

        if (updatedResult.modifiedCount === 0) {
            return Response.json({ success: false, message: "Message not found or already deleted" }, { status: 404 });
        }

        return Response.json({ success: true, message: "Message deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting message:", error);
        return Response.json({ success: false, message: "Error deleting message" }, { status: 500 });
    }
}