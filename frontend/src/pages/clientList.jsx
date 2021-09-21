import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import api from '../services/api';
import { Eye, Edit, ArrowLeft } from 'react-feather';
import { DataContext } from '../context/DataContext';
import { Button, Modal } from 'react-bootstrap';

export default function Home() {
  const history = useHistory();
  const { setInfo, setAddress, setPhone, setAction, info, defaultInfo } = useContext(DataContext);
  const [clients, setClients] = useState([]);
  const [pages, setPage] = useState([1]);
  const [curPage, setCurPage] = useState(1);
  const [show, setShow] = useState(false);
  const [qtyClients, setQty] = useState(6);

  /* Controla a Modal */
  const handleClose = () => { setShow(false); setInfo(defaultInfo) };
  const handleShow = () => { setShow(true) };

  /* Carrega os dados do cliente que vao ser editados */
  async function edit(c) {
    const p = await api.get('/phone/' + c.cli_id);
    const a = await api.get('/address/' + c.cli_id);

    setAction('edit');
    setInfo({
      id: c.cli_id,
      nome: c.cli_nome,
      sobrenome: c.cli_sobrenome,
      dataNasc: c.cli_dataNasc?.split('T')[0],
      cpf: c.cli_cpf,
      rg: c.cli_rg,
      facebook: c.cli_facebook,
      instagram: c.cli_instagram,
      linkedin: c.cli_linkedin,
      twitter: c.cli_twitter
    });

    setAddress(a.data);
    setPhone(p.data);
    history.push('./cadastro');
  }


  async function view(c) {
    setInfo(c);
  }

  /* Carrega e renderiza lista dos clientes que estao cadastrados no banco de dados */
  function renderClients() {
    setPageQuantity();

    return (
      clients.slice((curPage - 1) * qtyClients, curPage * qtyClients).map((client, i) => {
        return (
          <div className='col-sm-4 m-0 mb-3' key={i}>
            <li className="col-sm-12 container rounded p-2 list">
              <div className='row align-items-center'>
                <header className='col-5'>
                  <div className='col'>
                    <p className='m-0 text-black'>ID: {client.cli_id}</p>
                    <p className='m-0 text-black'>{client.cli_nome}</p>
                  </div>
                </header>
                <div className='col-auto'>
                  <button onClick={() => edit(client)} className='btn btn-transparent p-0 px-1'>
                    <Edit size={18} color='black' />
                  </button>
                  <button onClick={() => { view(client); handleShow() }} className='btn btn-transparent p-0 px-1'>
                    <Eye size={18} color='black' />
                  </button>
                </div>
              </div>
            </li>
          </div>
        )
      })
    );
  }

  /* Controla a quantidade de paginas para paginacao, a partir de um maximo por pagina */
  function setPageQuantity() {
    for (let i in clients) {
      let lastPage = pages[pages.length - 1]
      if (i == lastPage * qtyClients) { /* eslint eqeqeq: 0 */
        setPage(oldPages => [...oldPages, lastPage + 1]);
      }
    }
  }

  /* Carrega os clientes cadastrados no banco, e com base no filtro pode mostrar alguns ou todos */
  async function loadClients(filter) {
    setCurPage(1);
    let response = [];
    if (filter === '')
      response = await api.get('/clients/list');
    else
      response = await api.get('/clients/byname/' + filter + "/" + filter)
    setClients(response.data);
  }

  useEffect(() => {
    loadClients('');
  }, []);

  return (
    <main className='main'>
      <div className='row align-items-center justify-content-center mb-2'>
        <div className='col-auto'>
          <button onClick={() => history.push('./')} type='button' className='btn btn-transparent p-2'>
            <ArrowLeft />
          </button>
        </div>
        <div className='col-auto'>
          <h1 className='text-center text-bold m-0'>Lista de Clientes</h1>
        </div>
      </div>

      <div className='mx-auto shadow p-4 container'>
        <div className='row mb-5 align-items-center justify-content-end'>
          <div className='col-auto'>
            <input
              type='text' onChange={e => { loadClients(e.target.value); setPage([1]) }}
              className='w-100 text-white bg-transparent input-style rounded p-2'
              placeholder='Pesquisar cliente...'
            />
          </div>
        </div>

        <ul className='row p-0 align-items-center justify-content-start'>
          {
            clients.length !== 0
              ? renderClients()
              : <p>CARREGANDO...</p>
          }
        </ul>

        <div className='row w-100 justify-content-center'>
          {
            clients.length !== 0
              ? pages.map((page) => {
                return (
                  <div className='col-auto px-1' key={page}>
                    <button className='p-0 px-2 btn btn-primary' onClick={() => { setCurPage(page); }} >
                      {page}
                    </button>
                  </div>
                );
              })
              : null
          }
          {
            clients.length !== 0
              ? <span className='text-center text-semibold p-2'>Pagina: {curPage}</span>
              : null
          }
        </div>
        <div className='row align-items-center justify-content-end'>
          <div className='col-auto p-0'>
            <p className='m-0'>Vizualizar:</p>
          </div>
          <div className='col-3 text-center'>
            <select
              className='w-100 p-0 bg-transparent input-style rounded'
              value={qtyClients}
              onChange={e => {
                setQty(e.target.value);
                setCurPage(1);
                setPage([1]);
                setPageQuantity();
              }}>
              <option value='' disabled>
                Vizualizando {qtyClients} clientes por pagina...
              </option>
              <option value="6">6 clientes</option>
              <option value="12">12 clientes</option>
              <option value="18">18 clientes</option>
              <option value="24">24 clientes</option>
            </select>
          </div>
        </div>
      </div>

      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-black'>Cliente {info.cli_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <h3 className='text-black text-semibold mb-4'>Dados Pessoais</h3>
          <div className='row'>
            <p className='text-black m-0' >NOME: {info.cli_nome}</p>
            <p className='text-black m-0'>SOBRENOME: {info.cli_sobrenome}</p>
            <p className='text-black m-0' >NASCIMENTO: {info.cli_dataNasc?.split('T')[0]}</p>
            <p className='text-black m-0'>CPF: {info.cli_cpf}</p>
            <p className='text-black m-0'>RG: {info.cli_rg}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

    </main >
  );
}
