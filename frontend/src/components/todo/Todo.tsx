import React, { useState, useEffect } from 'react'
import { TodoCard } from './TodoCard'
import {AddButton} from './AddButton'

interface TodoProps {}

interface Todo {
    id: number;
    title: string;
    description: string;
    done: boolean,
    date: string
}

//sample data
const sampleList = [
    {
        id: 1,
        title: 'test',
        description: '<script>window.alert("a")</script>',
        done: true,
        date: "Feb-12-2012"
    },

    {
        id: 2,
        title: 'test',
        description: 'testabc',
        done: false,
        date: "Feb-12-2012"
    },
    {
        id: 3,
        title: 'test',
        description: 'testabc',
        done: true,
        date: "Feb-12-2012"

    },
]




export const Todo: React.FC<TodoProps> = ({ }) => {

    const [list, setList] = useState(sampleList)

    useEffect(() => {
        const onClickHandler = (e: Event) => {
            const target = e.target as HTMLButtonElement;
            if (target.name === "done") {
                console.log("done " + target.value)
            } else if (target.name === "delete") {
                console.log("delete " + target.value)
            } else if (target.name === "redo"){
                console.log("redo " + target.value)
            }
        }

        const div: HTMLElement | null = document.querySelector('.list')
        div?.addEventListener('click', onClickHandler)

        //TODO return to remove eventlistner
    }, [])

    return (
        <div>
            <AddButton/>
            <div className="list">
                {list.map((todo: Todo) => <TodoCard key={todo.id} {...todo} />)}
            </div>
        </div>

    );
}