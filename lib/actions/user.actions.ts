'use server';

// 1. import connectToDatabase and CreateUserParams
import { CreateUserParams, UpdateUserParams } from '@/types';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../database';
import Event from '../database/models/event.model';
import Order from '../database/models/order.model';
import User from '../database/models/user.model';
import { handleError } from '../utils';

//! CREATE USER
// 2. export and define `createUser` function
// 3. define type `CreateUserParams`
export const createUser = async (user: CreateUserParams) => {
	try {
		// 5. await conn to MDB
		await connectToDatabase();
		// 6. create the new User
		const newUser = await User.create(user);
		// 7. return the user in a JSON
		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		// 4. import handleError function
		handleError(error);
	}
};

//! GET USER BY ID
export async function getUserById(userId: string) {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user) throw new Error('User not found');
		return JSON.parse(JSON.stringify(user));
	} catch (error) {
		handleError(error);
	}
}

//! UPDATE USER
export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
	try {
		// 1. conn to DB
		await connectToDatabase();
		// 2. update User
		const updatedUser = await User.findOneAndUpdate(
			{ clerkId },
			user,
			{ new: true }
		);
		// 3. check if user NOT updated
		if (!updatedUser) {
			throw new Error('User update failed');
		} else {
			// 4. return updatedUser
			return JSON.parse(JSON.stringify(updatedUser));
		}
	} catch (error) {
		handleError(error);
	}
};

//! DELETE USER
export const deleteUser = async (clerkId: string) => {
	try {
		// 1. conn to DB
		await connectToDatabase();
		// 2. find User to delete
		const userToDelete = await User.findOne({ clerkId });
		// 3. check if User is already deleted
		if (!userToDelete) {
			throw new Error('User not found');
		} else {
			// 4. Unlink relationships
			await Promise.all([
				// Update the 'events' collection to remove references to the user
				Event.updateMany(
					{ _id: { $in: userToDelete.events } },
					{
						$pull: {
							organizer: userToDelete._id,
						},
					}
				),

				// Update the 'orders' collection to remove references to the user
				Order.updateMany(
					{ _id: { $in: userToDelete.orders } },
					{ $unset: { buyer: 1 } }
				),
			]);
		}
		// 5. delete user
		const deletedUser = await User.findByIdAndDelete(
			userToDelete._id
		);
		revalidatePath('/');

		return deletedUser
			? JSON.parse(JSON.stringify(deletedUser))
			: null;
		await connectToDatabase();
	} catch (error) {}
};