/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PhotoDTO {
  title: string;
  mimetype: string;
  size: number;
}

export interface CreateProductDTO {
  /**
   * @minLength 1
   * @maxLength 256
   */
  title: string;
  /**
   * @minLength 1
   * @maxLength 256
   */
  brand: string;
  /**
   * @minLength 1
   * @maxLength 256
   */
  type: string;
  in_stock: boolean;
  in_new: boolean;
  in_sale: boolean;
  photos: PhotoDTO[];
  preview: PhotoDTO;
  size_grid: string;
  /**
   * @min 1
   * @max 1000000
   */
  width: number;
  /**
   * @min 1
   * @max 1000000
   */
  height: number;
  /**
   * @min 1
   * @max 1000000
   */
  length: number;
  /**
   * @min 1
   * @max 1000000
   */
  weight: number;
}

export interface CreateSizeDTO {
  product_id: string;
  current_price: number;
  old_price: number;
  quantity: number;
  value: string;
}

export interface UpdateProductDTO {
  product_id: string;
  /**
   * @minLength 1
   * @maxLength 256
   */
  title: string;
  /**
   * @minLength 1
   * @maxLength 256
   */
  brand: string;
  /**
   * @minLength 1
   * @maxLength 256
   */
  type: string;
  in_stock: boolean;
  in_new: boolean;
  in_sale: boolean;
  photos: PhotoDTO[];
  delete_photos: PhotoDTO[];
  preview: PhotoDTO;
  size_grid: string;
  /**
   * @min 1
   * @max 1000000
   */
  width: number;
  /**
   * @min 1
   * @max 1000000
   */
  height: number;
  /**
   * @min 1
   * @max 1000000
   */
  length: number;
  /**
   * @min 1
   * @max 1000000
   */
  weight: number;
  is_hidden: boolean;
}

export interface DeleteProductDTO {
  product_id: string;
}

export interface CustomerDTO {
  city: string;
  address?: string;
  pvz?: string;
  profile_id: string;
  first_name: string;
  last_name: string;
  surname?: string;
}

export interface PaymentDetailsDTO {
  promo_code: string;
}

export interface DeliveryDetailsDTO {
  delivery_method: string;
  tracking_code: string;
}

export interface PartialProductStatus {
  is_hidden: boolean;
  in_stock: boolean;
  is_sale: boolean;
  is_new: boolean;
}

export interface ProductPackage {
  width: number;
  height: number;
  length: number;
  weight: number;
}

