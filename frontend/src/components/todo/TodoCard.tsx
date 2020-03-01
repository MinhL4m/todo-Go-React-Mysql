import React from 'react';
import { Card, CardTitle, CardBody, ButtonGroup, Button } from 'shards-react';

interface TodoCardProps {
	Id: number;
	Title: string;
	Description: string;
	Done: boolean;
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
	list: {
		Id: number;
		Title: string;
		Description: string;
		Done: boolean;
	}[];
}

export const TodoCard: React.FC<TodoCardProps> = ({ Id, Title, Description, Done, setList, list }) => {
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
				body: JSON.stringify({ id: Id, done: status })
			});
			if (response.status === 200) {
				const data = await response.json();
				const index = list.findIndex((todo) => todo.Id === Id);
				list = list.filter((todo) => todo.Id !== Id);
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
				body: JSON.stringify({ id: Id })
			});
			if (response.status === 200) {
				const index = list.findIndex((todo) => todo.Id === Id);
				list = list.filter((todo) => todo.Id !== Id);
				setList([ ...list.slice(0, index), ...list.slice(index + 1) ]);
			} else {
				console.log('Error');
			}
		} catch (err) {
			console.log('catch error');
		}
	};

	return (
		<Card className={Done ? 'done' : ''} onClick={onClick}>
			<CardBody>
				<CardTitle>{Title}</CardTitle>
				<p>{Description}</p>
				<ButtonGroup className="mr-2">
					{!Done ? (
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
