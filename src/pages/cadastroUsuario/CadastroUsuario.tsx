import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: ""
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: ""
        })

    useEffect(() => { //se o id for diferente de 0 direciona para tela do login
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        // Estrutura Condicional que verifica se as senhas batem e se a Senha tem mais de 8 caracteres
        if (confirmarSenha === user.senha && user.senha.length >= 8) {

            //Tenta executar o cadastro
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                alert("Usuário cadastrado com sucesso")

                //Se houver erro, pegue o Erro e retorna uma msg
            } catch (error) {
                console.log(`Error: ${error}`)

                //Pode modificar a msg de acordo com o erro 
                alert("Usuário já existente")
            }

        } else {
            alert("Insira no miníno 8 caracteres na senha.")

            setUser({ ...user, senha: "" }) // Reinicia o campo de Senha
            setConfirmarSenha("")           // Reinicia o campo de Confirmar Senha
        }
    }
    return(
    <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item xs={6} className='imagem2'></Grid>
        <Grid item xs={6} alignItems='center'>
            <Box paddingX={10}>
                <form onSubmit={onSubmit}>
                    <Typography variant='h3' 
                    gutterBottom 
                    color='textPrimary' 
                    component='h3' 
                    align='center' 
                    className='textos2'>Cadastrar
                    </Typography>

                    <TextField 
                    value={user.nome} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                    id='nome' 
                    label='Nome' 
                    variant='outlined' 
                    name='Nome' 
                    margin='normal' 
                    fullWidth />

                    <TextField 
                    value={user.usuario} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                    id='usuario' 
                    label='Usuário' 
                    variant='outlined' 
                    name='Usuário' 
                    margin='normal' 
                    fullWidth />

                    <TextField
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    value={user.foto}
                    id='foto'
                    label='Foto'
                    variant='outlined'
                    name='Foto'
                    margin='normal'
                    fullWidth />

                    <TextField 
                    value={user.senha} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                    id='senha' 
                    label='Senha' 
                    variant='outlined' 
                    name='Senha' 
                    margin='normal' 
                    type='password' fullWidth />

                    <TextField 
                    value={confirmarSenha} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} 
                    id='confirmarSenha' 
                    label='Confirmar Senha' 
                    variant='outlined' 
                    name='Confirmar Senha' 
                    margin='normal' 
                    type='password' 
                    fullWidth />

                    <Box marginTop={2} textAlign='center'>
                        <Link to='/login' className='text-decorator-none'>
                            <Button variant='contained' color='secondary' className='btnCancelar'>
                                Cancelar
                            </Button>
                        </Link>
                        <Button type='submit' variant='contained' color='primary'>
                            Cadastrar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Grid>
    </Grid>
     );
}

export default CadastroUsuario;