import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Tema from '../../../models/Tema' // pega toda informação da Tema.ts
import './ListaTema.css';
import {useNavigate} from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import { toast } from 'react-toastify';

function ListaTema() {
  let navigate = useNavigate();
  const [temas, setTemas]= useState<Tema[]>([])
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state)=>state.tokens
  );
  

  useEffect(()=>{
    if(token == ''){
      toast.warn('Você precisa estar logado!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      navigate("/login")//volta para tela de login
    }
  },[token])

  async function getTema(){
    await busca("/temas", setTemas,{
      headers:{
      'Authorization': token
      }  
    })
  }

  useEffect(()=>{
    getTema()
  },[temas.length])//sempre que o numero de temas mudar, irá atualizar por conta do length

  return (
    <>
    {
      temas.map((tema) =>(
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>
            <Typography variant="h5" component="h2">
              {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))}
    </>
  );
}


export default ListaTema;