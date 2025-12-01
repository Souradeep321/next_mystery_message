import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

// getServerSession --> we can get the user from the session

// in case of express we used to make a middleware folder and write all the middleware functions there
// but in nextjs we can directly use getServerSession in the route file to get the user session
// and form there we can get the user details 


// toggle the isAcceptingMessages field for the logged-in user
export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    // const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user._id;
    const { acceptMessages } = await request.json();
    // acceptMessages is a boolean value

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        ) // first arg: filter, second arg: update, third arg: options;
        // it will give the updated document because of { new: true } option

        // If user not found
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Unable to find user to update message acceptance status"
            }, { status: 404 });
        }


        // Successfully updated message acceptance status
        return Response.json({
            success: true,
            message: "Message acceptance status updated successfully",
            isAcceptingMessages: updatedUser.isAcceptingMessages,
            updatedUser: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAcceptingMessages: updatedUser.isAcceptingMessages
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating message acceptance status', error);
        return Response.json({
            success: false,
            message: 'Error updating message acceptance status'
        }, { status: 500 });
    }
} 


// if user is logged in, return the isAcceptingMessages status
export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user._id;
    try {
        const foundUser = await UserModel.findById(userId).select('isAcceptingMessages');
        if (!foundUser) {
            return Response.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Return the user's message acceptance status
        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessages
        }, { status: 200 });

    } catch (error) {
        console.error('Error retrieving message acceptance status:', error);
        return Response.json(
            { success: false, message: 'Error retrieving message acceptance status' },
            { status: 500 }
        );
    }
}