import z from "zod";
export declare const UserSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>>;
}, z.core.$strip>;
export type UserType = z.infer<typeof UserSchema>;
//# sourceMappingURL=user.type.d.ts.map