import { IProduct } from '@/interfaces'
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import  NextLink from 'next/link'
import Link from 'next/link'




interface Props {
  product:IProduct
}
const ProductCard: FC<Props> = ({product}) => {

  const [isHovered, setisHovered] = useState(false);

  const productImage = useMemo( () => {
    return isHovered ? `products/${product.images[1]}`
                     :`products/${product.images[0]}`
  },[isHovered, product.images])

  return (
    <Grid item xs= {6} sm={4} 
      onMouseEnter={ ()=> setisHovered(true)}
      onMouseLeave= { ()=> setisHovered(false)}
    >
      <Card>
        <NextLink href={'/product/slug'} legacyBehavior passHref prefetch={false}>
            <Link>
              <CardActionArea>
                <CardMedia  component={'img'}
                  className='fadeIn'
                  image={productImage} 
                  alt={ product.title }
                />
              </CardActionArea>
            </Link>
        </NextLink>
    </Card>
    <Box sx={{mt:1}} className='fadeIn'>
        <Typography fontWeight={700}>
            {product.title}
        </Typography>
        <Typography fontWeight={500}>
            ${product.price}
        </Typography>
    </Box>
      
    </Grid>
  )
}

export default ProductCard