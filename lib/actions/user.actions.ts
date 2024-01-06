'use server';

// 1. import connectToDatabase and CreateUserParams
import { CreateUserParams } from '@/types';
import { connectToDatabase } from '../database';
import { User } from '../database/models/user.model';
import { handleError } from '../utils';

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
