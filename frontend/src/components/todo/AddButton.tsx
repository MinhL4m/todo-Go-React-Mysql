import React, { useState } from 'react';
import { Button, Collapse, Form, FormGroup, FormInput, Alert } from 'shards-react';

interface AddButtonProps {
	list: {
		id: number;
		title: string;
		description: string;
		done: boolean;
	}[];
	setList: React.Dispatch<
		React.SetStateAction<
			{
				id: number;
				title: string;
				description: string;
				done: boolean;
			}[]
		>
	>;
}

export const AddButton: React.FC<AddButtonProps> = ({ list, setList }) => {
	const [ collapse, setCollapse ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ error, setError ] = useState(false);
	const [ titleInvalid, setTitleInvalid ] = useState(false);
	const [ descriptionInvalid, setDescriptionInvalid ] = useState(false);

	const onClick = async (e: Event) => {
		e.preventDefault();

		if (title === '' || description === '') {
			setTitleInvalid(title === '');
			setDescriptionInvalid(description === '');
			return;
		}
		setCollapse(false);
		setTitle('');
		setDescription('');
		const response = await fetch('url', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title: title, description: description })
		});

		if (response.status === 200) {
			const data = (await response.json()) as {
				id: number;
				title: string;
				description: string;
				done: boolean;
			};

			setList([ ...list, data ]);
		} else {
			setError(true);
		}
	};

	const onChangeTitle = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setTitle(target.value);
		setTitleInvalid(false);
	};

	const onChangeDescription = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setDescription(target.value);
		setDescriptionInvalid(false);
	};

	const toggle = () => {
		setCollapse(!collapse);
	};
	return (
		<div className="addbtn">
			<Button onClick={toggle} className="addbtn--btn">
				Add
			</Button>
			<Alert className="p-5 m-3" dismissible={() => setError(false)} open={error}>
				Something wrong
			</Alert>
			<Collapse open={collapse}>
				<div className="addbtn--form mt-3 border rounded">
					<Form>
						<FormGroup>
							<label htmlFor="#title">Title</label>
							<FormInput
								invalid={titleInvalid}
								id="#title"
								placeholder="Title"
								value={title}
								onChange={onChangeTitle}
							/>
						</FormGroup>
						<FormGroup>
							<label htmlFor="#description">Description</label>
							<FormInput
								invalid={descriptionInvalid}
								id="#description"
								placeholder="Description"
								value={description}
								onChange={onChangeDescription}
							/>
						</FormGroup>
						<Button theme="success" onClick={onClick}>
							Add
						</Button>
					</Form>
				</div>
			</Collapse>
		</div>
	);
};
