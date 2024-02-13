import React, { useEffect } from 'react';
import './ProductTable.css';
import Pagination from './Pagination';
import plus_icon from "../../../assets/plus.png";
import { useNavigate } from 'react-router-dom/dist';
import { useDispatch, useSelector } from 'react-redux';
import { change_paging_data, del_product_data_elem, get_all_products } from '../reducer/productReducer';
import { BASE_URL, P_IMG_URL, delete_products_api } from '../../../apis/api';
import { show_alert, show_del_confirm_alert } from '../../../componets/Alert';
import Swal from 'sweetalert2';
import NoDataFound from '../../../componets/Nodatafound';

const ProductTable = () => {
    const navigate = useNavigate();
    const product_data = useSelector((state) => state?.product_reducer);
    const { products, paging_data, loading } = product_data;
    const { current_page, total_count } = paging_data;
    const dispatch = useDispatch();
    console.log({ product_data, paging_data });

    useEffect(() => {
        dispatch(get_all_products());
    }, [])

    const delete_product = (id) => {
        delete_products_api({ product_id: id }).then((res) => {
            if (res.status == 1) {
                show_alert('Success', 'Product deleted successfully!', 'success');
                const new_arr = products.filter((el) => {
                    return el._id != id;
                });
                dispatch(del_product_data_elem(new_arr));
            }
        }).catch((err) => {
            console.log({ err });
            show_alert('Oops', 'Some error occured', 'error');
        })
    }



    return (
        <>
            <div style={{ margin: "10px 0px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h5>Total Products (45)</h5>
                <img
                    onClick={() => {
                        navigate('/add-product');
                    }}
                    src={plus_icon}
                    style={{
                        height: "30px",
                        border: "1px solid #c9c9c9",
                        padding: "5px",
                        cursor: "pointer"
                    }}
                />
            </div>
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.length > 0 &&
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="product-details">
                                            <img src={BASE_URL + P_IMG_URL + product.product_img}
                                                style={{
                                                    height: "60px",
                                                    width: "60px"
                                                }}
                                                alt={product.name}
                                                className="product-image" />
                                            <span className="product-name">{product.name}</span>
                                        </div>
                                    </td>
                                    <td>₹{product.price}</td>
                                    <td>
                                        <button className="edit-button"
                                            onClick={() => {
                                                navigate('/add-product', {
                                                    state: product
                                                });
                                            }}
                                        >Edit</button>
                                        <button
                                            onClick={() => {
                                                show_del_confirm_alert(() => {
                                                    delete_product(product._id);
                                                });
                                            }}
                                            className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {
                    products?.length == 0 &&
                    <NoDataFound />
                }
                <div style={{ marginTop: "8px", width: "100%" }}>
                    <Pagination totalPages={Math.ceil(total_count / 10)} currentPage={current_page} onPageChange={(e) => {
                        dispatch(change_paging_data(e))
                    }} />
                </div>
            </div>
        </>
    );
};

export default ProductTable;
