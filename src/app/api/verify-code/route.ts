import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();

        const parsed = verifySchema.safeParse({
            verifyCode: body.verifyCode,
        });

        if (!parsed.success) {
            return Response.json({
                success: false,
                message: "Validation failed",
                errors: parsed.error.format()
            }, { status: 400 });
        }

        const username = decodeURIComponent(body.username);
        const { verifyCode } = parsed.data;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const isCodeValid = user.verifyCode === verifyCode;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json({
                success: true,
                message: 'Account verified successfully',
            }, { status: 200 });
        }

        if (!isCodeValid) {
            return Response.json(
                { success: false, message: 'Incorrect verification code' },
                { status: 400 }
            );
        }

        return Response.json(
            { success: false, message: 'Verification code has expired. Please sign up again to get a new code.' },
            { status: 400 }
        );

    } catch (error) {
        console.error("Error verifying code:", error);
        return Response.json({
            success: false,
            message: "Error verifying code.",
        }, { status: 500 });
    }
}
