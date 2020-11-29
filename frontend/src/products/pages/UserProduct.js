import React, { useState } from 'react';
import ProductList from '../components/ProductList';


const UserProducts = () => {
    const DUMMY_PRODUCTS = [
        {
            id: 'p1',
            title: 'shoe',
            description: 'addidas',
            price: '50$',
            creator: 'Ali',
            status: 'draft'
        },
        {
            id: 'p2',
            title: 'shoe',
            description: 'nike',
            price: '100$',
            creator: 'Ali',
            status: 'draft'
        },
    ];

    const addProduct = (item) => {
        console.log('inside add product');
        console.log(item);

    };

    const [productList, setproductList] = useState(DUMMY_PRODUCTS);

    return <ProductList items={DUMMY_PRODUCTS} onAdd={addProduct} />
};

export default UserProducts;
