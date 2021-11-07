import{Container} from 'reactstrap';


export const Home = () => {
    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>pagina inicial</h1>

                    </div>
                    <div className="p-2">
                        <a href="/listareexcluircliente"
                        className="btn btn-outline-primary btn-sm">Cliente</a>

                    </div>
                    <div className="p-2">
                        <a href="/listareexcluirservico"
                        className="btn btn-outline-primary btn-sm">Servico</a>

                    </div>
                    <div className="p-2">
                        <a href="/listareexcluirpedido"
                        className="btn btn-outline-primary btn-sm">Pedido</a>

                    </div>
                    <div className="p-2">
                        <a href="/listareexcluircompra"
                        className="btn btn-outline-primary btn-sm">Compra</a>

                    </div>
                    <div className="p-2">
                        <a href="/listareexcluirproduto"
                        className="btn btn-outline-primary btn-sm">Produto</a>

                    </div>
                    <div className="p-2">
                        <a href="/listareexcluiritemcompra"
                        className="btn btn-outline-primary btn-sm">Item Compra</a>

                    </div>
                </div>
                
            </Container>
        </div>
    )
}