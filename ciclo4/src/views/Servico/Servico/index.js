import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const Servico = (props) => {
    console.log(props.match.params.id)
    const [data, setData] = useState([]);
    const [id, setID] = useState(props.match.params.id);

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + "/servico/" +id)
                .then((response) => {
                    setData(response.data.sservico);
                })
                .catch(() => {
                    console.log("erro: nao foi possivel conectar a Api")
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                
                    <div className="mr-auto p-2">
                        <h1>informaçao do servidor</h1>

                    </div>
                    <div className="p-2">
                        <Link to="/listareexcluirservico"
                            className="btn btn-outline-primary btn-sm">Voltar Lista Servico</Link>
                            <Link to={"/atualizarservico/"+data.id}
                                className="btn btn-outline-warning btn-sm m-1">Atualizar</Link> 
                    </div>
                    <dl className="row">
                        <dt className="col-sm-3">Nome</dt>
                        <dd className="col-sm-9">{data.nome}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Descricao</dt>
                        <dd className="col-sm-9">{data.descricao}</dd>
                    </dl>

                
            </Container>
        </div>

    )
}