"use server";

import sql from "@/app/lib/db";
import { FETCHED_PRODUCT_CARD_TYPE } from "@/app/lib/typeDefinitions";

export default async function fetchSearchResult(searchItem: string) {
  const queryPattern = `%${searchItem}%`;
  const result = await sql<FETCHED_PRODUCT_CARD_TYPE[]>`
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
    where p.productname ilike ${queryPattern} or p.productdescription ilike ${queryPattern}
  `;

  return result;
}
