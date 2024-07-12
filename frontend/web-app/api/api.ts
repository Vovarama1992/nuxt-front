const uri = "http://localhost:8080/v1";

export const getProductsByIds = async (body: {_id: string, size_id: string}[]) => {
  const { data, pending, error, refresh } = await useFetch<
    {
      _id: string;
      created_at: string;
      title: string;
      brand: string;
      type: string;
      is_hidden: boolean;
      in_stock: boolean;
      is_new: boolean;
      is_sale: boolean;
      gallery: {
        title: string;
      }[];
      preview: {
        title: string;
      };
      size_grid: string;
      similar_products: string[];
      sizes: {
        _id: string;
        current_price: number;
        old_price: number;
        quantity: number;
        value: string;
      }[];
    }[]
  >(`${uri}/products`, {
    method: "post",
    server: false,
    body: JSON.stringify({products: body}),
  });

  return { data, pending, error, refresh };
}

export const verify = async (code: string) => {
  const { data, pending, error, refresh } = await useFetch<{
    access_token: string;
  }>(`${uri}/auth/verify`, {
    method: "post",
    body: {
      code,
    },
  });

  return { data, pending, error, refresh };
};

export const getProducts = async (
  page: globalThis.Ref<number>
) => {
  const { data, pending, error, refresh } = await useFetch<{
    products: {
      _id: string;
      title: string;
      preview: {
        title: string,
      },
      in_stock: boolean;
      is_new: boolean;
      is_sale: boolean;
      min_current_price: number; 
    }[];
    total_count: {
      count: number,
    }[];
  }>(`${uri}/products/page/${page.value}`);

  return { data, pending, error, refresh };
};

export const getProduct = async (_id: string) => {
  const { data, pending, error, refresh } = await useFetch<{
    _id: string;
    created_at: string;
    title: string;
    brand: string;
    type: string;
    is_hidden: boolean;
    in_stock: boolean;
    is_new: boolean;
    is_sale: boolean;
    gallery: {
      title: string;
    }[];
    preview: {
      title: string;
    };
    size_grid: string;
    similar_products: string[];
    sizes: {
      _id: string;
      current_price: number;
      old_price: number;
      quantity: number;
      value: string;
    }[];
  }>(`${uri}/products/${_id}`);

  return { data, pending, error, refresh };
}