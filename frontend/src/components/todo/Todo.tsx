import React, { useState, useEffect } from 'react';
import { TodoCard } from './TodoCard';
import { AddButton } from './AddButton';

interface TodoProps {}

interface Todo {
	Id: number;
	Title: string;
	Description: string;
	Done: boolean;
}

export const Todo: React.FC<TodoProps> = ({}) => {
	const emptyArray: Todo[] = [];
	const [ list, setList ] = useState(emptyArray);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/todos');
			if (response.status === 200) {
				console.log('here');
				const data = await response.json();
				setList(data);
			}
		} catch (err) {
			console.log('catch error');
		}
	};

	return (
		<div>
			<AddButton list={list} setList={setList} />
			{list == emptyArray ? (
				<h2 className="todo-header">Set new Todo</h2>
			) : (
				<div className="list">
					{list.map((todo: Todo) => <TodoCard key={todo.Id} {...todo} setList={setList} list={list} />)}
				</div>
			)}
		</div>
	);
};
