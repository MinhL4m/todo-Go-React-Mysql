import React, { useState } from 'react';
import { Button, Collapse, Form, FormGroup, FormInput, Alert } from 'shards-react';

interface AddButtonProps {
	list: {
		Id: number;
		Title: string;
		Description: string;
		Done: boolean;
	}[];
	setList: React.Dispatch<
		React.SetStateAction<
			{
				Id: number;
				Title: string;
				Description: string;
				Done: boolean;
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
		console.log(title);
		const response = await fetch('http://localhost:8080/api/todos', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify({ Title: title, Description: description, Done: 0 })
		});

		if (response.status === 200) {
			const data = (await response.json()) as {
				Id: number;
				Title: string;
				Description: string;
				Done: boolean;
			};

			setList([ ...list, data ]);
		} else {
			setError(true);
		}
		setTitle('');
		setDescription('');
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
