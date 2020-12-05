import React, { useContext, useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { AuthContext } from '../../shared/context/auth-context';


const UserProducts = () => {

    const auth = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedProducts, setLoadedProducts] = useState();
    // const [productList, setproductList] = useState(DUMMY_PRODUCTS);

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {

                console.log('calling products');
                const response = await fetch('http://localhost:3001/userproducts?creator=' + auth.userId);

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                console.log(responseData);
                setLoadedProducts(responseData);

            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

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


    return (
        <React.Fragment>
            {isLoading && <p>Loading...</p>}
            {!isLoading && loadedProducts && <ProductList items={loadedProducts} onAdd={addProduct} />}
        </React.Fragment>
    )
};

export default UserProducts;
