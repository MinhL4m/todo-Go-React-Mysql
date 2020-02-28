import React from 'react';
import { Card, CardTitle, CardBody, ButtonGroup, Button } from 'shards-react';

interface TodoCardProps {
	id: number;
	title: string;
	description: string;
	done: boolean;
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
	list: {
		id: number;
		title: string;
		description: string;
		done: boolean;
	}[];
}

export const TodoCard: React.FC<TodoCardProps> = ({ id, title, description, done, setList, list }) => {
	const onClick = (e: Event) => {
		const target = e.target as HTMLButtonElement;
		if (target.name === 'done') {
			toggleDone(true);
		} else if (target.name === 'redo') {
			toggleDone(false);
		} else if (target.name === 'delete') {
			delFunc();
		}
	};

	const toggleDone = async (status: boolean) => {
		try {
			const response = await fetch('url', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: id, done: status })
			});
			if (response.status === 200) {
				const data = await response.json();
				const index = list.findIndex((todo) => todo.id === id);
				list = list.filter((todo) => todo.id !== id);
				setList([ ...list.slice(0, index), data, ...list.slice(index + 1) ]);
			} else {
				console.log('Error');
			}
		} catch (err) {
			console.log('catch error');
		}
	};

	const delFunc = async () => {
		try {
			const response = await fetch('url', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: id })
			});
			if (response.status === 200) {
				const index = list.findIndex((todo) => todo.id === id);
				list = list.filter((todo) => todo.id !== id);
				setList([ ...list.slice(0, index), ...list.slice(index + 1) ]);
			} else {
				console.log('Error');
			}
		} catch (err) {
			console.log('catch error');
		}
	};

	return (
		<Card className={done ? '' : 'done'} onClick={onClick}>
			<CardBody>
				<CardTitle>{title}</CardTitle>
				<p>{description}</p>
				<ButtonGroup className="mr-2">
					{done ? (
						<Button theme="success" name="done">
							Done
						</Button>
					) : (
						<Button theme="warning" name="redo">
							Redo
						</Button>
					)}

					<Button theme="danger" name="delete">
						Delete
					</Button>
				</ButtonGroup>
			</CardBody>
		</Card>
	);
};
