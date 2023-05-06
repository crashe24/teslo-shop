import ShopLayout from '@/components/layouts/ShopLayout'
import { Typography } from '@mui/material'

import ProductList from '@/components/products/ProductList'
import { useProducts } from '@/hooks'
import FullScreenLoading from '@/components/ui/FullScreenLoading'

 const KidPage = () => {

 const { products, isLoading } = useProducts('/products?gender=kid')

  return (
      <>
        <ShopLayout title={'Teslo Shop- Kid'} pageDescription={'kids products'}>
            <Typography variant='h1' component='h1'>Shop-Kid</Typography>
            <Typography variant='h2' sx={{ mb:1}} >Kid products</Typography>
         
              {
                isLoading
                ? <FullScreenLoading />
                : <ProductList products={products} />
                
              }
            
          </ShopLayout>
      </>
    )
}

export default KidPage