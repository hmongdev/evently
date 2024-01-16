// this form will have keyboard/tap events so 'use client' is required
'use client';

// 1. import zodResolver, useForm, z
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// 5. import Form... components
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { eventDefaultValues } from '@/constants';
import { eventFormSchema } from '@/lib/validator';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import Dropdown from './Dropdown';
import { FileUploader } from './FileUploader';

type EventFormProps = {
	userId: string;
	type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: EventFormProps) => {
	// 8. useState for files
	const [files, setFiles] = useState<File[]>([]);
	// 7. import `eventDefaultValues` from constants/index.ts
	const initialValues = eventDefaultValues;

	// 3. define form
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		// 8. set default values
		defaultValues: initialValues,
	});

	// 4. Define a submit handler.
	function onSubmit(values: z.infer<typeof eventFormSchema>) {
		console.log(values);
	}
	// 6. Return <Form />
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5">
				{/* Event Title */}
				<div className="flex flex-col gap-5 lg:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Event Title"
										className="input-field"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Dropdown */}
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Dropdown
										onChangeHandler={
											field.onChange
										}
										value={
											field.value
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Description + Image */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<Textarea
										placeholder="Description"
										{...field}
										className="textarea rounded-2xl"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Image */}
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<FileUploader
										onFieldChange={
											field.onChange
										}
										imageUrl={
											field.value
										}
										setFiles={
											setFiles
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default EventForm;
