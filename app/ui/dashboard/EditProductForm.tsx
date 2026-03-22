"use client";
import {
  FETCHED_CATEGORY_TYPE,
  FETCHED_DASHBOARD_PRODUCT_BY_ID_TYPE,
} from "@/app/lib/typeDefinitions";
import ImagesPreview from "@ui/product_details/ImagesPreview";
import { ChangeEvent, useState } from "react";

export default function EditProductForm({
  product,
  categories,
  subcategories,
  colors,
  sizes,
}: {
  product: FETCHED_DASHBOARD_PRODUCT_BY_ID_TYPE;
  categories: { categoryid: number; category: string }[];
  subcategories: FETCHED_CATEGORY_TYPE[];
  colors: { colorid: number; colorhex: string }[];
  sizes: { sizeid: number; size: string }[];
}) {
  const [name, setName] = useState(product.productname);
  const [editName, setEditName] = useState(false);
  const handleEditName = () => {
    setEditName(true);
  };
  const handleCancelEditName = () => {
    setName(product.productname);
    setEditName(false);
  };
  const handleSaveName = () => {
    setEditName(false);
  };

  const [description, setDescription] = useState(product.productdescription);
  const [editDescription, setEditDescription] = useState(false);
  const handleEditDescription = () => {
    setEditDescription(true);
  };
  const handleCancelEditDescription = () => {
    setDescription(product.productdescription);
    setEditDescription(false);
  };
  const handleSaveDescription = () => {
    setEditDescription(false);
  };

  const [price, setPrice] = useState(product.productprice);
  const [editPrice, setEditPrice] = useState(false);
  const handleEditPrice = () => {
    setEditPrice(true);
  };
  const handleCancelEditPrice = () => {
    setPrice(product.productprice);
    setEditPrice(false);
  };
  const handleSavePrice = () => {
    setEditPrice(false);
  };

  const [discount, setDiscount] = useState(product.productdiscount);
  const [editDiscount, setEditDiscount] = useState(false);
  const handleEditDiscount = () => {
    setEditDiscount(true);
  };
  const handleCancelEditDiscount = () => {
    setDiscount(product.productdiscount);
    setEditDiscount(false);
  };
  const handleSaveDiscount = () => {
    setEditDiscount(false);
  };

  const [category, setCategory] = useState(
    () =>
      categories.filter(
        (category) => category.categoryid === product.categoryid,
      )[0],
  );
  const [editCategory, setEditCategory] = useState(false);
  const handleEditCategory = () => {
    setEditCategory(true);
  };
  const handleCancelEditCategory = () => {
    setCategory(
      () =>
        categories.filter(
          (category) => category.categoryid === product.categoryid,
        )[0],
    );
    setEditCategory(false);
  };
  const handleSaveCategory = () => {
    setEditCategory(false);
  };

  const [subCategory, setSubCategory] = useState(
    () =>
      subcategories.filter(
        (subCategory) => subCategory.subcategoryid === product.subcategoryid,
      )[0],
  );
  const [editSubCategory, setEditSubCategory] = useState(false);
  const handleEditSubCategory = () => {
    setEditSubCategory(true);
  };
  const handleCancelEditSubCategory = () => {
    setSubCategory(
      () =>
        subcategories.filter(
          (subCategory) => subCategory.subcategoryid === product.subcategoryid,
        )[0],
    );
    setEditSubCategory(false);
  };
  const handleSaveSubCategory = () => {
    setEditSubCategory(false);
  };

  const [stock, setStock] = useState(product.stock);
  const [editStock, setEditStock] = useState(false);
  const handleEditStock = () => {
    setEditStock(true);
  };
  const handleCancelEditStock = () => {
    setStock(product.stock);
    setEditStock(false);
  };
  const handleSaveStock = () => {
    setEditStock(false);
  };

  const [newStock, setNewStock] = useState([
    {
      id: 1,
      size: "string",
      color: "string",
      sizeid: 0,
      colorid: 0,
      quantity: 0,
    },
  ]);
  const [addNewStock, setAddNewStock] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <ImagesPreview images={product.productimages} />
      </div>
      <div className="edit-product-container">
        <p className="edit-product-title">Product Name :-</p>
        {!editName ? (
          <>
            <p className="edit-data">{name}</p>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditName}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              className="profile-form-input"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <button
              className="text-identity cursor-pointer"
              onClick={handleCancelEditName}
            >
              Cancel
            </button>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleSaveName}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div className="edit-product-container">
        <p className="edit-product-title">Product Description :-</p>
        {!editDescription ? (
          <>
            <p className="edit-data">{description}</p>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditDescription}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              className="profile-form-input"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
            <button
              className="text-identity cursor-pointer"
              onClick={handleCancelEditDescription}
            >
              Cancel
            </button>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleSaveDescription}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div className="edit-product-container">
        <p className="edit-product-title">Product Price :-</p>
        {!editPrice ? (
          <>
            <p className="edit-data">$ {price}</p>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditPrice}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              className="profile-form-input"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
            />
            <button
              className="text-identity cursor-pointer"
              onClick={handleCancelEditPrice}
            >
              Cancel
            </button>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleSavePrice}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div className="edit-product-container">
        <p className="edit-product-title">Product Discount :-</p>
        {!editDiscount ? (
          <>
            <p className="edit-data">% {discount}</p>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditDiscount}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <input
              type="number"
              name="discount"
              id="discount"
              value={discount}
              className="profile-form-input"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDiscount(Number(e.target.value))
              }
            />
            <button
              className="text-identity cursor-pointer"
              onClick={handleCancelEditDiscount}
            >
              Cancel
            </button>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleSaveDiscount}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div className="edit-product-container">
        <p className="edit-product-title">Product Category :-</p>
        {!editCategory ? (
          <>
            <p className="edit-data">{category.category}</p>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditCategory}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <select
              name="category"
              id="category"
              value={category.categoryid}
              className="profile-form-input"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const selectedCategory = categories.filter(
                  (category) => category.categoryid === Number(e.target.value),
                )[0];
                setCategory(selectedCategory);
              }}
            >
              {categories.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.category}
                </option>
              ))}
            </select>
            <button
              className="text-identity cursor-pointer"
              onClick={handleCancelEditCategory}
            >
              Cancel
            </button>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleSaveCategory}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div className="edit-product-container">
        <p className="edit-product-title">Product SubCategory :-</p>
        {!editSubCategory ? (
          <>
            <p className="edit-data">{subCategory.subcategory}</p>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditSubCategory}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <select
              name="subCategory"
              id="subCategory"
              value={subCategory.subcategoryid}
              className="profile-form-input"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const selectedSubCategory = subcategories.filter(
                  (subCategory) =>
                    subCategory.subcategoryid === Number(e.target.value),
                )[0];
                setSubCategory(selectedSubCategory);
              }}
            >
              {subcategories.map((subcategory) => (
                <option
                  key={subcategory.subcategoryid}
                  value={subcategory.subcategoryid}
                >
                  {subcategory.subcategory}
                </option>
              ))}
            </select>
            <button
              className="text-identity cursor-pointer"
              onClick={handleCancelEditSubCategory}
            >
              Cancel
            </button>
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleSaveSubCategory}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div>
        <p className="edit-product-title">Product Stock :-</p>

        {stock.map((stockItem) => (
          <div
            key={stockItem.stockid}
            className="edit-product-container justify-evenly"
          >
            <div className="edit-product-container">
              <p className="edit-product-title">Size :-</p>
              <p>{stockItem.size}</p>
            </div>
            <div className="edit-product-container">
              <p className="edit-product-title">Color :-</p>
              <p
                className="w-7.5 h-7.5 rounded-full"
                style={{ backgroundColor: stockItem.color }}
              ></p>
            </div>
            <div className="edit-product-container">
              <p className="edit-product-title">Quantity :-</p>
              {!editStock ? (
                <p className="edit-data">{stockItem.quantity}</p>
              ) : (
                <input
                  type="number"
                  name={`stock-${stockItem.stockid}-quantity`}
                  id={`stock-${stockItem.stockid}-quantity`}
                  value={stockItem.quantity}
                  className="profile-form-input"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const newStock = stock.map((stock) => {
                      if (stock.stockid === stockItem.stockid)
                        return { ...stock, quantity: Number(e.target.value) };
                      return stock;
                    });
                    setStock(newStock);
                  }}
                />
              )}
            </div>
            {!editStock ? (
              <button
                className="text-green-600 cursor-pointer"
                onClick={handleEditStock}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  className="text-identity cursor-pointer"
                  onClick={handleCancelEditStock}
                >
                  Cancel
                </button>
                <button
                  className="text-green-600 cursor-pointer"
                  onClick={handleSaveStock}
                >
                  Save
                </button>
              </>
            )}
          </div>
        ))}
        {newStock.length ? (
          <div>
            <p className="edit-product-title">New Stock Variants :-</p>
            {newStock.map((stock) => (
              <div
                key={stock.id}
                className="edit-product-container justify-evenly"
              >
                <div className="edit-product-container">
                  <p className="edit-product-title">Size :-</p>
                  <p>{stock.size}</p>
                </div>
                <div className="edit-product-container">
                  <p className="edit-product-title">Color :-</p>
                  <p>{stock.color}</p>
                </div>
                <div className="edit-product-container">
                  <p className="edit-product-title">Quantity :-</p>
                  <p>{stock.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
