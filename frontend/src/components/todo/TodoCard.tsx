import React from 'react'
import { Card, CardTitle, CardBody, ButtonGroup, Button } from 'shards-react'

interface TodoCardProps {
    id: number
    title: string;
    description: string;
    done: boolean;
    date:string;
}

export const TodoCard: React.FC<TodoCardProps> = ({ id, title, description, done, date }) => {
    return (
        <Card className={done ? "" : "done"}>
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <p>Created: {date}</p>
                <p>{description}</p>
                <ButtonGroup className="mr-2">
                    {
                        done ?
                            <Button theme="success" name="done" value={id}>Done</Button>:
                            <Button theme="warning" name="redo" value={id}>Redo</Button>
                    }

                    <Button theme="danger" name="delete" value={id}>Delete</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    );
}