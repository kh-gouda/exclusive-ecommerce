import { authOptions } from "@/app/lib/auth";
import { fetchCartProducts } from "@/app/lib/utils";
import CartDetails from "@ui/cart/CartDetails";
import BreadCrumbs from "@ui/shared/BreadCrumbs";
import Container from "@ui/shared/Container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/account/cart");
  }

  const fetchedCartProducts = await fetchCartProducts(Number(session.user.id));
  const cartProducts = fetchedCartProducts.map((product) => {
    const productPrice =
      Number(product.productprice) -
      Number(product.productprice) * (Number(product.productdiscount) / 100);

    return {
      id: product.productid,
      title: product.productname,
      image: product.productimages[0],
      price: productPrice,
      quantity: Number(product.quantity),
      subtotal: productPrice * Number(product.quantity),
    };
  });

  return (
    <main className="pt-20 pb-35">
      <Container>
        <BreadCrumbs />
        <section className="mt-20">
          <div className="flex items-center justify-between *:flex-1 shadow py-6 px-9.5">
            <div>Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Subtotal</div>
          </div>
        </section>
        <CartDetails userid={Number(session.user.id)} products={cartProducts} />
      </Container>
    </main>
  );
}
