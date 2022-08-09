import ProductsActions from "../Components/Products/ProductsActions"
import ProductsList from "../Components/Products/ProductsList"



function Products() {
  return (
    <>
    <h1 className="page-title">Produits</h1>
    <ProductsActions/>
    <ProductsList/>
    </>
  )
}

export default Products