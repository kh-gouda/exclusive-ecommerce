import sql from "@/app/lib/db";
import {
  categories_seed,
  colors_seed,
  products_seed,
  ratings_seed,
  sizes_seed,
  subCategories_seed,
} from "@/app/lib/seedProducts";

async function seedProducts() {
  await sql`
  create table if not exists products (
    productId serial primary key,
    productName text unique not null,
    productDescription text not null,
    productImages text[] not null,
    productPrice numeric(10, 2) not null check (productPrice > 0),
    productDiscount int not null check (productDiscount >= 0 and productDiscount <= 100) default 0,
    productCreatedAt timestamp default now(),
    productUpdatedAt timestamp default now(),
    newProduct bool default false
  )`;

  const insertedProducts = await Promise.all(
    products_seed.map(
      (product) =>
        sql`
        INSERT INTO products (productName, productDescription, productImages, productPrice, newProduct)
        VALUES (${product.productName}, ${product.productDescription}, ${product.productImages}, ${product.productPrice}, ${product.newProduct})
        ON CONFLICT (productName) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

async function seedCategories() {
  await sql`
  create table if not exists categories (
    categoryId serial primary key,
    category text unique not null
  )`;

  const insertedCategories = await Promise.all(
    categories_seed.map(
      (category) =>
        sql`
        INSERT INTO categories (category)
        VALUES (${category})
        ON CONFLICT (category) DO NOTHING;
      `,
    ),
  );

  return insertedCategories;
}

async function seedSubCategories() {
  await sql`
  create table if not exists subCategories (
    subCategoryId serial primary key,
    subCategory text unique not null,
    icon text,
    categoryId int references categories(categoryId) on delete set null
  )`;

  const insertedSubCategories = await Promise.all(
    subCategories_seed.map(
      (subCategory) =>
        sql`
        INSERT INTO subCategories (subCategory, icon, categoryId)
        VALUES (${subCategory.subCategory}, ${subCategory.icon}, ${subCategory.categoryId})
        ON CONFLICT (subCategory) DO NOTHING;
      `,
    ),
  );

  return insertedSubCategories;
}

async function seedColors() {
  await sql`
  create table if not exists colors (
    colorId serial primary key,
    colorHex text unique not null
  )`;

  const insertedColors = await Promise.all(
    colors_seed.map(
      (color) =>
        sql`
        INSERT INTO colors (colorHex)
        VALUES (${color})
        ON CONFLICT (colorHex) DO NOTHING;
      `,
    ),
  );

  return insertedColors;
}

async function seedSizes() {
  await sql`
  create table if not exists sizes (
    sizeId serial primary key,
    size text unique not null
  )`;

  const insertedSizes = await Promise.all(
    sizes_seed.map(
      (size) =>
        sql`
        INSERT INTO sizes (size)
        VALUES (${size})
        ON CONFLICT (size) DO NOTHING;
      `,
    ),
  );

  return insertedSizes;
}

async function seedRatings() {
  await sql`
  create table if not exists ratings (
    ratingId serial primary key,
    ratingValue int not null check (ratingValue >= 1 and ratingValue <= 5)
  )`;

  const insertedRatings = await Promise.all(
    ratings_seed.map(
      (rating) =>
        sql`
        INSERT INTO ratings (ratingValue)
        VALUES (${rating});
      `,
    ),
  );

  return insertedRatings;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedProducts(),
      seedCategories(),
      seedSubCategories(),
      seedColors(),
      seedSizes(),
      seedRatings(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
