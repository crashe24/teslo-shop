import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { FC, useContext, useState } from 'react'
import NextLink from 'next/link'
import { ClearOutlined, SearchOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { CartContext, UiContext } from '@/context'

const Navbar:FC = () => {

// para consultar en que url nos encontramos 

  const {asPath} = useRouter()

  const { toggleSideMenu  } = useContext(UiContext);
  const {numberOfItems} = useContext(CartContext)
  const router = useRouter()

  const [searchTerm, setsearchTerm] = useState('');
  const [isSearchVisible, setisSearchVisible] = useState(false);

  const onSearchTerm = () => {
      // validate term of search
      if (searchTerm.trim().length<1) { return; }
      
      router.push(`/search/${searchTerm}`)

  }


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
            <Box 
            sx={{ display: isSearchVisible ? 'none' : { xs:'none',sm:'block' }}} 
            className = {'fadeIn'}
            >
                <NextLink href='/category/men' legacyBehavior passHref> 
                       <Link>  <Button color={ asPath==='/category/men'? 'primary': 'info'}> Men </Button> </Link> 
                </NextLink>
                <NextLink href='/category/women' legacyBehavior passHref> 
                       <Link>  <Button color={ asPath==='/category/women'? 'primary': 'info'}> Women </Button> </Link> 
                </NextLink>
                <NextLink href='/category/kid'legacyBehavior  passHref> 
                       <Link>  <Button color={ asPath==='/category/kid'? 'primary': 'info'}> Kids </Button> </Link> 
                </NextLink>
            </Box>
            {/* todo flex */}
            <Box flex={1} />
            
            {/* pantallas grandes */}
            {
                isSearchVisible ? (
                    <Input
                        sx={{ display: { xs:'none', sm: 'flex'}}}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={ (e) => setsearchTerm(e.target.value)}
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm(): null }
                        type='text'
                        placeholder="Search..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                    onClick={ () => setisSearchVisible(false)}
                                >
                                 <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                ) : 
                (
                    <IconButton onClick={ ()=> setisSearchVisible(true)} 
                    sx={{display: { xs:'none', sm:'flex'}}}
                    className='fadeIn'>
                        <SearchOutlined />
                    </IconButton>
                )
            }
            
            
            {/* pantallas pequeñas */}
            
            <IconButton
                sx={{ display: {xs:'flex', sm: 'none'}}}
                onClick={ toggleSideMenu}
            >
                <SearchOutlined />
            </IconButton>


            <NextLink href='/cart'legacyBehavior  passHref> 
                       <Link>  
                            <IconButton>
                                <Badge badgeContent={ numberOfItems > 9? '+9': numberOfItems } color='secondary'>
                                    <ShoppingBagOutlined />    
                                </Badge>
                            </IconButton> 
                        </Link> 
                </NextLink>
                <Button onClick={toggleSideMenu}>
                    Menu
                </Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar