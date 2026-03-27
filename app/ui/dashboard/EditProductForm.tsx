"use client";
import {
  addNewStock,
  updateProductCategory,
  updateProductDescription,
  updateProductDiscount,
  updateProductName,
  updateProductPrice,
  updateProductStock,
  updateProductSubCategory,
} from "@/app/actions/editProduct";
import {
  FETCHED_CATEGORY_TYPE,
  FETCHED_DASHBOARD_PRODUCT_BY_ID_TYPE,
} from "@/app/lib/typeDefinitions";
import ImagesPreview from "@ui/product_details/ImagesPreview";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

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
  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (error: string) => toast.error(error);
  const [name, setName] = useState(product.productname);
  const [editName, setEditName] = useState(false);
  const handleEditName = () => {
    setEditName(true);
  };
  const handleCancelEditName = () => {
    setName(product.productname);
    setEditName(false);
  };
  const handleSaveName = async () => {
    try {
      await updateProductName(product.productid, name);
      notifySuccess("Product Name Changed Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
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
  const handleSaveDescription = async () => {
    try {
      await updateProductDescription(product.productid, description);
      notifySuccess("Product Description Changed Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
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
  const handleSavePrice = async () => {
    try {
      await updateProductPrice(product.productid, Number(price));
      notifySuccess("Product Price Changed Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
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
  const handleSaveDiscount = async () => {
    try {
      await updateProductDiscount(product.productid, discount);
      notifySuccess("Product Discount Changed Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
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
  const handleSaveCategory = async () => {
    try {
      await updateProductCategory(product.productid, category.categoryid);
      notifySuccess("Product Category Changed Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
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
  const handleSaveSubCategory = async () => {
    try {
      await updateProductSubCategory(
        product.productid,
        subCategory.subcategoryid,
      );
      notifySuccess("Product SubCategory Changed Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  };

  const [stock, setStock] = useState(product.stock);
  const [editStock, setEditStock] = useState(0);
  const handleEditStock = (stockID: number) => {
    setEditStock(stockID);
  };
  const handleCancelEditStock = () => {
    setStock(product.stock);
    setEditStock(0);
  };
  const handleSaveStock = async () => {
    try {
      const editedStock = stock.filter((stock) => stock.stockid === editStock);
      await updateProductStock(
        editStock,
        product.productid,
        editedStock[0].quantity,
      );
      notifySuccess("Product Stock Changed Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  };

  const [newStock, setNewStock] = useState<
    {
      stockid: number;
      size: string;
      color: string;
      sizeid: number;
      colorid: number;
      quantity: number;
    }[]
  >([]);
  const handleAddNewStock = () => {
    const newStockId = newStock.length
      ? newStock[newStock.length - 1].stockid > stock[stock.length - 1].stockid
        ? newStock[newStock.length - 1].stockid + 1
        : stock[stock.length - 1].stockid + 1
      : stock[stock.length - 1].stockid + 1;

    const addedNewStock = [
      ...newStock,
      {
        stockid: newStockId,
        size: "",
        color: "",
        sizeid: 0,
        colorid: 0,
        quantity: 0,
      },
    ];
    setNewStock(addedNewStock);
  };
  const handleChangeNewStock = (
    stockId: number,
    prop1: string,
    val1: number,
    prop2?: string,
    val2?: string,
  ) => {
    const changedStock = newStock.map((stock) => {
      if (stock.stockid === stockId) {
        if (prop2 && val2) {
          return { ...stock, [prop1]: val1, [prop2]: val2 };
        }
        return { ...stock, [prop1]: val1 };
      }
      return stock;
    });
    setNewStock(changedStock);
  };

  const handleCancelAddNewStock = (stockId: number) => {
    const cancelledNewStock = newStock.filter(
      (stock) => stock.stockid !== stockId,
    );
    setNewStock(cancelledNewStock);
  };
  const handleSaveNewStock = async (newStock: {
    stockid: number;
    size: string;
    color: string;
    sizeid: number;
    colorid: number;
    quantity: number;
  }) => {
    try {
      if (
        !newStock.sizeid ||
        !newStock.size ||
        !newStock.colorid ||
        !newStock.color ||
        !newStock.quantity
      ) {
        throw new Error("All Stock Data Should be Provided");
      }
      // const savedNewStock = [...stock, newStock];
      // setStock(savedNewStock);
      // handleCancelAddNewStock(newStock.stockid);
      await addNewStock(
        product.productid,
        newStock.sizeid,
        newStock.colorid,
        newStock.quantity,
      );
      notifySuccess("Product New Stock Added Successfully");
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <ImagesPreview images={product.productimages} />
      </div>
      <div className="edit-product-container">
        <div className="flex items-center justify-between">
          <p className="edit-product-title">Product Name :-</p>
          {!editName ? (
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditName}
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                className="text-identity cursor-pointer me-4"
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
            </div>
          )}
        </div>
        {!editName ? (
          <p className="edit-data">{name}</p>
        ) : (
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
        )}
      </div>
      <div className="edit-product-container">
        <div className="flex items-center justify-between">
          <p className="edit-product-title">Product Description :-</p>
          {!editDescription ? (
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditDescription}
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                className="text-identity cursor-pointer me-4"
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
            </div>
          )}
        </div>
        {!editDescription ? (
          <p className="edit-data">{description}</p>
        ) : (
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
        )}
      </div>
      <div className="edit-product-container">
        <div className="flex items-center justify-between">
          <p className="edit-product-title">Product Price :-</p>
          {!editPrice ? (
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditPrice}
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                className="text-identity cursor-pointer me-4"
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
            </div>
          )}
        </div>
        {!editPrice ? (
          <p className="edit-data">$ {price}</p>
        ) : (
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
        )}
      </div>
      <div className="edit-product-container">
        <div className="flex items-center justify-between">
          <p className="edit-product-title">Product Discount :-</p>
          {!editDiscount ? (
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditDiscount}
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                className="text-identity cursor-pointer me-4"
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
            </div>
          )}
        </div>
        {!editDiscount ? (
          <p className="edit-data">% {discount}</p>
        ) : (
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
        )}
      </div>
      <div className="edit-product-container">
        <div className="flex items-center justify-between">
          <p className="edit-product-title">Product Category :-</p>
          {!editCategory ? (
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditCategory}
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                className="text-identity cursor-pointer me-4"
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
            </div>
          )}
        </div>
        {!editCategory ? (
          <p className="edit-data">{category.category}</p>
        ) : (
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
            <option value="0">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryid} value={category.categoryid}>
                {category.category}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="edit-product-container">
        <div className="flex items-center justify-between">
          <p className="edit-product-title">Product SubCategory :-</p>
          {!editSubCategory ? (
            <button
              className="text-green-600 cursor-pointer"
              onClick={handleEditSubCategory}
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                className="text-identity cursor-pointer me-4"
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
            </div>
          )}
        </div>
        {!editSubCategory ? (
          <p className="edit-data">{subCategory.subcategory}</p>
        ) : (
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
            <option value="0">Select SubCategory</option>
            {subcategories.map((subcategory) => (
              <option
                key={subcategory.subcategoryid}
                value={subcategory.subcategoryid}
              >
                {subcategory.subcategory}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="edit-product-container">
        <div className="flex items-center justify-between">
          <p className="edit-product-title">Product Stock :-</p>
        </div>
        {stock.map((stockItem) => (
          <div
            key={stockItem.stockid}
            className="flex items-center justify-evenly"
          >
            <div className="flex items-center gap-2">
              <p className="edit-product-title">Size :-</p>
              <p>{stockItem.size}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="edit-product-title">Color :-</p>
              <p
                className="w-7.5 h-7.5 rounded-full"
                style={{ backgroundColor: stockItem.color }}
              ></p>
            </div>
            <div className="flex items-center gap-2">
              <p className="edit-product-title">Quantity :-</p>
              {editStock !== stockItem.stockid ? (
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
            {editStock !== stockItem.stockid ? (
              <button
                className="text-green-600 cursor-pointer"
                onClick={() => handleEditStock(stockItem.stockid)}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  className="text-identity cursor-pointer me-4"
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
      </div>
      {newStock.length ? (
        <div className="edit-product-container">
          <p className="edit-product-title">New Stock Variants :-</p>
          {newStock.map((stock) => (
            <div
              key={stock.stockid}
              className="flex items-center justify-evenly my-7.5"
            >
              <div className="flex items-center gap-2">
                <p className="edit-product-title">Size :-</p>
                <select
                  name={`stock-${stock.stockid}-size`}
                  id={`stock-${stock.stockid}-size`}
                  value={stock.sizeid}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChangeNewStock(
                      stock.stockid,
                      "sizeid",
                      Number(e.target.value),
                      "size",
                      e.target[e.target.selectedIndex].getAttribute(
                        "data-size",
                      ) || "",
                    )
                  }
                >
                  <option value="0">Select Size</option>
                  {sizes.map((size) => (
                    <option
                      key={size.sizeid}
                      value={size.sizeid}
                      data-size={size.size}
                    >
                      {size.size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <p className="edit-product-title">Color :-</p>
                <select
                  name={`stock-${stock.stockid}-color`}
                  id={`stock-${stock.stockid}-color`}
                  value={stock.colorid}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChangeNewStock(
                      stock.stockid,
                      "colorid",
                      Number(e.target.value),
                      "color",
                      e.target[e.target.selectedIndex].getAttribute(
                        "data-color",
                      ) || "",
                    )
                  }
                >
                  <option value="0">Select Color</option>
                  {colors.map((color) => (
                    <option
                      key={color.colorid}
                      value={color.colorid}
                      data-color={color.colorhex}
                      style={{
                        backgroundColor: color.colorhex,
                      }}
                    >
                      {color.colorhex}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <p className="edit-product-title">Quantity :-</p>
                <input
                  type="number"
                  name={`stock-${stock.stockid}-quantity`}
                  id={`stock-${stock.stockid}-quantity`}
                  value={stock.quantity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeNewStock(
                      stock.stockid,
                      "quantity",
                      Number(e.target.value),
                    )
                  }
                />
              </div>
              <button
                className="text-identity cursor-pointer"
                onClick={() => handleCancelAddNewStock(stock.stockid)}
              >
                Cancel
              </button>
              <button
                className="text-green-600 cursor-pointer me-4"
                onClick={() => handleSaveNewStock(stock)}
              >
                Save
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mb-6 flex items-center justify-end">
        <button
          className="shared-btn shared-btn-transparent"
          role="button"
          onClick={handleAddNewStock}
        >
          Add Stock Variants
        </button>
      </div>
    </>
  );
}
