import React, { useEffect } from 'react';
import '../../Product/pages/ProductTable.css'; 
import Pagination from '../../Product/pages/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { get_all_orders } from '../reducer/orderReducer';

const Orders = () => {
    const dispatch = useDispatch();
    const order_data = useSelector((state) => state?.order_reducer);
    const { orders, paging_data, loading } = order_data
    const user_data = useSelector((state) => state?.auth_reducer?.user_data);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(user_data?._id)) {
            navigate('/login')
        }
    }, []);
    useEffect(() => {
        dispatch(get_all_orders({ user_id: user_data?._id, token: user_data?.token }));
    }, [])

    console.log({ orders, order_data });


    return (
        <div className="table-container" style={{marginTop:"15px"}}>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0 &&
                        orders.map((product, index) => {

                            const products = product?.items?.map((el) => {
                                return el.product_name + ' (' + el.quantity + ')'
                            }).toString();

                            return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="product-details">
                                        <span className="product-name">{products}</span>
                                    </div>
                                </td>
                                <td>₹{product.total_amount}</td>
                            </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
