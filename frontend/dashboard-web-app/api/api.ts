const url = "https://api.3hundred.ru/v1";

export const verify = async (code: string) => {
  const { data, pending, error, refresh } = await useFetch<{
    access_token: string;
  }>(`${url}/auth/verify`, {
    method: "post",
    body: {
      code,
    },
  });

  return { data, pending, error, refresh };
};

export const createProduct = async (productData: {
  title: string;
  brand: string;
  type: string;
  in_stock: boolean;
  in_new: boolean;
  in_sale: boolean;
  photos: {
    title: string;
    mimetype: string;
    size: number;
  }[];
  preview: {
    itle: string;
    mimetype: string;
    size: number;
  };
  size_grid: string;
  width: number;
  height: number;
  length: number;
  weight: number;
}) => {
  const { data, pending, error, refresh } = await useFetch<{
    access_token: string;
  }>(`${url}/dashboard/products`, {
    method: "post",
    headers: {
      'Authorization': `Bearer ${useCookie("access_token").value}`
    },
    body: productData,
  });

  return { data, pending, error, refresh };
};

export const getProducts = async (page: number, limit: number) => {
  const { data, pending, error, refresh } = await useFetch<{
    access_token: string;
  }>(`${url}/dashboard/products?page=${page}&limit=${limit}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${useCookie("access_token").value}`,
    },
    server: false,
  });

  return { data, pending, error, refresh };
}

export const getProduct = async (productId: string) => {
  const { data, pending, error, refresh } = await useFetch<{
    access_token: string;
  }>(`${url}/dashboard/products/${productId}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${useCookie("access_token").value}`,
    },
    server: false,
  });

  return { data, pending, error, refresh };
}

export const deleteProduct = async (productId: string) => {
  const { data, pending, error, refresh } = await useFetch(`${url}/dashboard/products`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${useCookie("access_token").value}`,
    },
    body: {
      product_id: productId
    },
    server: false,
  });

  return { data, pending, error, refresh };
}
export const createProductSize = async (sizeData: {
  product_id: string;
  value: string;
  quantity: number;
  old_price: number;
  current_price: number;
}) => {
  const { data, pending, error, refresh } = await useFetch(`${url}/dashboard/products/size`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${useCookie("access_token").value}`,
    },
    body: sizeData,
    server: false,
  });

  return { data, pending, error, refresh };
}

export const updateProduct = async (productData: {
  product_id: string;
  title: string;
  brand: string;
  type: string;
  in_stock: boolean;
  in_new: boolean;
  in_sale: boolean;
  photos: {
    title: string;
    mimetype: string;
    size: number;
  }[];
  delete_photos: {
    title: string;
    mimetype: string;
    size: number;
  }[];
  preview: {
    title: string;
    mimetype: string;
    size: number;
  };
  size_grid: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  is_hidden: boolean;
}) => {
  const { data, pending, error, refresh } = await useFetch(`${url}/dashboard/products`, {
    method: "patch",
    headers: {
      Authorization: `Bearer ${useCookie("access_token").value}`,
    },
    body: productData,
    server: false,
  });

  return { data, pending, error, refresh };
};

