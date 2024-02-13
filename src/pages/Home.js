import React, { Component } from "react";
import ProductList from "./Product/pages/ProductList";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="mt-4">
          <ProductList />
        </div>
      </>
    );
  }
}
