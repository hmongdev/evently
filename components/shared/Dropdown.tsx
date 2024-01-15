// 2. import select from shadcn
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { ICategory } from '@/lib/database/models/category.model';
import { useState } from 'react';
import { Input } from '../ui/input';

// 4. define dropdownprops
type DropdownProps = {
	value?: string;
	onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
	// 4. create state for dropdown options
	const [categories, setCategories] = useState<ICategory[]>([]);
	// 7. create state for NEW category
	const [newCategory, setNewCategory] = useState('');

	// 8. function that adds category to DB
	const handleAddCategory = () => {
		createCategory({
			categoryName: newCategory.trim(),
		}).then((category) => {
			setCategories((prevState) => [...prevState, category]);
		});
	};

	return (
		// 3. copy and paste select component
		<Select onValueChange={onChangeHandler} defaultValue={value}>
			<SelectTrigger className="select-field">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				{/* dropdown options */}
				{/* 5. check if options exist => map over options */}
				{categories.length > 0 &&
					categories.map((category) => (
						<SelectItem
							key={category._id}
							value={category._id}
							className="select-item p-regular-14">
							{category.name}
						</SelectItem>
					))}
				{/* 6. alert dialog */}
				<AlertDialog>
					<AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
						Add new category
					</AlertDialogTrigger>
					<AlertDialogContent className="bg-white">
						<AlertDialogHeader>
							<AlertDialogTitle>
								New Category
							</AlertDialogTitle>
							<AlertDialogDescription>
								<Input
									type="text"
									placeholder="Category name"
									className="input-field mt-3"
									onChange={(
										e
									) =>
										setNewCategory(
											e
												.target
												.value
										)
									}
								/>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={() =>
									startTransition(
										handleAddCategory
									)
								}>
								Add
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SelectContent>
		</Select>
	);
};

export default Dropdown;
