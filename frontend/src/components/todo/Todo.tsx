import React, { useState, useEffect } from 'react';
import { TodoCard } from './TodoCard';
import { AddButton } from './AddButton';

interface TodoProps {}

interface Todo {
	id: number;
	title: string;
	description: string;
	done: boolean;
}

export const Todo: React.FC<TodoProps> = ({}) => {
	const emptyArray: Todo[] = [];
	const [ list, setList ] = useState(emptyArray);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('http://url');
			if (response.status === 200) {
				console.log('what');
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
					{list.map((todo: Todo) => <TodoCard key={todo.id} {...todo} setList={setList} list={list} />)}
				</div>
			)}
		</div>
	);
};
