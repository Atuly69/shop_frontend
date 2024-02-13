import React, { useState } from 'react';
import './Add_product.css'; // Import the external CSS file
import { add_products_api, edit_products_api } from '../../../apis/api';
import { show_alert } from '../../../componets/Alert';
import { useLocation, useNavigate } from 'react-router-dom';

const convert_into_base64 = (file, func) => {
    const reader = new FileReader();

    reader.onload = function (event) {
        const base64String = event.target.result;
        func(base64String);
    };
    reader.readAsDataURL(file);
}

const AddProductForm = () => {
    const state_data = useLocation();
    const state = state_data?.state;
    const navigate = useNavigate();
    const [productName, setProductName] = useState(state?.name || '');
    const [productPrice, setProductPrice] = useState(state?.price || '');
    const [productImage, setProductImage] = useState('');
    const [image_name, setimage_name] = useState(state?.product_img || '');

    function generateRandomAlphanumericString(length) {
        const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length));
        }
        return result;
    }

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleProductImageChange = (e) => {
        setimage_name(e.target.files[0]?.name?.split(".")[0] + generateRandomAlphanumericString(8) + ".png")
        convert_into_base64(e.target.files[0], (res) => {
            setProductImage(res);
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?._id) {
            edit_products_api({
                product_name: productName,
                product_image: productImage,
                image_name,
                price: productPrice,
                _id: state?._id
            }).then((res) => {
                show_alert('Success!', 'Successfully updated product!', 'success');
                setProductName('');
                setProductPrice('');
                setProductImage('');
                setimage_name('');
                navigate("/manage_products");
            }).catch((err) => {
                console.log({ err });
                show_alert('Oops!', 'Some error occurred!', 'error');
            });

        }
        else {
            add_products_api({
                product_name: productName,
                product_image: productImage,
                image_name,
                price: productPrice,
            }).then((res) => {
                show_alert('Success!', 'Successfully added product!', 'success');
                setProductName('');
                setProductPrice('');
                setProductImage('');
                setimage_name('');
            }).catch((err) => {
                console.log({ err });
                show_alert('Oops!', 'Some error occurred!', 'error');
            });

        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3>{state?._id ? 'Update Product' : 'Add Product'}</h3>
            <label htmlFor="productName">Product Name:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={handleProductNameChange}
                required
            />

            <label htmlFor="productPrice">Product Price:</label>
            <input
                type="text"
                id="productPrice"
                value={productPrice}
                onChange={handleProductPriceChange}
                required
            />

            <label htmlFor="productImage">Product Image: <b>{state?.product_img}</b></label>
            <input
                type="file"
                id="productImage"
                // value={productImage}
                style={{ marginBottom: "6px" }}
                onChange={handleProductImageChange}
                required={!(state?._id)}
            />

            <button type="submit">
                {state?._id ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    );
};

export default AddProductForm;
