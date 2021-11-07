import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from './views/Home/';

import { Menu } from './componentes/menu';
import { Servico } from './views/Servico/Servico';
import { Cliente } from './views/Cliente/Cliente';
import { Pedido } from './views/Pedido/Pedido';
import { Compra } from './views/Compra/Compra';
import { Produto } from './views/Produto/Produto';
import { ItemCompra } from './views/ItemCompra/ItemCompra';
import { ItemPedido } from './views/ItemPedido/ItemPedido';

import { ListareExcluirProduto } from './views/Produto/ListareExcluirProduto';
import { ListareExcluirServico } from './views/Servico/ListareExcluirServico';
import { ListareExcluirCliente } from './views/Cliente/ListareExcluirCliente';
import { ListareExcluirPedido } from './views/Pedido/ListareExcluirPedido';
import { ListareExcluirCompra } from './views/Compra/ListareExcluirCompra';
import { ListareExcluirItemCompra } from './views/ItemCompra/ListareExcluirItemCompra';
import { ListareExcluirItemPedido } from './views/ItemPedido/ListareExcluirItemPedido';

import { Inserir } from './views/Servico/Inserir';
import { Inserircliente } from './views/Cliente/Inserir';
import { Inserirpedido } from './views/Pedido/Inserir';
import { Inserircompra } from './views/Compra/Inserir';
import { Inserirproduto } from './views/Produto/Inserir';
import { Inseriritemcompra } from './views/ItemCompra/Inserir';
import { Inseriritempedido } from './views/ItemPedido/Inserir';

import { Atualizar } from './views/Servico/Atualizar';
import{ Atualizarcliente } from './views/Cliente/Atualizar'
import { Atualizarpedido } from './views/Pedido/Atualizar';
import { Atualizarcompra } from './views/Compra/Atualizar';
import { Atualizarproduto } from './views/Produto/Atualizar';
import { Atualizaritemcompra } from './views/ItemCompra/Atualizar';
import { Atualizaritempedido } from './views/ItemPedido/Atualizar';




function App() {
  return (
    <div>
      <Menu/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/listareexcluirservico" component={ListareExcluirServico} />
          <Route path="/listareexcluircliente" component={ListareExcluirCliente} />
          <Route path="/listareexcluirpedido" component={ListareExcluirPedido} />
          <Route path="/listareexcluircompra" component={ListareExcluirCompra} />
          <Route path="/listareexcluirproduto" component={ListareExcluirProduto} />
          <Route path="/listareexcluiritemcompra" component={ListareExcluirItemCompra} />
          <Route path="/listareexcluiritempedido" component={ListareExcluirItemPedido} />
          <Route path="/servico/:id" component={Servico} />
          <Route path="/cliente/:id" component={Cliente} />
          <Route path="/pedido/:id" component={Pedido} />
          <Route path="/compra/:id" component={Compra} />
          <Route path="/produto/:id" component={Produto} />
          <Route path="/itemcompra/:id" component={ItemCompra} />
          <Route path="/itempedido/:id" component={ItemPedido} />
          <Route path="/inserirservico" component={Inserir} />
          <Route path="/inserircliente" component={Inserircliente} />
          <Route path="/inserirpedido" component={Inserirpedido} />
          <Route path="/inserircompra" component={Inserircompra} />
          <Route path="/inserirproduto" component={Inserirproduto} />
          <Route path="/inseriritemcompra" component={Inseriritemcompra} />
          <Route path="/inseriritempedido" component={Inseriritempedido} />
          

          <Route path="/atualizarservico/:id" component={Atualizar} />
          <Route path="/atualizarcliente/:id" component={Atualizarcliente} />
          <Route path="/atualizarpedido/:id" component={Atualizarpedido} />
          <Route path="/atualizarcompra/:id" component={Atualizarcompra} />
          <Route path="/atualizarproduto/:id" component={Atualizarproduto} />
          <Route path="/atualizaritemcompra/:id" component={Atualizaritemcompra} />
          <Route path="/atualizaritempedido/:id" component={Atualizaritempedido} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;