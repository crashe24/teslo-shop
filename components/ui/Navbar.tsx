import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'
import NextLink from 'next/link'
import { SearchOutlined, ShoppingBagOutlined } from '@mui/icons-material'

const Navbar:FC = () => {
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' legacyBehavior passHref>
                <Link display='flex' alignItems='center'>

                    <Typography variant='h6'> Teslo | </Typography>
                    <Typography sx={{ml:0.5}}> Shop </Typography>
                </Link>
            </NextLink>

            {/* todo flex */}
            <Box flex={1} />
            <Box sx={{ display: { xs:'none',sm:'block' }}}>
                <NextLink href='/category/men' legacyBehavior passHref> 
                       <Link>  <Button> Men </Button> </Link> 
                </NextLink>
                <NextLink href='/category/women' legacyBehavior passHref> 
                       <Link>  <Button> Women </Button> </Link> 
                </NextLink>
                <NextLink href='/category/kids'legacyBehavior  passHref> 
                       <Link>  <Button> Kids </Button> </Link> 
                </NextLink>
            </Box>
            {/* todo flex */}
            <Box flex={1} />
            <IconButton>
                <SearchOutlined />
            </IconButton>
            <NextLink href='/cart'legacyBehavior  passHref> 
                       <Link>  
                            <IconButton>
                                <Badge badgeContent={2} color='secondary'>
                                    <ShoppingBagOutlined />    
                                </Badge>
                            </IconButton> 
                        </Link> 
                </NextLink>
                <Button>
                    Menu
                </Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar