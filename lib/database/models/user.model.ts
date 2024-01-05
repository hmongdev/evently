import { Schema, model, models } from 'mongoose';

// 1. create a UserSchema
// 2. import `Schema` from mongoose
const UserSchema = new Schema({
	// 3. include props for our user
	// clerkId is needed to conn between clerk and mongodb
	clerkId: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	photo: { type: String, required: true },
});

// 4. create User that is based off our schema
// 5. export User model
export const User = models.User || model('User', UserSchema);
