import ShopLayout from '@/components/layouts/ShopLayout'
import ProductSlideshow from '@/components/products/ProductSlideshow'
import ItemCounter from '@/components/ui/ItemCounter'
import SizeSelector from '@/components/ui/SizeSelector'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { IProduct, ISizes } from '../../../interfaces/IProduct';
import { NextPage } from 'next'
import { dbProducts } from '../../../database/index'


interface Props {
    product: IProduct
}

const ProductPage: NextPage<Props> = ({product}) => {


    const router = useRouter()
    const { addProductCart } = useContext(CartContext)


    const [tempCartProduct, settempCartProduct] = useState<ICart>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    });



    const selectedSize = (size: ISizes) => {
      settempCartProduct( currentProduct =>({
        ...currentProduct, size
      }))
    }

    const addProduct = () => {
        if(!tempCartProduct.size) return 
        addProductCart(tempCartProduct)
        router.push('/cart')
    }

    const updateCuantityValue = (quantity:number) => {
            settempCartProduct( currentProduct =>({
                ...currentProduct,
                quantity
            }))
    }

 
  return (
    <ShopLayout title={ product.title } pageDescription= { product.description}>
            <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                        {/* SlideShow */}
                        <ProductSlideshow images= { product.images} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography variant='h1' component={'h1'}>
                                {product.title}
                            </Typography>
                            <Typography variant='subtitle1' component={'h2'}>
                                ${product.price}
                            </Typography>
                            <Box sx={{my:2}}>
                                   <Typography variant='subtitle2' >Count available: {product.inStock}</Typography> 
                                   {/* Itmecounter */}
                                   <ItemCounter 
                                   currenValue={tempCartProduct.quantity}
                                   maxValues={ product.inStock > 5 ? 5: product.inStock}
                                   updateCuantity={updateCuantityValue} />
                                 
                                   <SizeSelector
                                   sizes={product.sizes} 
                                   selectedSize={tempCartProduct.size }
                                   onSelectedSize = {  selectedSize}
                                   />

                            </Box>
                            {/* agragar al carrito */}
                            {
                                (product.inStock > 0) ? (
                                                <Button color='secondary' className='circular-btn'
                                                onClick={addProduct}>
                                                   { 
                                                      tempCartProduct.size ? 'Add Cart'
                                                                           : 'choose a clothing size'
                                                   }
                                                </Button>
                                            ) : (
                                                <Chip label='No exist' color='error' variant='outlined'></Chip> 

                                            )
                            }
                            
                            <Box sx={{ mt:3}}>
                                <Typography variant='subtitle2'>Description</Typography>
                                <Typography variant='body2'>{product.description}</Typography>
                            </Box>
                        </Box>
                    </Grid>
            </Grid>
    </ShopLayout>
  )
}

/**Estrategia 2 usar los server */
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from 'next'

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
   
//     const { slug = '' } = params as { slug: string }
//     const product = await dbProducts.getProductBySlug(slug)
 
//    // si el producto no existe redirigir a la pantalla principal
//    if( !product ) {
//      return {
//         redirect: {
//             destination: '/',
//             permanent: false
//         }
//      }
//    }
//     return {
//         props: {
//             product
//         }
//     }
// }

/**Estrategia 3 usar los static */
  // You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
  import { GetStaticPaths } from 'next'
  
  export const getStaticPaths: GetStaticPaths = async ( ctx) => {

    const productsSlug = await  dbProducts.getAllProductSlugs()// your fetch function here 
  
    return {
        paths: productsSlug.map( obj => (
            {
                params: {
                    slug: obj.slug
                }
            }
        )),
      
        fallback: "blocking"
    }
  }

  // You should use getStaticProps when:
  //- The data required to render the page is available at build time ahead of a user’s request.
  //- The data comes from a headless CMS.
  //- The data can be publicly cached (not user-specific).
  //- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
  import { GetStaticProps } from 'next'
import { useContext, useState } from 'react'
import { ICart } from '@/interfaces'
import { useRouter } from 'next/router'
import { AddCircleOutline } from '@mui/icons-material';
import { CartContext } from '@/context'
  
  export const getStaticProps: GetStaticProps = async (ctx) => {

    const { slug = '' } = ctx.params as {slug:string} 
    const product  = await dbProducts.getProductBySlug( slug )

    if (!product ) {
        return {
            redirect: {
                   destination: '/', permanent:false 
            }
        }
    }
  
    return {
        props: {
            product
        }, 
        revalidate:  60 * 60 *24 
    }
  }
export default ProductPage