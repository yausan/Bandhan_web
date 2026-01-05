import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
export declare class UserService {
    createUser(data: CreateUserDTO): Promise<import("../models/user.model").IUser>;
    loginUser(data: LoginUserDTO): Promise<{
        token: string;
        user: import("../models/user.model").IUser;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map