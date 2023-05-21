import { useContext, useState } from "react";
import { AuthContext, UiContext } from "@/context";
import { useRouter } from 'next/router';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

export const SideMenu = () => {
    
    const router = useRouter()
    const { isMenuOpen, toggleSideMenu  } = useContext(UiContext);
    const [searchTerm, setsearchTerm] = useState('');

    const { user, isLoggedIn, logout} = useContext(AuthContext);


    
    
    const navegateTo = (url:string) => {
        toggleSideMenu()
        router.push(url)
    }
    
    const onSearchTerm = () => {
        // validate term of search
        if (searchTerm.trim().length<1) { return; }
        navegateTo(`/search/${searchTerm}`)

    }

 
  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toggleSideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
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
                                    onClick={onSearchTerm}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {/* solo los que estan autenticador             */}
                {
                    isLoggedIn && (
                        <>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItemButton>
                        </>
                    )
                }


                <ListItemButton 
                sx={{ display: { xs: '', sm: 'none' } }}
                onClick={()=> { navegateTo('/category/men')}}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Men'} >
                        
                     
                    </ListItemText>
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}
                onClick={()=> { navegateTo('/category/women')}}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Women'} />
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}
                onClick={()=> { navegateTo('/category/kid')}}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Kids'} />
                </ListItemButton>

                { isLoggedIn 
                ? (
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Log out'} />
                    </ListItemButton>
                ) 
                : (
                    <ListItemButton onClick={ ()=> navegateTo(`/auth/login?p=${router.asPath}`)}>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Log In'} />
                    </ListItemButton>

                )}



                {/* Admin */}
                { 
                    user?.role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CategoryOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Productos'} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ConfirmationNumberOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Ordenes'} />
                                    </ListItemButton>

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AdminPanelSettings/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Usuarios'} />
                                    </ListItemButton>
                        </>
                    )
                }
                </List>
        </Box>
    </Drawer>
  )
}