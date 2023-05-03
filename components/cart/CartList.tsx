import { initialData } from "@/database/products"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link'
import ItemCounter from "../ui/ItemCounter"
import { FC } from "react"
const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
]

interface Props{
    editable?: boolean
}

const CartList: FC<Props> = ({editable=false}) => {
  return (
    <>
        {
            productsInCart.map( product => (
                <Grid container spacing={2} key={product.slug} sx={{mb:1}}>
                    <Grid item xs={3}>
                        {/* llevar a la pagina del producto */}
                        <NextLink href={'product/slug'} legacyBehavior>
                            <Link>
                                <CardActionArea>
                                    <CardMedia image={`/products/${product.images[0]}`}
                                        component={'img'}
                                        sx={{ borderRadius: '5px'}}
                                    >

                                    </CardMedia>
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography variant={'body1'}>{ product.title}</Typography>
                            <Typography variant={'body1'}>Talla: <strong>M</strong></Typography>
                            {
                                editable? <ItemCounter>1</ItemCounter>
                                        : <Typography variant="h5">3 items</Typography>
                            }
                           
                        </Box>
                    </Grid>
                    <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <Typography>$ {`${ product.price}`}</Typography>
                        {
                                editable&&  <Button variant='text' color='secondary'>Remove</Button>
                                      
                            }
                       
                    </Grid>
                </Grid>
            )
            )
        }
    </>
  )
}

export default CartList