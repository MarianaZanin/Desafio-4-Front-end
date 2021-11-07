import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const ItemPedido = (props) => {
    console.log(props.match.params.id)
    const [data, setData] = useState([]);
    const [id, setID] = useState(props.match.params.id);

    useEffect(() => {
        const getItemPedido = async () => {
            await axios.get(api + "/itempedido/" +id)
                .then((response) => {
                    setData(response.data.itempedido);
                })
                .catch(() => {
                    console.log("erro: nao foi possivel conectar a Api")
                })
        }
        getItemPedido();
    }, [id]);

    return (
        <div>
            <Container>
                
                    <div className="mr-auto p-2">
                        <h1>informaçao do servidor</h1>

                    </div>
                    <div className="p-2">
                        <Link to="/listareexcluiritempedido"
                            className="btn btn-outline-primary btn-sm">Item Pedido</Link>
                    </div>
                    <dl className="row">
                        <dt className="col-sm-3">ServicoId</dt>
                        <dd className="col-sm-9">{data.servicoId}</dd>
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
                        <dt className="col-sm-3">Data do Item Pedido</dt>
                        <dd className="col-sm-9">{data.createdAt}</dd>
                    </dl>

                
            </Container>
        </div>

    )
}