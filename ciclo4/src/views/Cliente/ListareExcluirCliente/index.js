import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap"

import { api } from "../../../config";

export const ListareExcluirCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''

    });

    

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'error:nao foi possivel conectar a Api'
                })
            });

    }


    const apagarCliente=async(idCliente)=>{
        console.log(idCliente)

        const headers={
            'Content-Type':'application/json'
        }



        await axios.delete(api+"/apagarcliente/"+idCliente,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getClientes();

        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'error:nao foi possivel conectar a Api'

            })
            

        })
    }






    useEffect(() => {
        getClientes();
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
                        <Link to="/inserircliente"
                            className="btn btn-outline-primary btn-sm">
                            Inserir
                        </Link>
                    </div>
                </div>
                <Table striped >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td className="text-center" >  <Link to={"/cliente/"+item.id}
                                className="btn btn-outline-primary btn">consultar</Link> 
                                <Link to={"/atualizarcliente/"+item.id}
                                className="btn btn-outline-warning btn-sm m-1">Atualizar</Link> 
                                <span className="btn btn-outline-danger btn-sm-m1"
                                        onClick={()=>apagarCliente(item.id)}>Excluir</span>
                                </td>
                            </tr>


                        ))}

                    </tbody>
                </Table>
            </Container>

        </div>
    )
}