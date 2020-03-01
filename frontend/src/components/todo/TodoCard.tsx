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
		if (target.name === 'done' || target.name === 'redo') {
			toggleDone();
		} else if (target.name === 'delete') {
			delFunc();
		}
	};

	const toggleDone = async () => {
		try {
			const response = await fetch(`http://localhost:8080/api/todos/${Id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				mode: 'cors',
				body: JSON.stringify({ Id })
			});
			if (response.status === 200) {
				const data = await response.json();
				const index = list.findIndex((todo) => todo.Id === Id);
				list = list.filter((todo) => todo.Id !== Id);
				setList([ ...list.slice(0, index), data, ...list.slice(index) ]);
			} else {
				console.log('Error');
			}
		} catch (err) {
			console.log('catch error');
		}
	};

	const delFunc = async () => {
		try {
			const response = await fetch(`http://localhost:8080/api/todos/${Id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors',
				credentials: 'include'
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
