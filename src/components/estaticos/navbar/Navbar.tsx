import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokenReducer'
import './Navbar.css'
import { addToken } from '../../../store/tokens/actions'
import { toast } from 'react-toastify'
import LogoutIcon from '@mui/icons-material/Logout';

function NavBar() {

    let navigate = useNavigate()
    const dispatch = useDispatch();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state)=>state.tokens
      );

    function goLogout() {
        dispatch(addToken(''));//transforma o token em vazio quando deslogar
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        navigate("/login")
    }
    var navbarComponent;

    if(token != ""){//so aparece a navbar se tiver o token
        navbarComponent = <AppBar position="static">
                <Toolbar variant="dense" className='caixa'>
                    <Box className='cursor'>
                        <Typography className='font' variant="h5" color="inherit">
                            WillJPG
                        </Typography>
                    </Box>

                    <Box display="flex" className='log'>
                        <Link to="/home" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='font' variant="h6" color="inherit">
                                    Home
                                </Typography>
                            </Box>
                        </Link>

                        {/* <Link to="/posts" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='font' variant="h6" color="inherit">
                                    Postagens
                                </Typography>
                            </Box>
                        </Link> */}

                        <Link to="/temas" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='font' variant="h6" color="inherit">
                                    Temas
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/formularioTema" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='font' variant="h6" color="inherit">
                                    Cadastrar Temas
                                </Typography>
                            </Box>
                        </Link>
                            
                       
                    </Box>
                    <Box mx={1}  onClick={ goLogout } className='log'>
                                <Typography className='font' variant="h6" color="inherit">
                                <LogoutIcon/>
                                </Typography>
                            </Box>
                    
                        
                </Toolbar>
            </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default NavBar;