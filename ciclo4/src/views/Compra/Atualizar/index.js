import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, FormGroup, Input, Label, Spinner, Button, Alert } from 'reactstrap'
import { api } from '../../../config';

export const Atualizarcompra = (props) => {

    const [id] = useState(props.match.params.id);
    const [ClienteId, setCliente] = useState('');
    const [produtoId, setProduto] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const atlCompra = async e => {
        e.preventDefault();
        console.log("Atualizar")


        setStatus({
            formSave: true
        });

        const headers = {
            'content-type': 'application/json'
        }

        await axios.put(api + "/atualizarcompra", { id, ClienteId, produtoId,valor,data}, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        formSave: false,
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        formSave: false,
                        type: 'sucess',
                        message: response.data.message
                    });
                }

                })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'erro:nao foi possivel acessar api'
                });
            })

    }

    useEffect(() => {
        const getCompra = async () => {
            await axios.get(api + "/compra/" + id)
                .then((response) => {
                    setCliente(response.data.compra.ClienteId);
                    setProduto(response.data.compra.produtoId);
                    setValor(response.data.compra.valor);
                    setData(response.data.compra.data);
                

                })
                .catch(() => {
                    console.log("erro nao foi possivel acessar api")
                })
        }
        getCompra()
    }, [id])



    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-50 p-2">
                        <h1>Atualizar um Compra</h1>
                    </div>
                    <div>
                        <Link to={"/listareexcluircompra/"}
                            className="btn btn-outline-primary btn-sm m-3">Listar </Link>
                        <Link to={"/compra/" + id}
                            className="btn btn-outline-primary btn-sm m-3">Consultar </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={atlCompra}>
                    <FormGroup className="p-2">
                        <Label>Id do cliente</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="id do cliente" value={ClienteId} onChange={e => setCliente(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Id do produto</Label>
                        <Input type="text" name="produtoId"
                            placeholder="id do produto" value={produtoId} onChange={e => setProduto(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>valor</Label>
                        <Input type="text" name="valor"
                            placeholder="valor do produto" value={valor} onChange={e => setValor(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>data</Label>
                        <Input type="text" name="data"
                            placeholder="data requisicao" value={data} onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    {status.formSave ?
                        <Button type="submit" outline color="warning" disabled>Salvando...
                            <Spinner size="sm" color="warning" /></Button> :
                        <Button type="submit" outline color="warning">Salvar</Button>}
                    <Button type="reset" outline color="sucess">Limpar</Button>
                </Form>

            </Container>
        </div>
    )
}