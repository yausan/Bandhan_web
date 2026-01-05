import { UserService } from "../services/user.service";
import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
import z from "zod";
let userService = new UserService();
export class AuthController {
    async register(req, res) {
        try {
            const parsedData = CreateUserDTO.safeParse(req.body); // validate request body
            if (!parsedData.success) { // validation failed
                return res.status(400).json({ success: false, message: z.prettifyError(parsedData.error) });
            }
            const userData = parsedData.data;
            const newUser = await userService.createUser(userData);
            return res.status(201).json({ success: true, message: "User Created", data: newUser });
        }
        catch (error) { // exception handling
            return res.status(error.statusCode ?? 500).json({ success: false, message: error.message || "Internal Server Error" });
        }
    }
    async login(req, res) {
        try {
            const parsedData = LoginUserDTO.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json({ success: false, message: z.prettifyError(parsedData.error) });
            }
            const loginData = parsedData.data;
            const { token, user } = await userService.loginUser(loginData);
            return res.status(200).json({ success: true, message: "Login successful", data: user, token });
        }
        catch (error) {
            return res.status(error.statusCode ?? 500).json({ success: false, message: error.message || "Internal Server Error" });
        }
    }
}
//# sourceMappingURL=auth.controller.js.map