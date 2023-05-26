//import { initialData } from "@/database/products"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link'
import ItemCounter from "../ui/ItemCounter"
import { FC, useContext } from "react"
import { CartContext } from "@/context"
import { ICart } from "@/interfaces"
import { IOrderItem } from '../../interfaces/IOrder';


// const productsInCart = [
//     initialData.products[0],
//     initialData.products[1],
//     initialData.products[2]
// ]

interface Props{
    editable?: boolean,
    products?: IOrderItem[],
}

const CartList: FC<Props> = ({editable=false,  products = []}) => {

    const { cart, updateQuantityPRoduct,onRemoveProductInCart } = useContext(CartContext)

    const onNewCartQuantityValue = (product: ICart, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateQuantityPRoduct(product)
    }

    const onRemoveProductInCartLocal = (product: ICart) => {

        onRemoveProductInCart( product )

        
    }

    const productsToShow = products? products:cart

    return (
    <>
        {
            productsToShow.map( product => (
                <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
                    <Grid item xs={3}>
                        {/* llevar a la pagina del producto */}
                        <NextLink href={`product/${product.slug}`} legacyBehavior>
                            <Link>
                                <CardActionArea>
                                    <CardMedia image={`/products/${product.image}`}
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
                            <Typography variant={'body1'}>Talla: <strong>{product.size}</strong></Typography>
                            {
                                editable?(
                                <ItemCounter
                                    currenValue={product.quantity} 
                                    maxValues={10} 
                                    updateCuantity={ (value)=> onNewCartQuantityValue(product  as ICart, value)}
                                />)
                                        : <Typography variant="h5">{product.quantity} {product.quantity>1?'products': 'product'}</Typography>
                            }
                           
                        </Box>
                    </Grid>
                    <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <Typography>$ {`${ product.price}`}</Typography>
                        {
                                editable&&  <Button variant='text' color='secondary'
                                onClick={() => onRemoveProductInCartLocal(product  as ICart)}
                                >Remove</Button>
                                      
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