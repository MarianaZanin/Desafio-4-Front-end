import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, FormGroup, Input, Label, Spinner, Button, Alert } from 'reactstrap'
import { api } from '../../../config';

export const Atualizarproduto = (props) => {

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const atlProduto = async e => {
        e.preventDefault();
        console.log("Atualizar")


        setStatus({
            formSave: true
        });

        const headers = {
            'content-type': 'application/json'
        }

        await axios.put(api + "/atualizarproduto", { id, nome, descricao }, { headers })
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
        const getProduto = async () => {
            await axios.get(api + "/produto/" + id)
                .then((response) => {
                    setNome(response.data.sproduto.nome);
                    setDescricao(response.data.sproduto.descricao);

                })
                .catch(() => {
                    console.log("erro nao foi possivel acessar api")
                })
        }
        getProduto()
    }, [id])



    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-50 p-2">
                        <h1>Atualizar um produto</h1>
                    </div>
                    <div>
                        <Link to={"/listareexcluirproduto/"}
                            className="btn btn-outline-primary btn-sm m-3">Listar </Link>
                        <Link to={"/produto/" + id}
                            className="btn btn-outline-primary btn-sm m-3">Consultar </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={atlProduto}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            placeholder="nome do produto" value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Descriçao</Label>
                        <Input type="text" name="descricao"
                            placeholder="descriçao do produto" value={descricao} onChange={e => setDescricao(e.target.value)} />
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