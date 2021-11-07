import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { api } from '../../../config';


export const Inserir = () => {

    const [sservico, setServico] = useState({
        nome: '',
        descricao: ''
    });
    const valorInput = e => setServico({
        ...sservico, [e.target.name]: e.target.value
    })

    const [status, SetStatus] = useState({
        formSave: false,

        type: '',
        message: ''
    });


    const cadServico = async e => {
        console.log(sservico);
        e.preventDefault();
        SetStatus({
            formSave: true
        });

        const headers = {
            'Content-type': 'application/json'
        };


        await axios.post(api + "/servicos", sservico, { headers })
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
                        <h1>Inserir Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listareexcluirservico"
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


                <Form className="p-2" onSubmit={cadServico}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome do Servico" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Descricao</Label>
                        <Input type="text" name="descricao" placeholder="Descricao do Servico" onChange={valorInput} />
                    </FormGroup>
                    {status.formSave ?
                    <Button type="submit" outline color="info" disabled>Salvando...
                        <Spinner size="sm" color="primary" /></Button> :
                    <Button type="submit" outline color="info">Inserir</Button>}
                    
                </Form>


            </Container>
        </div>
    )
}