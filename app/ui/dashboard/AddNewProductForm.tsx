"use client";

import { addNewProduct } from "@/app/actions/addNewProduct";
import { uploadProductImages } from "@/app/actions/uploadProductImages";
import { deleteMultipleImages } from "@/app/lib/cloudinaryDelete";
import { FETCHED_CATEGORY_TYPE } from "@/app/lib/typeDefinitions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { toast } from "react-toastify";

export default function AddNewProductForm({
  categories,
  subcategories,
  colors,
  sizes,
}: {
  categories: { categoryid: number; category: string }[];
  subcategories: FETCHED_CATEGORY_TYPE[];
  colors: { colorid: number; colorhex: string }[];
  sizes: { sizeid: number; size: string }[];
}) {
  const router = useRouter();
  const notifySuccess = () => toast.success("Product Added Successfully");
  const notifyEror = (error: string) => toast.error(error);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const [stock, setStock] = useState([
    { stockId: "1", sizeid: 0, colorid: 0, colorHex: "", quantity: 0 },
  ]);

  const handleChangeStock = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
    id: string,
    prop: string,
    color?: string,
  ) => {
    const newStock = stock.map((stock) => {
      if (stock.stockId === id) {
        if (color && e.target.dataset) {
          return {
            ...stock,
            [prop]: Number(e.target.value),
            colorHex: color,
          };
        }
        return { ...stock, [prop]: Number(e.target.value) };
      }
      return stock;
    });

    setStock(newStock);
  };

  const handleDeleteStock = (id: string) => {
    try {
      if (stock.length === 1) {
        throw new Error("You Should At least Add one Stock Object");
      }
      const newStock = stock.filter((stock) => stock.stockId !== id);
      setStock(newStock);
    } catch (error: unknown) {
      if (error instanceof Error) notifyEror(error.message);
    }
  };

  const handleAddStockVariants = (e: MouseEvent) => {
    e.preventDefault();
    const newStock = [
      ...stock,
      {
        stockId: crypto.randomUUID(),
        sizeid: 0,
        colorid: 0,
        colorHex: "",
        quantity: 0,
      },
    ];
    setStock(newStock);
  };

  // const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };

  const handleSubmit = async (formData: FormData) => {
    // e: SubmitEvent<HTMLFormElement>
    // e.preventDefault()
    const product = {
      name: name,
      description: description,
      price: price,
      discount: discount,
      category: category,
      subCategory: subCategory,
      stock: stock,
      images: [""],
    };

    try {
      const validStock = stock.map((stock) => {
        if (!stock.sizeid || !stock.colorid || !stock.quantity) {
          return "notValid";
        } else {
          return "valid";
        }
      });

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !subCategory ||
        validStock.includes("notValid")
      ) {
        throw new Error("All Required Fields Cant Be Empty");
      }

      const imagesUpload = await uploadProductImages(formData);
      if (!imagesUpload.success) {
        throw new Error("Image upload failed");
      }
      product.images = imagesUpload.publicIds;

      const insertedProduct = await addNewProduct(product);
      if (insertedProduct.success) {
        notifySuccess();
        router.push("/dashboard/products");
      }
    } catch (error: unknown) {
      if (error instanceof Error) notifyEror(error.message);
      const imagesToDelete = product.images.filter((image) => image !== "");
      if (imagesToDelete.length) {
        await deleteMultipleImages(product.images);
      }
    }
  };

  return (
    <form
      action={handleSubmit}
      // onSubmit={(e: SubmitEvent<HTMLFormElement>, formData: FormData) => handleSubmit(e, formData)}
    >
      <div className="mb-6">
        <label htmlFor="name">
          Product Name <span className="text-identity">(*)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="profile-form-input"
          required
          defaultValue={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </div>
      <div className="mb-6">
        <label htmlFor="description">
          Product Description <span className="text-identity">(*)</span>
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="profile-form-input"
          required
          defaultValue={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>
      <div className="mb-6">
        <label htmlFor="price">
          Product Price <span className="text-identity">(*)</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="profile-form-input"
          required
          defaultValue={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(Number(e.target.value))
          }
        />
      </div>
      <div className="mb-6">
        <label htmlFor="discount">Default Discount</label>
        <input
          type="number"
          id="discount"
          name="discount"
          className="profile-form-input"
          defaultValue={discount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDiscount(Number(e.target.value))
          }
        />
      </div>
      <div className="mb-6">
        <label htmlFor="category">
          Product Category <span className="text-identity">(*)</span>
        </label>
        <select
          name="category"
          id="category"
          className="profile-form-input"
          value={category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategory(Number(e.target.value))
          }
        >
          <option value="0">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryid} value={category.categoryid}>
              {category.category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="subCategory">
          Product SubCategory <span className="text-identity">(*)</span>
        </label>
        <select
          name="subCategory"
          id="subCategory"
          className="profile-form-input"
          value={subCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSubCategory(Number(e.target.value))
          }
        >
          <option value="0">Select subCategory</option>
          {subcategories.map((subCategory) => (
            <option
              key={subCategory.subcategoryid}
              value={subCategory.subcategoryid}
            >
              {subCategory.subcategory}
            </option>
          ))}
        </select>
      </div>

      {stock.map((stock) => (
        <div key={stock.stockId} className="flex items-center justify-between">
          <div className="mb-6">
            <label htmlFor={`size-${stock.stockId}`}>
              stock Size <span className="text-identity">(*)</span>
            </label>
            <select
              name={`size-${stock.stockId}`}
              id={`size-${stock.stockId}`}
              className="profile-form-input"
              value={stock.sizeid}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeStock(e, stock.stockId, "sizeid")
              }
            >
              <option value="0">Select Size</option>
              {sizes.map((size) => (
                <option key={size.sizeid} value={size.sizeid}>
                  {size.size}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor={`color-${stock.stockId}`}>
              stock Color <span className="text-identity">(*)</span>
            </label>
            <select
              name={`color-${stock.stockId}`}
              id={`color-${stock.stockId}`}
              className="profile-form-input"
              style={{ backgroundColor: stock.colorHex }}
              value={stock.colorid}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeStock(
                  e,
                  stock.stockId,
                  "colorid",
                  e.target[e.target.selectedIndex].getAttribute("data-color") ||
                    "",
                )
              }
            >
              <option value="0" data-color="">
                Select Color
              </option>
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
          <div className="mb-6">
            <label htmlFor={`quantity-${stock.stockId}`}>
              stock Quantity <span className="text-identity">(*)</span>
            </label>
            <input
              type="number"
              id={`quantity-${stock.stockId}`}
              name={`quantity-${stock.stockId}`}
              className="profile-form-input"
              required
              defaultValue={stock.quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeStock(e, stock.stockId, "quantity")
              }
            />
          </div>
          <TrashIcon
            className="w-10 h-10 text-identity cursor-pointer"
            onClick={() => handleDeleteStock(stock.stockId)}
          />
        </div>
      ))}
      <div className="mb-6 flex items-center justify-end">
        <button
          className="shared-btn shared-btn-transparent"
          role="button"
          onClick={(e: MouseEvent) => handleAddStockVariants(e)}
        >
          Add Stock Variants
        </button>
      </div>
      <div className="mb-6">
        <label htmlFor="images">Product Images</label>
        <input
          type="file"
          id="images"
          name="images"
          className="profile-form-input"
          multiple
          accept="image/*"
        />
      </div>
      <div className="mb-6 flex items-center gap-2 justify-end">
        <input
          type="reset"
          value="Clear"
          className="shared-btn shared-btn-transparent"
        />
        <button role="submit" className="shared-btn shared-btn-solid">
          Add Product
        </button>
      </div>
    </form>
  );
}
