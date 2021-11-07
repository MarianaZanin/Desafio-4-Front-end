import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap"

import { api } from "../../../config";

export const ListareExcluirServico = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''

    });


    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'error:nao foi possivel conectar a Api'
                })
            });

    }

    const apagarServico=async(idServico)=>{
        console.log(idServico)

        const headers={
            'Content-Type':'application/json'
        }



        await axios.delete(api+"/apagarservico/"+idServico,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getServicos();

        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'error:nao foi possivel conectar a Api'

            })
            

        })
    }


    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div className="p-3">
            <Container>
                {status.type==='error'? <Alert color="danger">{status.message}</Alert> : ""}
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Informações do Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserirservico"
                            className="btn btn-outline-primary btn-sm">
                            Inserir
                        </Link>
                    </div>
                </div>
                <Table striped >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Servico</th>
                            <th>descricao</th>
                            <th>acoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center" >  <Link to={"/servico/"+item.id}
                                className="btn btn-outline-primary btn-sm m-1">consultar</Link> 
                                <Link to={"/atualizarservico/"+item.id}
                                className="btn btn-outline-warning btn-sm m-1">Atualizar</Link> 
                                <span className="btn btn-outline-danger btn-sm-m1"
                                        onClick={()=>apagarServico(item.id)}>Excluir</span>
                                </td>
                            </tr>


                        ))}

                    </tbody>
                </Table>
            </Container>

        </div>
    )
}