import * as z from "zod";
import { usernameValidation } from "./signUpSchema";

export const verifySchema = z.object({
    username: usernameValidation,
    verifyCode: z.string().length(6, 'Verification code must be 6 characters long'),
});