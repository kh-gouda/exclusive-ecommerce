import sql from "@/app/lib/db";
import {
  FETCHED_AD_TYPE,
  FETCHED_BEST_SELLING_PRODUCT_TYPE,
  FETCHED_CATEGORY_TYPE,
  FETCHED_NEW_ARRIVALS_TYPE,
  FETCHED_NEW_COLLECTION_TYPE,
  FETCHED_PRODUCT_CARD_TYPE,
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
    const response = await sql`select * from categories`;
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
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
    LIMIT 16;
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
    select * from ads where adarea = 1 and endtime > now();
  `;

  return data;
}

export async function fetchSecondAd() {
  const data = await sql<FETCHED_AD_TYPE[]>`
    select * from ads where adarea = 2 and endtime > now();
  `;

  return data;
}
