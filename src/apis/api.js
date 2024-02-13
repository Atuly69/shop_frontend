import axios from "axios";

export const BASE_URL = "http://192.168.29.93:9000/";
export const P_IMG_URL = "media/products/";

export const signUp_api = async (data) => {
  const config = {
    url: `${BASE_URL}users/signUp`,
    method: "post",
    data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const login_api = async (data) => {
  const config = {
    url: `${BASE_URL}users/login-user`,
    method: "post",
    data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const getproducts_api = async () => {
  const config = {
    url: `${BASE_URL}shop/get-all-product`,
    method: "post"
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const add_products_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/add-product`,
    method: "post",
    data
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const edit_products_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/edit-product`,
    method: "post",
    data
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const delete_products_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/delete-product`,
    method: "post",
    data
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const add_cart_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/add-cart`,
    method: "post",
    data,
    headers: {
      'Authorization': `${data.token}`
    }
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const upd_cart_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/upd-cart`,
    method: "post",
    data,
    headers: {
      'Authorization': `${data.token}`
    }
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const get_cart_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/get-user-cart`,
    method: "post",
    data,
    headers: {
      'Authorization': `${data.token}`
    }
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const add_orders_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/place-order`,
    method: "post",
    data,
    headers: {
      'Authorization': `${data.token}`
    }
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const get_orders_api = async (data) => {
  const config = {
    url: `${BASE_URL}shop/get-user-order`,
    method: "post",
    data,
    headers: {
      'Authorization': `${data.token}`
    }
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
