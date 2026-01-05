import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, {
    timestamps: true, // auto createdAt and updatedAt
});
export const UserModel = mongoose.model('User', UserSchema);
// UserModel is the mongoose model for User collection
// db.users in MongoDB
//# sourceMappingURL=user.model.js.map