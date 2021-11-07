import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap"

import { api } from "../../../config";

export const ListareExcluirItemPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''

    });


    const getItemPedido = async () => {
        await axios.get(api + "/listaitempedido")
            .then((response) => {
                console.log(response.data.itempedidos);
                setData(response.data.itempedidos)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'error:nao foi possivel conectar a Api'
                })
            });

    }


    const apagarItemPedido=async(idItemPedido)=>{
        console.log(idItemPedido)

        const headers={
            'Content-Type':'application/json'
        }



        await axios.delete(api+"/apagaritempedido/"+idItemPedido,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getItemPedidos();

        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'error:nao foi possivel conectar a Api'

            })
            

        })
    }



    useEffect(() => {
        getItemPedidos();
    }, []);

    return (
        <div className="p-3">
            <Container>
                {status.type==='error'? <Alert color="danger">{status.message}</Alert> : ""}
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Informações do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inseriritempedido"
                            className="btn btn-outline-primary btn-sm">
                            Inserir
                        </Link>
                    </div>
                </div>

                <Table striped >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ServicoId</th>
                            <th>ClienteId</th>
                            <th>valor</th>
                            <th>data</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.servicoId}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.valor}</td>
                                <td>{item.data}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>
                                <td className="text-center" >  <Link to={"/itempedido/"+item.id}
                                className="btn btn-outline-primary btn">consultar</Link> 
                                <Link to={"/atualizaritempedido/"+item.id}
                                className="btn btn-outline-warning btn-sm m-1">Atualizar</Link> 
                                <span className="btn btn-outline-danger btn-sm-m1"
                                        onClick={()=>apagarItemPedido(item.id)}>Excluir</span>
                                </td>
                            </tr>


                        ))}

                    </tbody>
                </Table>
            </Container>

        </div>
    )
}