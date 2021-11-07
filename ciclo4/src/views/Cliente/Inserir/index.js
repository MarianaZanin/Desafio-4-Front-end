import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { api } from '../../../config';


export const Inserircliente = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: ''
    });
    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    })

    const [status, SetStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });


    const insCliente = async e => {
        console.log(cliente);
        e.preventDefault();
        SetStatus({
            formSave: true
        });

        const headers = {
            'Content-type': 'application/json'
        };


        await axios.post(api + "/clientes", cliente, { headers })
            .then((response) => {
                if (response.data.error) {
                    SetStatus({
                        formSave: false,
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    SetStatus({
                        formSave: false,
                        type: 'sucess',
                        message: response.data.message
                    });


                }

            })
            .catch(() => {
                SetStatus({
                    formSave: false,
                    type: 'error',
                    message: "erro:nao foi "
                });

            });


    };





    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Inserir Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/visualizarcliente"
                            className="btn btn-outline-primary btn-sm">
                            Listar
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />


                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : ""}
                {status.type === 'sucess' ? <Alert color="sucess">
                    {status.message}</Alert> : ""}


                <Form className="p-2" onSubmit={insCliente}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome do cliente" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Endereço</Label>
                        <Input type="text" name="endereco" placeholder="Endereco cliente" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input type="text" name="cidade" placeholder="Cidade do cliente" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>UF</Label>
                        <Input type="text" name="uf" placeholder="uf do cliente" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nascimeento</Label>
                        <Input type="text" name="nascimento" placeholder="nascimento do cliente" onChange={valorInput} />
                    </FormGroup>
                    {status.formSave ?
                    <Button type="submit" outline color="info" disabled>Salvando...
                        <Spinner size="sm" color="primary" /></Button> :
                    <Button type="submit" outline color="info">Inserir</Button>}
                    <Button type="reset" outline color="info">Resetar</Button>
                </Form>


            </Container>
        </div>
    )
}