import { IProduct } from '@/interfaces'
import { Box, Card, CardActionArea, CardMedia, Grid, Typography, Chip, Link } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import  NextLink from 'next/link'





interface Props {
  product:IProduct
}
const ProductCard: FC<Props> = ({product}) => {

  const [isHovered, setisHovered] = useState(false);
  const [isImagedLoaded, setIsImagedLoaded] = useState(false);
  const productImage = useMemo( () => {
    return isHovered ? `/products/${product.images[1]}`
                     :`/products/${product.images[0]}`
  },[isHovered, product.images])

  return (
    <Grid item xs= {6} sm={4} 
      onMouseEnter={ ()=> setisHovered(true)}
      onMouseLeave= { ()=> setisHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} legacyBehavior passHref prefetch={false}>
            <Link>

              <CardActionArea>
                { 
                (product.inStock < 1) && (
                  <Chip 
                          color={'primary'}
                          label='product discarted'
                          sx={{ position: 'absolute', zIndex:99, top:'10px', left: '10px' }}
                        />

                )}
              
                <CardMedia  component={'img'}
                  className='fadeIn'
                  image={productImage} 
                  alt={ product.title }
                  onLoad={ () => {setIsImagedLoaded(true)}}
                />
              </CardActionArea>
            </Link>
        </NextLink>
    </Card>
    <Box sx={{mt:1, display: isImagedLoaded ? 'block':'none'}} className='fadeIn'>
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