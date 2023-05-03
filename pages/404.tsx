import ShopLayout from '@/components/layouts/ShopLayout'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Custom404Page = () => {
  return (
    <ShopLayout  
        title='Page not found' 
        pageDescription='there is not anything here'>
              <Box 
                display={'flex'}
                sx={{flexDirection:{xs:'column', sm:'row'}}}
                justifyContent={'center'}
                alignItems={'center'}
                height={'calc(100vh - 200px)'}
              >
                    <Typography variant='h1' component={'h1'}
                        fontSize={80}
                        fontWeight={200}
                    >
                        400 |
                    </Typography>
                    <Typography 
                        marginLeft={2}
                        fontSize={50}
                        fontWeight={200}
                    >
                        Nothing page here!
                    </Typography>
                </Box>  
    </ShopLayout>
  )
}

export default Custom404Page