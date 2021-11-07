import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const Compra = (props) => {
    console.log(props.match.params.id)
    const [data, setData] = useState([]);
    const [id, setID] = useState(props.match.params.id);

    useEffect(() => {
        const getCompra = async () => {
            await axios.get(api + "/compra/" +id)
                .then((response) => {
                    setData(response.data.compra);
                })
                .catch(() => {
                    console.log("erro: nao foi possivel conectar a Api")
                })
        }
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                
                    <div className="mr-auto p-2">
                        <h1>informaçao do servidor</h1>

                    </div>
                    <div className="p-2">
                        <Link to="/listareexcluircompra"
                            className="btn btn-outline-primary btn-sm">Compra</Link>
                    </div>
                    <dl className="row">
                        <dt className="col-sm-3">ProdutoId</dt>
                        <dd className="col-sm-9">{data.produtoId}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">ClienteID</dt>
                        <dd className="col-sm-9">{data.ClienteId}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Valor</dt>
                        <dd className="col-sm-9">{data.valor}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Data</dt>
                        <dd className="col-sm-9">{data.data}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Data do Compra</dt>
                        <dd className="col-sm-9">{data.createdAt}</dd>
                    </dl>

                
            </Container>
        </div>

    )
}