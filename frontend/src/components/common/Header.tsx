import React from 'react'
import { Nav, NavItem, NavLink } from 'shards-react'
import { Link } from 'react-router-dom'
interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink active href="#">
                    <Link to="/">Home</Link>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#">
                    <Link to="/summary">Summary</Link>
                </NavLink>
            </NavItem>
        </Nav>
    );
}