import React, { useState } from 'react'
import { Button, Collapse, Form, FormGroup, FormInput } from 'shards-react'
interface AddButtonProps {

}

export const AddButton: React.FC<AddButtonProps> = ({ }) => {
    const [collapse, setCollapse] = useState(false)

    const toggle = () => {
        setCollapse(!collapse)
    }
    return (
        <div className="addbtn">
            <Button onClick={toggle}>Add</Button>
            <Collapse open={collapse}>
                <div className="p-3 mt-3 border rounded">
                    <Form>
                        <FormGroup>
                            <label htmlFor="#title">Title</label>
                            <FormInput id="#title" placeholder="Title" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#description">Description</label>
                            <FormInput id="#description" placeholder="Description" />
                        </FormGroup>
                        <Button theme="success">Add</Button>
                    </Form>
                </div>
            </Collapse>
        </div>);
}