import React, {useState, useEffect} from 'react';

 const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
    .then(response => response,json())
    .then(data => setProducts(data))
    .catch(error => console.error('Error fetching products'));

    }, []);

    return (
        <div className="product-list">
        <h2>Lista de Productos</h2>
        {products.map(product => (
            <div key={product._id} className="product">
                <h3>{product.name}</h3>
                <p>Precio: ${product.price}</p>
                </div>
        ))}
        </div>

    );
};

export default ProductList;