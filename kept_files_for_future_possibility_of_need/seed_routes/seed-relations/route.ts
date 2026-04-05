import sql from "@/app/lib/db";
import {
  discount_seed,
  flashSales_seed,
  flashSalesProducts_seed,
  product_category_seed,
  rating_seed,
  staff_seed,
  stock_seed,
  wishList_seed,
} from "@/kept_files_for_future_possibility_of_need/seedRelations";

async function seedProductCategories() {
  await sql`
  create table if not exists productCategories (
    productCategoryId serial primary key,
    productId int references products(productId) on delete cascade,
    categoryId int references categories(categoryId) on delete set null,
    subCategoryId int references subCategories(subCategoryId) on delete set null,
    unique (productId, categoryId, subCategoryId)
  )`;

  const productCategories = await Promise.all(
    product_category_seed.map(
      (productCategory) =>
        sql`
        INSERT INTO productCategories (productId, categoryId, subCategoryId)
        VALUES (${productCategory.productId}, ${productCategory.categoryId}, ${productCategory.subCategoryId})
        ON CONFLICT (productId, categoryId, subCategoryId) DO NOTHING;
      `,
    ),
  );

  return productCategories;
}

async function seedStock() {
  await sql`
  create table if not exists stock (
    stockId serial primary key,
    productId int references products(productId) on delete cascade,
    sizeId int references sizes(sizeId) on delete cascade,
    colorId int references colors(colorId) on delete cascade,
    quantity int not null default 0,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),
    unique (productId, sizeId, colorId)
  )`;

  const insertedStock = await Promise.all(
    stock_seed.map(
      (stock) =>
        sql`
        INSERT INTO stock (productId, sizeId, colorId, quantity)
        VALUES (${stock.productId}, ${stock.sizeId}, ${stock.colorId}, ${stock.quantity})
        ON CONFLICT (productId, sizeId, colorId) DO NOTHING;
      `,
    ),
  );

  return insertedStock;
}

async function seedProductRatings() {
  await sql`
  create table if not exists productRatings (
    productRatingId serial primary key,
    userId int references users(userId) on delete cascade,
    productId int references products(productId) on delete cascade,
    ratingId int references ratings(ratingId) on delete set null,
    unique (userId, productId)
  )`;

  const insertedProductRatings = await Promise.all(
    rating_seed.map(
      (rating) =>
        sql`
        INSERT INTO productRatings (userId, productId, ratingId)
        VALUES (${rating.userId}, ${rating.productId}, ${rating.ratingId})
        ON CONFLICT (userId, productId) DO NOTHING;
      `,
    ),
  );

  return insertedProductRatings;
}

async function seedProductsDiscounts() {
  const insertedDiscounts = await Promise.all(
    discount_seed.map(
      (discount) =>
        sql`
        update products
        set productDiscount = ${discount.productDiscount}
        where productId = ${discount.productId};
      `,
    ),
  );

  return insertedDiscounts;
}

async function seedFlashSales() {
  await sql`
  create table if not exists flashSales (
    flashSaleId serial primary key,
    occasion text not null,
    startTime timestamp not null default now(),
    endTime timestamp not null default now() + interval '3 day'
  )`;

  const insertedFlashSales = await Promise.all(
    flashSales_seed.map(
      (flashSale) =>
        sql`
        INSERT INTO flashSales (occasion, endTime)
        VALUES (${flashSale.occasion}, ${flashSale.endTime});
      `,
    ),
  );

  return insertedFlashSales;
}

async function seedFlashSalesProducts() {
  await sql`
  create table if not exists flashSalesProducts (
    flashSaleId int references flashSales(flashSaleId) on delete cascade,
    productId int references products(productId) on delete cascade,
    productDiscount int not null check (productDiscount >= 0 and productDiscount <= 100) default 25,
    unique (flashSaleId, productId)
  )`;

  const insertedFlashSalesProducts = await Promise.all(
    flashSalesProducts_seed.map(
      (flashSaleProduct) =>
        sql`
            INSERT INTO flashSalesProducts (flashSaleId, productId, productDiscount)
            VALUES (${flashSaleProduct.flashSaleId}, ${flashSaleProduct.productId}, ${flashSaleProduct.productDiscount})
            ON CONFLICT (flashSaleId, productId) DO NOTHING;
        `,
    ),
  );

  return insertedFlashSalesProducts;
}

async function seedWishList() {
  await sql`
    create table if not exists wishList (
      userId int references users(userId) on delete cascade,
      productId int references products(productId) on delete cascade,
      unique (userId, productId)
    )`;

  const insertedWishList = await Promise.all(
    wishList_seed.map(
      (wishListItem) =>
        sql`
          INSERT INTO wishList (userId, productId)
          VALUES (${wishListItem.userId}, ${wishListItem.productId})
          ON CONFLICT (userId, productId) DO NOTHING;
        `,
    ),
  );

  return insertedWishList;
}

async function seedOrders() {
  await sql`
  create table if not exists orders (
    orderId serial primary key,
    userId int references users(userId) on delete cascade,
    orderStatus text not null default 'pending',
    orderDate timestamp not null default now()
  )`;
}

async function seedOrderItems() {
  await sql`
  create table if not exists orderItems (
    orderId int references orders(orderId) on delete cascade,
    productId int references products(productId) on delete cascade,
    quantity int not null check (quantity > 0),
    unique (orderId, productId)
  )`;
}

async function seedStaff() {
  await sql`
  create table if not exists staff (
    employeeId serial primary key,
    employeeName text not null,
    employeeJobTitle text not null,
    employeeImage text not null,
    employeeSocialLinks jsonb not null,
    employeeStatus text not null default 'active',
    employeeCreatedAt timestamp default now(),
    employeeUpdatedAt timestamp default now()
  )`;

  const insertedStaff = await Promise.all(
    staff_seed.map(
      (employee) =>
        sql`
        INSERT INTO staff (employeeName, employeeJobTitle, employeeImage, employeeSocialLinks)
        VALUES (${employee.employeeName}, ${employee.employeeJobTitle}, ${employee.employeeImage}, ${JSON.stringify(employee.employeeSocialLinks)})
      `,
    ),
  );

  return insertedStaff;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedProductCategories(),
      seedStock(),
      seedProductRatings(),
      seedProductsDiscounts(),
      seedFlashSales(),
      seedFlashSalesProducts(),
      seedWishList(),
      seedOrders(),
      seedOrderItems(),
      seedStaff(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
