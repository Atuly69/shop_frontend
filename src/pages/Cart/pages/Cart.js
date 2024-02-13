import React, { useEffect } from 'react';
import '../../Product/pages/ProductTable.css';
import Pagination from '../../Product/pages/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { erase_cart_data, get_all_carts, upd_carts } from '../reducer/cartReducer';
import { BASE_URL, P_IMG_URL, add_orders_api, upd_cart_api } from '../../../apis/api';
import { show_alert, show_del_confirm_alert } from '../../../componets/Alert';
import plus_icon from "../../../assets/plus.png";
import minus_icon from "../../../assets/minus.png";
import tick_icon from "../../../assets/tick.png";


const Cart = () => {
    const concat_array = (arr) => {
        return [].concat(...arr.map((el) => {
            return el;
        }));
    }

    const cart_data = useSelector((state) => state?.cart_reducer);
    const { carts, paging_data, loading } = cart_data
    const dispatch = useDispatch();
    const cart_arr = concat_array(carts?.map((li) => {
        return li.items;
    }));

    // console.log({ cart_arr });

    const user_data = useSelector((state) => state?.auth_reducer?.user_data);
    useEffect(() => {
        dispatch(get_all_carts({ user_id: user_data?._id, token: user_data?.token }));
    }, [])

    const navigate = useNavigate();
    useEffect(() => {
        if (!(user_data?._id)) {
            navigate('/login')
        }
    }, []);

    const add_order = () => {
        add_orders_api({
            user_id: user_data?._id,
            items: cart_arr.map((el) => {
                return {
                    product_id: el.product_id,
                    product_name: el.product_name,
                    quantity: el.quantity
                }
            }),
            total_amount: cart_arr.reduce((x, el) => x + (el.product.price * el.quantity), 0),
            token: user_data?.token
        }).then((res) => {
            if (res.status == 1) {
                show_alert('Success', res.message, 'success');
                dispatch(erase_cart_data());
            }
            else {
                show_alert('Oops', 'Some error occured', 'error');

            }
        }).catch((err) => {
            console.log({ err });
            show_alert('Oops', 'Some error occured', 'error');
        })
    }

    const upd_cart_data = (id, quantity, p_id) => {
        const new_arr = cart_arr.map((el) => {
            if (el._id == id) {
                return {
                    ...el,
                    quantity: quantity,
                    change_flag: true
                }
            }
            else {
                return {
                    ...el,
                    change_flag: false
                }
            }
        });

        const new_cart_arr = carts.map((el) => {
            console.log({ _id: el._id, p_id });
            if (el._id == p_id) {
                return {
                    ...el,
                    items: new_arr
                }
            }
        });

        dispatch(upd_carts(new_cart_arr));
    }

    const upd_api = (p_id) => {
        const upd_data = carts.filter((el) => {
            return el._id == p_id;
        }).map((el) => {
            return el.items
        })[0];

        upd_cart_api({
            _id: p_id, items: upd_data.map((el) => {
                return {
                    quantity: el.quantity,
                    product_name: el.product_name,
                    product_id: el.product_id
                }
            }),
            token: user_data?.token
        }).then((res) => {
            show_alert('Success', 'Cart updated successfully', 'success');
            const updated_cart_arr = carts.map((el) => {
                return {
                    ...el,
                    items: el.items.map((li) => {
                        return {
                            ...li,
                            parent_id: el._id,
                            change_flag: false
                        }
                    })
                }
            });
            dispatch(upd_carts(updated_cart_arr));

        }).catch((err) => {
            show_alert('Oops', ' Some error occurred!', 'error');
        })
    }

    const delete_cart = (p_id, _id) => {
        const upd_data = carts.filter((el) => {
            console.log({ p_id, _id, p_el_id: el._id, items: el.items });
            return (el._id == p_id) && !(el.items.map((li) => { return li._id }).includes(_id))
        })
            .map((el) => {
                return el.items
            });
        console.log({ upd_data, carts });

        upd_cart_api({
            _id: p_id, items: upd_data.map((el) => {
                return {
                    quantity: el.quantity,
                    product_id: el.product_id,
                    product_name: el.product_name
                }
            }),
            token: user_data?.token
        }).then((res) => {
            show_alert('Success', 'Cart deleted successfully', 'success');
            const updated_cart_arr = carts.filter((el) => {
                return !(el.items.map((li) => { return li._id }).includes(_id))
            }).map((el) => {
                return {
                    ...el,
                    items: el.items.map((li) => {
                        return {
                            ...li,
                            parent_id: el._id,
                            change_flag: false
                        }
                    })
                }
            });
            dispatch(upd_carts(updated_cart_arr));

        }).catch((err) => {
            show_alert('Oops', ' Some error occurred!', 'error');
        })
    }

    // console.log({carts});

    return (
        <div className="table-container" style={{ marginTop: "15px" }}>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart_arr?.length > 0 &&
                        cart_arr.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="product-details">
                                        <img
                                            style={{
                                                height: "60px",
                                                width: "60px"
                                            }}
                                            src={BASE_URL + P_IMG_URL + (product?.product?.product_img)} alt={product?.product_name} className="product-image" />
                                        <span className="product-name">{product?.product_name}</span>
                                    </div>
                                </td>
                                <td>{"₹" + product?.quantity * product?.product?.price}</td>
                                <td>
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 4,
                                            position: "relative"
                                        }}>
                                        {
                                            product?.change_flag &&
                                            <img
                                                src={tick_icon}
                                                onClick={() => {
                                                    upd_api(product.parent_id);
                                                }}
                                                style={{
                                                    height: "15px",
                                                    position: "absolute",
                                                    right: "10px",
                                                    cursor: "pointer"
                                                }}
                                            />
                                        }
                                        <img
                                            onClick={() => {
                                                if (product.quantity > 0) {
                                                    upd_cart_data(product._id, product.quantity - 1, product.parent_id)
                                                }
                                                else {
                                                    delete_cart(product.parent_id, product._id);
                                                }
                                            }}
                                            src={minus_icon}
                                            style={{
                                                height: "20px",
                                                border: "1px solid #c9c9c9",
                                                padding: "5px",
                                                cursor: "pointer"
                                            }}
                                        />
                                        <span>{product?.quantity}</span>
                                        <img
                                            onClick={() => {
                                                upd_cart_data(product._id, parseInt(product.quantity) + 1, product.parent_id)
                                            }}
                                            src={plus_icon}
                                            style={{
                                                height: "20px",
                                                border: "1px solid #c9c9c9",
                                                padding: "5px",
                                                cursor: "pointer"
                                            }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            show_del_confirm_alert(() => {
                                                delete_cart(product.parent_id, product._id);
                                            });
                                        }}
                                        className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "end", alignItems: "center", padding: "5px 0px" }}>
                {
                    cart_arr?.length > 0 &&
                    <button onClick={add_order} type='submit' style={{ width: "120px" }}>
                        Place Order
                    </button>
                }
            </div>
        </div>
    );
};

export default Cart;
