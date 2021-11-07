import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { api } from '../../../config';


export const Inseriritempedido = () => {

    const [itempedido, setItem] = useState({
        ClienteId: '',
        servicoId: '',
        valor: '',
        data: ''
    });
    const valorInput = e => setItemPedido({
        ...itempedido, [e.target.name]: e.target.value
    })

    const [status, SetStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });


    const cadItemPedido= async e => {
        console.log(itempedido);
        e.preventDefault();
        SetStatus({
            formSave: true
        });

        const headers = {
            'Content-type': 'application/json'
        };


        await axios.post(api + "/itempedidos", itempedido, { headers })
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
                        <h1>Inserir Item Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listareexcluiritempedido"
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
                <Form className="p-2" onSubmit={cadItemPedido}>
                    <FormGroup className="p-2">
                        <Label>Id do cliente</Label>
                        <Input type="text" name="ClienteId" placeholder="ID cliente" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ID do serviço</Label>
                        <Input type="text" name="servicoId" placeholder="ID servico" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>valor</Label>
                        <Input type="text" name="valor" placeholder="valor" onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>data</Label>
                        <Input type="text" name="data" placeholder="nascimento cliente" onChange={valorInput} />
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