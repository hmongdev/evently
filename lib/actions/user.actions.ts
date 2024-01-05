'use server';
// 1. import connectToDatabase from database/index.ts
import { connectToDatabase } from '../database';

// 2. export and define `createUser` function
// 3. define type `CreateUserParams`
export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();
	} catch {}
};
