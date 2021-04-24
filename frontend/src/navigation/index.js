import React from "react";
import {Container} from 'react-bootstrap';

const Layout = (props) => {
    return (
        <Container className="container" fluid>
            <div className="subpage-title">{props.children}</div>           
        </Container>
    )
}

export { Layout };