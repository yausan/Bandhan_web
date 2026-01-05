import z from "zod";
export declare const CreateUserDTO: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
export declare const LoginUserDTO: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginUserDTO = z.infer<typeof LoginUserDTO>;
//# sourceMappingURL=user.dto.d.ts.map