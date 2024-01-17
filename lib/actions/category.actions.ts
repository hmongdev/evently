'use server';

import { CreateCategoryParams } from '@/types';
import { connectToDatabase } from '../database';
import Category from '../database/models/category.model';
import { handleError } from '../utils';

//! CREATE CATEGORY
export const createCategory = async ({
	categoryName,
}: CreateCategoryParams) => {
	try {
		// 1. conn to DB
		await connectToDatabase();
		// 2. store new category
		const newCategory = await Category.create({
			name: categoryName,
		});
		// 3. return new category
		return JSON.parse(JSON.stringify(newCategory));
	} catch (error) {
		handleError(error);
	}
};

//! GET ALL CATEGORY
export const getAllCategories = async () => {
	try {
		// 1. conn to DB
		await connectToDatabase();
		// 2. store new category
		const allCategories = await Category.find();
		// 3. return all categories
		return JSON.parse(JSON.stringify(allCategories));
	} catch (error) {
		handleError(error);
	}
};
