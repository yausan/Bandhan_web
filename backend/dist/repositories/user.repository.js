import { UserModel } from "../models/user.model";
// MongoDb Implementation of UserRepository
export class UserRepository {
    async createUser(userData) {
        const user = new UserModel(userData);
        return await user.save();
    }
    async getUserByEmail(email) {
        const user = await UserModel.findOne({ "email": email });
        return user;
    }
    async getUserByUsername(username) {
        const user = await UserModel.findOne({ "username": username });
        return user;
    }
    async getUserById(id) {
        // UserModel.findOne({ "_id": id });
        const user = await UserModel.findById(id);
        return user;
    }
    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
    async updateUser(id, updateData) {
        // UserModel.updateOne({ _id: id }, { $set: updateData });
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true } // return the updated document
        );
        return updatedUser;
    }
    async deleteUser(id) {
        // UserModel.deleteOne({ _id: id });
        const result = await UserModel.findByIdAndDelete(id);
        return result ? true : false;
    }
}
//# sourceMappingURL=user.repository.js.map