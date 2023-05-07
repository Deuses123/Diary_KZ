import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {useState} from "react";
import './NavBar.css';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Profile', 'Teams'];

const NavBar = () =>  {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const nav = useNavigate();

    //Чтобы использовать removeCookie обезательно импортируем остальные функции
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const Logout = () => {
        console.log('logout');
        removeCookie('accessToken',{ path: '/'});
        removeCookie('refreshToken', { path: '/'});
    }

    const handleCloseNavMenu = (page) => {
        nav(page === 'Teams' ? '/Teams/1' : page);
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (s) => {
        s === 'Logout' ? Logout() : '';
        window.location.reload();
    };

    return (
        <div className="container">
            <AppBar position="static"  sx={{ backgroundColor: '#888' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Main
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => {nav(page)}}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Main
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}

                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <MenuItem onClick={() => handleCloseUserMenu('Logout')}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default NavBar;