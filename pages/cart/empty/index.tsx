import ShopLayout from '@/components/layouts/ShopLayout'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'

const EmptyPage = () => {
  return (
    <ShopLayout title='Empty Car' pageDescription='Does not have anything at the store car'>

            <Box 
                display={'flex'}
                sx={{flexDirection:{xs:'column', sm:'row'}}}
                justifyContent={'center'}
                alignItems={'center'}
                height={'calc(100vh - 200px)'}
              >
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <RemoveShoppingCartOutlined  sx={{ fontSize: 100}}/>
                    <Typography 
                        marginLeft={2}
                        fontSize={50}
                        fontWeight={100}
                    >
                       Empty shopping cart!!!
                    </Typography>
                    <NextLink href={'/'} passHref legacyBehavior >
                        <Link typography={'h4'} color={'secondary'}>
                               Back 
                        </Link>
                    </NextLink>
                </Box>

                  
                </Box>
    </ShopLayout>
  )
}

export default EmptyPage