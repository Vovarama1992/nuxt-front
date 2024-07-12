//HEADER

// MAIN

GET /content/slides
DELETE
PATCH

{
  _id
  title
  to
  preview
}[]

GET /content/compilations
DELETE
PATCH

{
  _id
  title
  products (20)
  to
}[]

GET /content/variables?group="brand"

{
  _id
  title
}[]

// CATALOG

GET /products/page/1? (30)
price_lte=
price_gte
brand=
type=
is_sale=
is_new=
in_stock=
size=
discount=1|-1
price=1|-1

{
  products: {
    _id
    preview
    photos
    title
    discount
    price
    in_stock
    is_sale
    is_new
  }[];
  total_items
}

GET /product/_id