import React, { useEffect, useState } from 'react';
import './ProductCard.css'; 
import { useDispatch, useSelector } from 'react-redux/es';
import { get_all_products } from '../reducer/productReducer';
import { BASE_URL, P_IMG_URL, add_cart_api, get_cart_api } from '../../../apis/api';
import { show_alert } from '../../../componets/Alert';
import NoDataFound from '../../../componets/Nodatafound';
import { useNavigate } from 'react-router-dom';

const concat_array = (arr) => {
    return [].concat(...arr.map((el) => {
        return el;
    }));
}


const ProductCard = ({ product, add_cart, user_cart }) => {

    const cart_included = user_cart.filter((el) => {
        return el.product_id == product._id
    }).length > 0;

    return (
        <div className="card">
            <img src={BASE_URL + P_IMG_URL + product.product_img} alt={product.name} className="product-image" />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                &nbsp;
                &nbsp;
                <p className="product-price">₹{product.price}</p>
            </div>
            <button disabled={cart_included} onClick={() => add_cart(product?._id, product.name)} className="add-to-cart-button">
                {cart_included == true ? 'Already added to cart' : 'Add to Cart'}
            </button>
        </div>
    );
};

const ProductList = () => {
    const navigate = useNavigate();
    const product_data = useSelector((state) => state?.product_reducer);
    const { products, paging_data, loading } = product_data
    const dispatch = useDispatch();
    console.log({ product_data });
    const user_data = useSelector((state) => state?.auth_reducer?.user_data);
    const [user_cart, setuser_cart] = useState([])

    useEffect(() => {
        dispatch(get_all_products());
    }, [])

    const get_cart = () => {
        get_cart_api({ user_id: user_data?._id, token: user_data?.token }).then((res) => {
            // console.log({ res });
            setuser_cart(res.cart)
        }).catch((err) => {
            console.log({ err });
        })
    };

    useEffect(get_cart, []);


    const add_cart = (id, name) => {
        if (user_data?._id) {
            add_cart_api({
                user_id: user_data?._id,
                items: [
                    {
                        product_id: id,
                        product_name: name,
                        quantity: 1,
                    }
                ],
                token: user_data?.token
            }).then((res) => {
                if (res.status == 1) {
                    show_alert('Success', res.message, 'success');
                    setuser_cart([...user_cart, res.result])
                }
                else {
                    show_alert('Oops', 'Some error occured', 'error');

                }
            }).catch((err) => {
                console.log({ err });
                show_alert('Oops', 'Some error occured', 'error');
            })
        }
        else {
            navigate("/login");
        }
    }



    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around",marginTop:"5px"}}>
            {products?.length > 0 &&
                products.map(product => (
                    <ProductCard key={product.id} product={product} user_cart={concat_array(user_cart?.map((el) => {
                        return el.items
                    }))} add_cart={add_cart} />
                ))}
            {products?.length == 0 &&
                <NoDataFound />
            }
        </div>
    );
};

export default ProductList;
