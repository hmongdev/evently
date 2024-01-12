// this form will have events
'use client';

type EventFormProps = {
	userId: string;
	type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: EventFormProps) => {
	return (
		<div>
			UserId: {userId}, EventForm {type}
		</div>
	);
};

export default EventForm;
