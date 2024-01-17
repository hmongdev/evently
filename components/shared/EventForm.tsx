// this form will have keyboard/tap events so 'use client' is required
'use client';

// 1. import zodResolver, useForm, z
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// 9. datepicker
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
import { createEvent } from '@/lib/actions/event.actions';
import { IEvent } from '@/lib/database/models/event.model';
import { useUploadThing } from '@/lib/uploadthing';
import { eventFormSchema } from '@/lib/validator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import Dropdown from './Dropdown';
import { FileUploader } from './FileUploader';

type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
	const router = useRouter();
	// 8. useState for files
	const [files, setFiles] = useState<File[]>([]);
	// 7. import `eventDefaultValues` from constants/index.ts
	const initialValues = eventDefaultValues;
	// 9. import from uploadthing.ts
	const { startUpload } = useUploadThing('imageUploader');

	// 3. define form
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		// 8. set default values
		defaultValues: initialValues,
	});

	// 4. Define a submit handler.
	async function onSubmit(values: z.infer<typeof eventFormSchema>) {
		let uploadedImageUrl = values.imageUrl;

		if (files.length > 0) {
			// get uploaded images
			const uploadedImages = await startUpload(files);

			// check if uploaded images exist
			if (!uploadedImages) {
				return;
			}
			// else get image url
			uploadedImageUrl = uploadedImages[0].url;
		}

		//! Create New Event
		if (type === 'Create') {
			try {
				const newEvent = await createEvent({
					event: { ...values, imageUrl: uploadedImageUrl },
					userId,
					path: '/profile'
				});

				if (newEvent) {
					form.reset();
					router.push(`/events/${newEvent._id}`);
				}
			} catch (error) {
				console.log(error);
			}
		}
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
				{/* Location field */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/location-grey.svg"
											alt="calendar"
											width={
												24
											}
											height={
												24
											}
										/>

										<Input
											placeholder="Event location or Online"
											{...field}
											className="input-field"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{/* Start / End Date */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="startDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calendar"
											width={
												24
											}
											height={
												24
											}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-grey-600">
											Start
											Date:
										</p>
										<DatePicker
											selected={
												field.value
											}
											onChange={(
												date: Date
											) =>
												field.onChange(
													date
												)
											}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* End Date Time */}
					<FormField
						control={form.control}
						name="endDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calendar"
											width={
												24
											}
											height={
												24
											}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-grey-600">
											End
											Date:
										</p>
										<DatePicker
											selected={
												field.value
											}
											onChange={(
												date: Date
											) =>
												field.onChange(
													date
												)
											}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Price, Checkbox, URL */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/dollar.svg"
											alt="dollar"
											width={
												24
											}
											height={
												24
											}
											className="filter-grey"
										/>
										<Input
											type="number"
											placeholder="Price"
											{...field}
											className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
										/>
										<FormField
											control={
												form.control
											}
											name="isFree"
											render={({
												field,
											}) => (
												<FormItem>
													<FormControl>
														<div className="flex items-center">
															<label
																htmlFor="isFree"
																className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
																Free
																Ticket
															</label>
															<Checkbox
																// onCheckedChange + checked
																// required for checkbox to be true
																onCheckedChange={
																	field.onChange
																}
																checked={
																	field.value
																}
																id="isFree"
																className="mr-2 h-5 w-5 border-2 border-primary-500"
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/link.svg"
											alt="link"
											width={
												24
											}
											height={
												24
											}
										/>

										<Input
											placeholder="URL"
											{...field}
											className="input-field"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					size="lg"
					disabled={form.formState.isSubmitting}
					className="button col-span-2 w-full">
					{form.formState.isSubmitting
						? 'Submitting...'
						: `${type} Event `}
				</Button>
			</form>
		</Form>
	);
};

export default EventForm;
