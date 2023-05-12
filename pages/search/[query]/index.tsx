import ShopLayout from '@/components/layouts/ShopLayout'
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'

//import { initialData } from '@/database/products'
import ProductList from '@/components/products/ProductList'
//import { useProducts } from '@/hooks'
//import FullScreenLoading from '@/components/ui/FullScreenLoading'

// busqueda por ssr
interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: String
}

const SearchPage: NextPage<Props> = ({products, foundProducts, query }) => {

 //const { products, isLoading } = useProducts('/products')

  return (
      <>
        <ShopLayout title={'Teslo Shop Search'} pageDescription={'searches  your product'}>
            <Typography variant='h1' component='h1'>Search Product</Typography>

            {
                foundProducts ?   <Typography variant='h2' sx={{ mb:1}} textTransform={'capitalize'}>Query: { query }</Typography>
                              :   
                              <Box display={'flex'}>
                                <Typography variant='h2' sx={{ mb:1}} >Not exist search:  </Typography>
                                <Typography variant='h2' sx={{ mb:1}} color={'secondary'} textTransform={'capitalize'}>{ query}</Typography>
                              </Box>
            }

          
         
            <ProductList products={products} />
              {
            //    isLoading
            //     ? <FullScreenLoading />
            //     :
            //    <ProductList products={products} />
                
              }
         </ShopLayout>
      </>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from 'next'
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces'

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const { query = ''} = params as { query:string}

    //const { data } = await  // your fetch function here 

    if ( query.length === 0  ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query )

    const foundProducts = products.length > 0
    
    // cuando no hay productos
    if ( !foundProducts ) {
        products = await dbProducts.getAllProductsReload()

    }
    //console.log('products === >', products)

    return {
        props: {
                products,
                foundProducts, 
                query         
        }
    }
}
export default SearchPage
