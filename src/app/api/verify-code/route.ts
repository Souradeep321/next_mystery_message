import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const parsed = verifySchema.safeParse(body);

        if (!parsed.success) {
            return Response.json({
                success: false,
                message: "Validation failed",
                errors: parsed.error.format()
            }, { status: 400 });
        }

        const { username, verifyCode } = parsed.data;
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const isCodeValid = user.verifyCode === verifyCode;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            // Update the user's verification status
            user.isVerified = true;
            await user.save();

            return Response.json({
                success: true,
                message: 'Account verified successfully',
            }, { status: 200 });
        }
        else if (!isCodeValid) {
            // Code has expired
            return Response.json(
                { success: false, message: 'Verification code has expired. Please sign up again to get a new code.' },
                { status: 400 }
            );
        }
        else {
            // Code is incorrect
            return Response.json(
                { success: false, message: 'Incorrect verification code' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("Error verifying code:", error);
        return Response.json({
            success: false,
            message: "Error verifying code.",
        }, { status: 500 });
    }
}