export interface PartialProductSize {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface ProductResponseDTO {
  _id: string;
  preview: string;
  preview_compress: string;
  title: string;
  discount: number;
  photos: string[];
  photos_compress: string[];
  status: PartialProductStatus;
  min_price: number;
  /** @format date-time */
  created_at: string;
  type: string;
  brand: string;
  size_grid: string;
  similar: string[];
  package: ProductPackage;
  sizes: PartialProductSize[];
}

export interface GetOrderProductDTO {
  size_id: string;
  size_title: string;
  size_price: number;
  quantity: number;
  product: ProductResponseDTO;
}

export interface GetOrderResponseDTO {
  _id: string;
  /** @format date-time */
  created_at: string;
  status: "created" | "paid" | "delivery" | "complete" | "refund" | "refund_complete" | "rejected";
  customer: CustomerDTO;
  payment_details: PaymentDetailsDTO;
  delivery_details: DeliveryDetailsDTO;
  total_amount: number;
  total_amount_promocode: number;
  items: GetOrderProductDTO[];
}

export interface ChangeStatusDTO {
  order_id: string;
  status: "created" | "paid" | "delivery" | "complete" | "refund" | "refund_complete" | "rejected";
}

export interface ChangeTrackNumberDTO {
  order_id: string;
  track_number: string;
}

export interface SignInDTO {
  phone_number: string;
}

export interface SignInResponseDTO {
  message: string;
}

export interface SignInTelegramDTO {
  telegram_id: number;
}

export interface SignInTelegramResponseDTO {
  code: string;
}

export interface VerifyDTO {
  /**
   * @minLength 4
   * @maxLength 256
   */
  code: string;
  phone_number?: string;
}

export interface VerifyResponseDTO {
  access_token: string;
}

export interface SignUpDTO {
  telegram_id: number;
}

export interface Profile {
  _id: string;
  role: "admin" | "user";
}

export interface ProfileIdResponseDTO {
  profile_id: Profile;
}

export interface PartialProductResponseDTO {
  _id: string;
  preview: string;
  preview_compress: string;
  title: string;
  discount: number;
  photos: string[];
  photos_compress: string[];
  status: PartialProductStatus;
  min_price: number;
}

export interface CollectionResponseDTO {
  level: number;
  title: string;
  to: string;
  products_full: PartialProductResponseDTO[];
}

export interface Variable {
  _id: string;
  title: string;
}

export interface VariableGroupResponseDTO {
  group: "brand" | "type";
  variables: Variable[];
}

export interface Filter {
  _id: string;
  count: number;
}

export interface Price {
  min: number;
  max: number;
}

export interface FiltersResponseDTO {
  brands: Filter[];
  types: Filter[];
  sizes: Filter[];
  price: Price;
}

export interface GetProductsResponseDTO {
  total_pages: number;
  total_items: number;
  content: PartialProductResponseDTO[];
}

export interface CartItemDTO {
  product_id: string;
  size_id: string;
  /**
   * @min 1
   * @max 1000
   */
  quantity: number;
}

export interface GetCartResponseDTO {
  cart: CartItemDTO[];
}

export interface GetNameResponseDTO {
  name: string;
}

export interface DeleteCartItem {
  product_id: string;
  size_id: string;
}

export interface UpdateCartItem {
  product_id: string;
  size_id: string;
  /**
   * @min 1
   * @max 1000
   */
  quantity: 1 | -1;
}

export interface FavoritesResponseDTO {
  favourites: string[];
}

export interface CreateFavoriteDTO {
  product_id: string;
}

export interface ScoresHistoryItem {
  /** @format date-time */
  date: string;
  message: string;
  quantity: number;
}

export interface Scores {
  quantity: number;
  history: ScoresHistoryItem[];
}

export interface ScoresResponseDTO {
  promocode: string;
  scores: Scores;
}

export interface AddressDTO {
  /**
   * @minLength 2
   * @maxLength 256
   */
  city: string;
  /**
   * @minLength 2
   * @maxLength 512
   */
  address: string;
}

export interface AddressesDTO {
  addresses: AddressDTO[];
}

export interface PromocodeResponseDTO {
  type: "discount" | "partner" | "price" | "unknown";
  discount?: number;
  price?: number;
  partner?: string;
}

export interface ProductDTO2 {
  product_id: string;
  size_id: string;
  /**
   * @min 1
   * @max 10000
   */
  quantity: number;
}

export interface CreateOrderDTO {
  /**
   * @minLength 1
   * @maxLength 128
   */
  first_name: string;
  /**
   * @minLength 1
   * @maxLength 128
   */
  last_name: string;
  /**
   * @minLength 0
   * @maxLength 6
   */
  postal_code: string;
  phone_number: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  pvz: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  surname?: string;
  delivery_address: AddressDTO;
  delivery_method: "express_msk" | "cdek" | "postal";
  /**
   * @minLength 0
   * @maxLength 256
   */
  message: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  promocode?: string;
  products: ProductDTO2[];
}

export interface PartialDocumentDTO {
  _id: string;
}

export interface FileResponseDTO {
  _id: string;
  hash: string;
  mimetype: string;
  available_sizes: ("t" | "s" | "m" | "l" | "o" | "thumb" | "small" | "medium" | "large" | "original")[];
}

export interface CreateNewsDTO {
  title: string;
  subtitle: string;
  text: string;
  preview: string;
  photos: string[];
  to?: string;
  button_label?: string;
}

export interface PartialNewsDTO {
  _id: string;
  title: string;
  subtitle: string;
  /** @format date-time */
  created_at: string;
  preview: string;
  button_label: string;
  to: string;
}

export interface GetNewsResponseDTO {
  total_pages: number;
  total_items: number;
  content: PartialNewsDTO[];
}

export interface NewsResponseDTO {
  _id: string;
  title: string;
  subtitle: string;
  /** @format date-time */
  created_at: string;
  preview: string;
  button_label: string;
  to: string;
  text: string;
  photos: string[];
}

export interface UpdateNewsDTO {
  title?: string;
  subtitle?: string;
  text?: string;
  preview?: string;
  photos?: string[];
  to?: string;
  button_label?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;


    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title 3hundred API
 * @version 1.0.0
 * @contact
 *
 * desc
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags Dashboard Products
     * @name DashboardProductsControllerGetProducts
     * @request GET:/v1/dashboard/products
     */
    dashboardProductsControllerGetProducts: (
      query: {
        page: number;
        limit: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<object[], any>({
        path: `/v1/dashboard/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Products
     * @name DashboardProductsControllerCreateProduct
     * @request POST:/v1/dashboard/products
     */
    dashboardProductsControllerCreateProduct: (data: CreateProductDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/dashboard/products`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Products
     * @name DashboardProductsControllerUpdateProduct
     * @request PATCH:/v1/dashboard/products
     */
    dashboardProductsControllerUpdateProduct: (data: UpdateProductDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/dashboard/products`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Products
     * @name DashboardProductsControllerDeleteProduct
     * @request DELETE:/v1/dashboard/products
     */
    dashboardProductsControllerDeleteProduct: (data: DeleteProductDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/dashboard/products`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Products
     * @name DashboardProductsControllerCreateProductSize
     * @request POST:/v1/dashboard/products/size
     */
    dashboardProductsControllerCreateProductSize: (data: CreateSizeDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/dashboard/products/size`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Products
     * @name DashboardProductsControllerGetProduct
     * @request GET:/v1/dashboard/products/{id}
     */
    dashboardProductsControllerGetProduct: (id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/v1/dashboard/products/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Products
     * @name DashboardProductsControllerCreatePhoto
     * @request POST:/v1/dashboard/products/photo
     */
    dashboardProductsControllerCreatePhoto: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/dashboard/products/photo`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Orders
     * @name DashboardOrdersControllerGetOrders
     * @request GET:/v1/dashboard/orders
     */
    dashboardOrdersControllerGetOrders: (params: RequestParams = {}) =>
      this.request<GetOrderResponseDTO[], any>({
        path: `/v1/dashboard/orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Orders
     * @name DashboardOrdersControllerGetOrder
     * @request GET:/v1/dashboard/orders/order/{id}
     */
    dashboardOrdersControllerGetOrder: (id: string, params: RequestParams = {}) =>
      this.request<GetOrderResponseDTO, any>({
        path: `/v1/dashboard/orders/order/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Orders
     * @name DashboardOrdersControllerChangeStatus
     * @request PATCH:/v1/dashboard/orders/order/status
     */
    dashboardOrdersControllerChangeStatus: (data: ChangeStatusDTO, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/v1/dashboard/orders/order/status`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard Orders
     * @name DashboardOrdersControllerChangeTrackNumber
     * @request PATCH:/v1/dashboard/orders/order/track-number
     */
    dashboardOrdersControllerChangeTrackNumber: (data: ChangeTrackNumberDTO, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/v1/dashboard/orders/order/track-number`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthControllerSignIn
     * @request POST:/v1/auth/sign-in/phone-number
     */
    authControllerSignIn: (data: SignInDTO, params: RequestParams = {}) =>
      this.request<SignInResponseDTO, any>({
        path: `/v1/auth/sign-in/phone-number`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthControllerSignInTelegram
     * @request POST:/v1/auth/sign-in/telegram
     */
    authControllerSignInTelegram: (data: SignInTelegramDTO, params: RequestParams = {}) =>
      this.request<SignInTelegramResponseDTO, any>({
        path: `/v1/auth/sign-in/telegram`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthControllerVerify
     * @request POST:/v1/auth/verify
     */
    authControllerVerify: (data: VerifyDTO, params: RequestParams = {}) =>
      this.request<VerifyResponseDTO, any>({
        path: `/v1/auth/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthControllerProfileId
     * @request POST:/v1/auth/profile-id
     */
    authControllerProfileId: (data: SignUpDTO, params: RequestParams = {}) =>
      this.request<ProfileIdResponseDTO, any>({
        path: `/v1/auth/profile-id`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerGetCollections
     * @request GET:/v1/products/collections
     */
    productsControllerGetCollections: (params: RequestParams = {}) =>
      this.request<CollectionResponseDTO[], any>({
        path: `/v1/products/collections`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerGetVars
     * @request GET:/v1/products/vars
     */
    productsControllerGetVars: (params: RequestParams = {}) =>
      this.request<VariableGroupResponseDTO[], any>({
        path: `/v1/products/vars`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerGetFilters
     * @request GET:/v1/products/filters
     */
    productsControllerGetFilters: (
      query: {
        /** @default 10 */
        limit: number;
        /** @default 1 */
        page: number;
        /** @min 0 */
        max_price?: number;
        /** @min 0 */
        min_price?: number;
        type?: string[];
        brand?: string[];
        sizes?: string[];
        q?: string;
        is_new?: boolean;
        is_sale?: boolean;
        in_stock?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FiltersResponseDTO, any>({
        path: `/v1/products/filters`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerGetProducts
     * @request GET:/v1/products
     */
    productsControllerGetProducts: (
      query: {
        /** @default 10 */
        limit: number;
        /** @default 1 */
        page: number;
        /** @min 0 */
        max_price?: number;
        /** @min 0 */
        min_price?: number;
        type?: string[];
        brand?: string[];
        sizes?: string[];
        q?: string;
        is_new?: boolean;
        is_sale?: boolean;
        in_stock?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetProductsResponseDTO, any>({
        path: `/v1/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerGetProductsGroup
     * @request GET:/v1/products/group
     */
    productsControllerGetProductsGroup: (
      query: {
        product_id: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PartialProductResponseDTO[], any>({
        path: `/v1/products/group`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerGetProduct
     * @request GET:/v1/products/{id}
     */
    productsControllerGetProduct: (id: string, params: RequestParams = {}) =>
      this.request<ProductResponseDTO, any>({
        path: `/v1/products/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerGetCart
     * @request GET:/v1/profile/cart
     */
    profilesControllerGetCart: (params: RequestParams = {}) =>
      this.request<GetCartResponseDTO, any>({
        path: `/v1/profile/cart`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerCreateCartItem
     * @request POST:/v1/profile/cart
     */
    profilesControllerCreateCartItem: (data: CartItemDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/profile/cart`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerDeleteCartItem
     * @request DELETE:/v1/profile/cart
     */
    profilesControllerDeleteCartItem: (data: DeleteCartItem, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/profile/cart`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerUpdateCartItem
     * @request PATCH:/v1/profile/cart
     */
    profilesControllerUpdateCartItem: (data: UpdateCartItem, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/profile/cart`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerGetName
     * @request GET:/v1/profile/info/name/{id}
     */
    profilesControllerGetName: (id: string, params: RequestParams = {}) =>
      this.request<GetNameResponseDTO, any>({
        path: `/v1/profile/info/name/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerGetAvatar
     * @request GET:/v1/profile/info/avatar/{id}
     */
    profilesControllerGetAvatar: (id: string, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/v1/profile/info/avatar/${id}`,
        method: "GET",
        format: "blob",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerGetFavorites
     * @request GET:/v1/profile/favorites
     */
    profilesControllerGetFavorites: (params: RequestParams = {}) =>
      this.request<FavoritesResponseDTO, any>({
        path: `/v1/profile/favorites`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerCreateFavorites
     * @request POST:/v1/profile/favorites
     */
    profilesControllerCreateFavorites: (data: CreateFavoriteDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/profile/favorites`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerDeleteFavorites
     * @request DELETE:/v1/profile/favorites
     */
    profilesControllerDeleteFavorites: (data: CreateFavoriteDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/profile/favorites`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerGetScores
     * @request GET:/v1/profile/scores
     */
    profilesControllerGetScores: (params: RequestParams = {}) =>
      this.request<ScoresResponseDTO, any>({
        path: `/v1/profile/scores`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerCreateAddress
     * @request POST:/v1/profile/address
     */
    profilesControllerCreateAddress: (data: AddressDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/profile/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilesControllerGetAddresses
     * @request GET:/v1/profile/address
     */
    profilesControllerGetAddresses: (params: RequestParams = {}) =>
      this.request<AddressesDTO, any>({
        path: `/v1/profile/address`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderControllerGetPromocode
     * @request GET:/v1/order/promocode/{id}
     */
    orderControllerGetPromocode: (id: string, params: RequestParams = {}) =>
      this.request<PromocodeResponseDTO, any>({
        path: `/v1/order/promocode/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderControllerGetOrder
     * @request GET:/v1/order/{id}
     */
    orderControllerGetOrder: (id: string, params: RequestParams = {}) =>
      this.request<GetOrderResponseDTO, any>({
        path: `/v1/order/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderControllerGetAll
     * @request GET:/v1/order
     */
    orderControllerGetAll: (params: RequestParams = {}) =>
      this.request<GetOrderResponseDTO[], any>({
        path: `/v1/order`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderControllerCreateOrder
     * @request POST:/v1/order
     */
    orderControllerCreateOrder: (data: CreateOrderDTO, params: RequestParams = {}) =>
      this.request<PartialDocumentDTO, any>({
        path: `/v1/order`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerPost
     * @request POST:/v1/files
     */
    filesControllerPost: (params: RequestParams = {}) =>
      this.request<PartialDocumentDTO, any>({
        path: `/v1/files`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerGet
     * @request GET:/v1/files/{id}
     */
    filesControllerGet: (id: string, params: RequestParams = {}) =>
      this.request<FileResponseDTO, any>({
        path: `/v1/files/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerPatch
     * @request PATCH:/v1/files/{id}
     */
    filesControllerPatch: (id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/v1/files/${id}`,
        method: "PATCH",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerDelete
     * @request DELETE:/v1/files/{id}
     */
    filesControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/v1/files/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerView
     * @request GET:/v1/files/{id}/{size}
     */
    filesControllerView: (id: string, size: string, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/v1/files/${id}/${size}`,
        method: "GET",
        format: "blob",
        ...params,
      }),

    /**
     * No description
     *
     * @tags News
     * @name NewsControllerPost
     * @request POST:/v1/news
     */
    newsControllerPost: (data: CreateNewsDTO, params: RequestParams = {}) =>
      this.request<PartialDocumentDTO, any>({
        path: `/v1/news`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags News
     * @name NewsControllerGetAll
     * @request GET:/v1/news
     */
    newsControllerGetAll: (
      query: {
        /** @default 10 */
        limit: number;
        /** @default 1 */
        page: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetNewsResponseDTO, any>({
        path: `/v1/news`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags News
     * @name NewsControllerGet
     * @request GET:/v1/news/{id}
     */
    newsControllerGet: (id: string, params: RequestParams = {}) =>
      this.request<NewsResponseDTO, any>({
        path: `/v1/news/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags News
     * @name NewsControllerPatch
     * @request PATCH:/v1/news/{id}
     */
    newsControllerPatch: (id: string, data: UpdateNewsDTO, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/v1/news/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags News
     * @name NewsControllerDelete
     * @request DELETE:/v1/news/{id}
     */
    newsControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/v1/news/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
