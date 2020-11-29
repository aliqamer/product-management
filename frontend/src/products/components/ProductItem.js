import React from 'react';
import { Button, Row, Table } from 'react-bootstrap';

import './ProductItem.css';

const ProductItem = (props) => {
    return <tr>
        <td>{props.title}</td>
        <td>{props.description}</td>
        <td>{props.price}</td>
        <td>{props.creatorId}</td>
        <td>{props.status}</td>
        <td><Button style={{ marginLeft: '10px' }}>View</Button>
            <Button style={{ marginLeft: '10px' }}>Edit</Button></td>
    </tr>;
};

export default ProductItem;