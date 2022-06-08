import React, { useEffect, useState } from 'react'
import {Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core"
import { buscaId, deleteId } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import './DeletarPostagem.css';
import { toast } from 'react-toastify';

function DeletarPost() {
  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state)=>state.tokens
  );

  const [post, setPosts] = useState<Postagem>()

  useEffect(() => {
      if (token === "") {
        toast.warn('Você precisa estar logado!', {
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
  }, [token])

  useEffect(() => {
      if (id !== undefined) {
          findById(id)
      }
  }, [id])

  async function findById(id: string) {
      await buscaId(`/postagens/${id}`, setPosts, {
          headers: {
              'Authorization': token
          }
      })
  }

  function sim(){
      navigate('/posts')
      deleteId(`/post/${id}`,{
          headers: {
              'Authorization': token
          }     
      });
      
      toast.success('Postagem deletada com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }
  
  function nao(){
      navigate('/posts')
  }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Post:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
              </Box>
              <Box>
              <Button onClick={nao} variant="contained" size='large' color="secondary">
                Não
              </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPost;