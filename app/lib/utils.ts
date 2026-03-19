import sql from "@/app/lib/db";
import {
  FETCHED_AD_TYPE,
  FETCHED_BEST_SELLING_PRODUCT_TYPE,
  FETCHED_CATEGORY_TYPE,
  FETCHED_NEW_ARRIVALS_TYPE,
  FETCHED_NEW_COLLECTION_TYPE,
  FETCHED_ORDER_TYPE,
  FETCHED_PRODUCT_BY_ID_TYPE,
  FETCHED_PRODUCT_CARD_TYPE,
  FETCHED_STAFF_TYPE,
  FETCHED_USER_ORDERS,
} from "@/app/lib/typeDefinitions";

export function createSlides<T>(arr: T[], slideSize: number): T[][] {
  if (slideSize <= 0) {
    throw new Error("Chunk size must be a positive number.");
  }

  const slides: T[][] = [];
  for (let i = 0; i < arr.length; i += slideSize) {
    const slide = arr.slice(i, i + slideSize);
    slides.push(slide);
  }
  return slides;
}

export async function fetchCategories() {
  try {
    const response = await sql<
      { categoryid: number; category: string }[]
    >`select * from categories`;
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchFlashSalesProductsLimited() {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
  WITH RatedProducts AS (
    -- Calculate rating count and the most common (max counted) rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        -- MODE() WITHIN GROUP calculates the most frequent value
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
  )
    SELECT 
      fs.flashsaleid,
      fs.endtime,
      p.productid,
      p.productname,
      p.productimages,
      p.productprice,
      fsp.productdiscount,
      COALESCE(rp.voters, 0) AS voters,
      rp.stars AS stars
    FROM 
      flashsalesproducts fsp
    INNER JOIN 
      products p ON fsp.productid = p.productid
    INNER JOIN 
      flashsales fs ON fsp.flashsaleid = fs.flashsaleid
    INNER JOIN 
      RatedProducts rp ON fsp.productid = rp.productid
    WHERE 
      fs.endtime > NOW()
    ORDER BY 
    fs.endtime ASC, fsp.productdiscount DESC
    limit 8;
  `;

  return data;
}
export async function fetchFlashSalesProducts() {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
  WITH RatedProducts AS (
    -- Calculate rating count and the most common (max counted) rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        -- MODE() WITHIN GROUP calculates the most frequent value
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
  )
    SELECT 
      fs.flashsaleid,
      fs.endtime,
      p.productid,
      p.productname,
      p.productimages,
      p.productprice,
      fsp.productdiscount,
      COALESCE(rp.voters, 0) AS voters,
      rp.stars AS stars
    FROM 
      flashsalesproducts fsp
    INNER JOIN 
      products p ON fsp.productid = p.productid
    INNER JOIN 
      flashsales fs ON fsp.flashsaleid = fs.flashsaleid
    INNER JOIN 
      RatedProducts rp ON fsp.productid = rp.productid
    WHERE 
      fs.endtime > NOW()
    ORDER BY 
    fs.endtime ASC, fsp.productdiscount DESC;
  `;

  return data;
}

export async function fetchSubCategories() {
  const data = await sql<FETCHED_CATEGORY_TYPE[]>`
    SELECT * FROM subcategories order by subcategoryid asc
  `;

  return data;
}

export async function fetchBestSellingProductsLimited() {
  const data = await sql<FETCHED_BEST_SELLING_PRODUCT_TYPE[]>`
    WITH TopSellingProducts AS (
    -- Calculate total quantity sold per product and get top 4
    SELECT 
        productid, 
        SUM(quantity) AS total_sold
    FROM orderitems
    GROUP BY productid
    ORDER BY total_sold DESC
    LIMIT 4
),
RatedProducts AS (
    -- Calculate rating count and the most common rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
)
SELECT 
    p.productid,
    p.productname,
    p.productimages,
    p.productprice,
	p.productdiscount,
    tsp.total_sold,
    COALESCE(rp.voters, 0) AS voters,
    rp.stars AS stars
FROM 
    TopSellingProducts tsp
INNER JOIN 
    products p ON tsp.productid = p.productid
LEFT JOIN 
    RatedProducts rp ON tsp.productid = rp.productid
ORDER BY 
    tsp.total_sold DESC;
  `;

  return data;
}
export async function fetchBestSellingProducts() {
  const data = await sql<FETCHED_BEST_SELLING_PRODUCT_TYPE[]>`
    WITH TopSellingProducts AS (
    -- Calculate total quantity sold per product and get top 4
    SELECT 
        productid, 
        SUM(quantity) AS total_sold
    FROM orderitems
    GROUP BY productid
    ORDER BY total_sold DESC
),
RatedProducts AS (
    -- Calculate rating count and the most common rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
)
SELECT 
    p.productid,
    p.productname,
    p.productimages,
    p.productprice,
	p.productdiscount,
    tsp.total_sold,
    COALESCE(rp.voters, 0) AS voters,
    rp.stars AS stars
FROM 
    TopSellingProducts tsp
INNER JOIN 
    products p ON tsp.productid = p.productid
LEFT JOIN 
    RatedProducts rp ON tsp.productid = rp.productid
ORDER BY 
    tsp.total_sold DESC;
  `;

  return data;
}

export async function fetchAllProductsLimited() {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
    WITH RatedProducts AS (
      -- Calculate rating count and the most common (max counted) rating value
      SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
      FROM productratings
      GROUP BY productid
    ),
    ProductStockInfo AS (
      -- Aggregate distinct colors and sizes for each product
      SELECT 
        s.productid,
        ARRAY_AGG(DISTINCT c.colorHex) AS colors
      FROM stock s
      LEFT JOIN colors c ON s.colorid = c.colorid
      GROUP BY s.productid
    )
    SELECT 
      p.productid, 
      p.productname, 
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      COALESCE(rp.voters, 0) AS voters, 
      rp.stars AS stars,
      COALESCE(psi.colors, ARRAY[]::text[]) AS colors -- Returns empty array if no colors
    FROM products p
    LEFT JOIN RatedProducts rp ON p.productid = rp.productid
    LEFT JOIN ProductStockInfo psi ON p.productid = psi.productid
    LIMIT 16;
  `;

  return data;
}

export async function fetchAllProducts() {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
    WITH RatedProducts AS (
      -- Calculate rating count and the most common (max counted) rating value
      SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
      FROM productratings
      GROUP BY productid
    ),
    ProductStockInfo AS (
      -- Aggregate distinct colors and sizes for each product
      SELECT 
        s.productid,
        ARRAY_AGG(DISTINCT c.colorHex) AS colors
      FROM stock s
      LEFT JOIN colors c ON s.colorid = c.colorid
      GROUP BY s.productid
    )
    SELECT 
      p.productid, 
      p.productname, 
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      COALESCE(rp.voters, 0) AS voters, 
      rp.stars AS stars,
      COALESCE(psi.colors, ARRAY[]::text[]) AS colors -- Returns empty array if no colors
    FROM products p
    LEFT JOIN RatedProducts rp ON p.productid = rp.productid
    LEFT JOIN ProductStockInfo psi ON p.productid = psi.productid
  `;

  return data;
}

export async function fetchNewArrivals() {
  const data = await sql<FETCHED_NEW_ARRIVALS_TYPE[]>`
  select p.productid, p.productname, p.productdescription, p.productimages
  from products p
  join newarrivals n on n.productid = p.productid
  where now() - n.arriveat < interval '1 months'
  order by productid
  limit 3;`;

  return data;
}

export async function fetchNewCollection() {
  const data = await sql<FETCHED_NEW_COLLECTION_TYPE[]>`
  select collectionid, collectiontitle, collectiondescription, categoryid
  from newcollections
  where now() - arriveat < interval '1 months'
  limit 1;`;

  return data;
}

export async function fetchFirstAd() {
  const data = await sql<FETCHED_AD_TYPE[]>`
    select * from ads where adarea = 1 and endtime > now() and adpaid = true
    order by adid
  `;

  return data;
}

export async function fetchSecondAd() {
  const data = await sql<FETCHED_AD_TYPE[]>`
    select * from ads where adarea = 2 and endtime > now() and adpaid = true;
  `;

  return data;
}

export async function fetchProductsByCategoryId(categoryId: number) {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
    WITH RatedProducts AS (
      -- Calculate rating count and the most common (max counted) rating value
      SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
      FROM productratings
      GROUP BY productid
    ),
    ProductStockInfo AS (
      -- Aggregate distinct colors and sizes for each product
      SELECT 
        s.productid,
        ARRAY_AGG(DISTINCT c.colorHex) AS colors
      FROM stock s
      LEFT JOIN colors c ON s.colorid = c.colorid
      GROUP BY s.productid
    )
    SELECT 
      p.productid, 
      p.productname, 
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      COALESCE(rp.voters, 0) AS voters, 
      rp.stars AS stars,
      COALESCE(psi.colors, ARRAY[]::text[]) AS colors -- Returns empty array if no colors
    FROM products p
    INNER JOIN productcategories pc ON p.productid = pc.productid
    LEFT JOIN RatedProducts rp ON p.productid = rp.productid
    LEFT JOIN ProductStockInfo psi ON p.productid = psi.productid
    WHERE pc.categoryid = ${categoryId}
  `;

  return data;
}

export async function fetchCategoryById(categoryId: number) {
  const data = await sql<{ category: string }[]>`
    SELECT category
    FROM categories
    WHERE categoryid = ${categoryId}
  `;

  return data;
}

export async function fetchProductById(productId: number) {
  const data = await sql<FETCHED_PRODUCT_BY_ID_TYPE[]>`
WITH ProductRatings AS (
    -- Calculate total voters and most common rating (mode) per product
    SELECT 
        pr.productid, COUNT(pr.userid) AS voters, -- MODE() returns the most frequent value
        MODE() WITHIN GROUP (ORDER BY r.ratingvalue) AS stars 
    FROM productratings pr
    JOIN ratings r ON pr.ratingid = r.ratingid
    GROUP BY pr.productid
), ProductStock AS (
    -- Aggregate stock data into a JSON array of objects
    SELECT 
        s.productid, jsonb_agg(
            jsonb_build_object(
                'color', c.colorhex,
				'size', sz.size,
				'quantity', s.quantity
            )
        ) AS stock_array
    FROM stock s
    JOIN colors c ON s.colorid = c.colorid
    JOIN sizes sz ON s.sizeid = sz.sizeid
    GROUP BY s.productid
), productCategory as (
select
categoryid, productid from productcategories pc
)
SELECT 
    p.productid, 
      p.productname,
      p.productdescription,
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      pc.categoryid,
    COALESCE(pr.voters, 0) AS voters, COALESCE(pr.stars, 0) AS stars, COALESCE(ps.stock_array,'[]'::jsonb) AS stock
FROM products p
LEFT JOIN ProductRatings pr ON p.productid = pr.productid
LEFT JOIN ProductStock ps ON p.productid = ps.productid
left join productcategories pc on pc.productid = p.productid
where p.productid = ${productId};

  `;

  return data;
}

export async function fetchProductsBySubCategoryId(subCategoryId: number) {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
    WITH RatedProducts AS (
      -- Calculate rating count and the most common (max counted) rating value
      SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
      FROM productratings
      GROUP BY productid
    ),
    ProductStockInfo AS (
      -- Aggregate distinct colors and sizes for each product
      SELECT 
        s.productid,
        ARRAY_AGG(DISTINCT c.colorHex) AS colors
      FROM stock s
      LEFT JOIN colors c ON s.colorid = c.colorid
      GROUP BY s.productid
    )
    SELECT 
      p.productid, 
      p.productname, 
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      COALESCE(rp.voters, 0) AS voters, 
      rp.stars AS stars,
      COALESCE(psi.colors, ARRAY[]::text[]) AS colors -- Returns empty array if no colors
    FROM products p
    INNER JOIN productcategories pc ON p.productid = pc.productid
    LEFT JOIN RatedProducts rp ON p.productid = rp.productid
    LEFT JOIN ProductStockInfo psi ON p.productid = psi.productid
    WHERE pc.subcategoryid = ${subCategoryId}
  `;

  return data;
}

export async function fetchSubCategoryById(subCategoryId: number) {
  const data = await sql<{ subcategory: string }[]>`
    SELECT subcategory
    FROM subcategories
    WHERE subcategoryid = ${subCategoryId}
  `;

  return data;
}

export async function fetchProductsByCategoryIdLimited(
  categoryId: number,
  subCategoryId: number,
) {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
    WITH RatedProducts AS (
      -- Calculate rating count and the most common (max counted) rating value
      SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
      FROM productratings
      GROUP BY productid
    ),
    ProductStockInfo AS (
      -- Aggregate distinct colors and sizes for each product
      SELECT 
        s.productid,
        ARRAY_AGG(DISTINCT c.colorHex) AS colors
      FROM stock s
      LEFT JOIN colors c ON s.colorid = c.colorid
      GROUP BY s.productid
    )
    SELECT 
      p.productid, 
      p.productname, 
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      COALESCE(rp.voters, 0) AS voters, 
      rp.stars AS stars,
      COALESCE(psi.colors, ARRAY[]::text[]) AS colors -- Returns empty array if no colors
    FROM products p
    INNER JOIN productcategories pc ON p.productid = pc.productid
    LEFT JOIN RatedProducts rp ON p.productid = rp.productid
    LEFT JOIN ProductStockInfo psi ON p.productid = psi.productid
    WHERE pc.categoryid = ${categoryId} and pc.subcategoryid != ${subCategoryId}
    limit 4
  `;

  return data;
}

export async function fetchProductsByCategoryId2Limited(categoryId: number) {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
    WITH RatedProducts AS (
      -- Calculate rating count and the most common (max counted) rating value
      SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
      FROM productratings
      GROUP BY productid
    ),
    ProductStockInfo AS (
      -- Aggregate distinct colors and sizes for each product
      SELECT 
        s.productid,
        ARRAY_AGG(DISTINCT c.colorHex) AS colors
      FROM stock s
      LEFT JOIN colors c ON s.colorid = c.colorid
      GROUP BY s.productid
    )
    SELECT 
      p.productid, 
      p.productname, 
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      COALESCE(rp.voters, 0) AS voters, 
      rp.stars AS stars,
      COALESCE(psi.colors, ARRAY[]::text[]) AS colors -- Returns empty array if no colors
    FROM products p
    INNER JOIN productcategories pc ON p.productid = pc.productid
    LEFT JOIN RatedProducts rp ON p.productid = rp.productid
    LEFT JOIN ProductStockInfo psi ON p.productid = psi.productid
    WHERE pc.categoryid = ${categoryId}
    limit 4
  `;

  return data;
}

export async function fetchStaff() {
  const data = await sql<FETCHED_STAFF_TYPE[]>`
  SELECT 
    employeeid as id,
    employeename as name,
    employeeimage as image,
    employeejobtitle as jobTitle,
    employeesociallinks as socialLinks
  FROM 
    staff 
  WHERE 
    employeestatus = 'active';
  `;

  return data;
}

export async function fetchWishList(id: number) {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
  WITH RatedProducts AS (
    -- Calculate rating count and the most common (max counted) rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        -- MODE() WITHIN GROUP calculates the most frequent value
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
  )
    SELECT 
      p.productid,
      p.productname,
      p.productimages,
      p.productprice,
      p.productdiscount,
      COALESCE(rp.voters, 0) AS voters,
      rp.stars AS stars,
      pc.categoryid
    FROM  
      products p 
    INNER JOIN 
      wishlist wl ON wl.productid = p.productid
    INNER JOIN 
      RatedProducts rp ON p.productid = rp.productid
    INNER JOIN
	    productcategories pc on pc.productid = p.productid
    WHERE 
      wl.userid = ${id}
    ORDER BY 
    p.productid ASC;
  `;

  return data;
}

export async function fetchCartProducts(id: number) {
  const data = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
  WITH RatedProducts AS (
    -- Calculate rating count and the most common (max counted) rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        -- MODE() WITHIN GROUP calculates the most frequent value
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
  )
    SELECT 
      p.productid,
      p.productname,
      p.productimages,
      p.productprice,
      p.productdiscount,
      COALESCE(rp.voters, 0) AS voters,
      rp.stars AS stars,
      pc.categoryid,
      sc.quantity
    FROM  
      products p 
    INNER JOIN 
      shoppingcart sc ON sc.productid = p.productid
    INNER JOIN 
      RatedProducts rp ON p.productid = rp.productid
    INNER JOIN
	    productcategories pc on pc.productid = p.productid
    WHERE 
      sc.userid = ${id}
    ORDER BY 
    p.productid ASC;
  `;

  return data;
}

export async function fetchOrderById(orderId: number) {
  const order = await sql<FETCHED_ORDER_TYPE[]>`
SELECT
    o.orderid,
	  o.userid,
    u.phone,
    o.orderstatus,
    o.orderdate,
    o.paymentmethod,
    o.appliedcoupon,
    o.appliedcoupondiscount,
    o.orderpaid,
    o.orderconfirmed,
    json_agg(
        json_build_object(
            'productid', oi.productid,
            'quantity', oi.quantity,
            'unit_price', oi.unitprice,
            'productname', p.productname,
            'productimages', p.productimages
        )
    ) AS orderitems
FROM
    orders o
JOIN
    users u ON o.userid = u.userid
JOIN
    orderitems oi ON o.orderid = oi.orderid
JOIN
    products p ON oi.productid = p.productid
where o.orderid = ${orderId}
GROUP BY
    o.orderid, u.phone; 
`;
  return order;
}

export async function fetchUserOrders(userId: number) {
  const orders = await sql<FETCHED_USER_ORDERS[]>`
  select * from orders where userid = ${userId} order by orderid
  `;

  return orders;
}

export async function fetchDashBoardProducts() {
  const data = await sql<FETCHED_PRODUCT_BY_ID_TYPE[]>`
WITH ProductRatings AS (
    -- Calculate total voters and most common rating (mode) per product
    SELECT 
        pr.productid, COUNT(pr.userid) AS voters, -- MODE() returns the most frequent value
        MODE() WITHIN GROUP (ORDER BY r.ratingvalue) AS stars 
    FROM productratings pr
    JOIN ratings r ON pr.ratingid = r.ratingid
    GROUP BY pr.productid
), ProductStock AS (
    -- Aggregate stock data into a JSON array of objects
    SELECT 
        s.productid, jsonb_agg(
            jsonb_build_object(
                'color', c.colorhex,
				'size', sz.size,
				'quantity', s.quantity
            )
        ) AS stock_array
    FROM stock s
    JOIN colors c ON s.colorid = c.colorid
    JOIN sizes sz ON s.sizeid = sz.sizeid
    GROUP BY s.productid
), productCategory as (
select
categoryid, productid from productcategories pc
)
SELECT 
    p.productid, 
      p.productname,
      p.productdescription,
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
      pc.categoryid,
    COALESCE(pr.voters, 0) AS voters, COALESCE(pr.stars, 0) AS stars, COALESCE(ps.stock_array,'[]'::jsonb) AS stock
FROM products p
LEFT JOIN ProductRatings pr ON p.productid = pr.productid
LEFT JOIN ProductStock ps ON p.productid = ps.productid
left join productcategories pc on pc.productid = p.productid
  `;

  return data;
}

export async function fetchColors() {
  const colors = await sql<{ colorid: number; colorhex: string }[]>`
  select * from colors
  `;

  return colors;
}

export async function fetchSizes() {
  const sizes = await sql<{ sizeid: number; size: string }[]>`
  select * from sizes
  `;

  return sizes;
}
