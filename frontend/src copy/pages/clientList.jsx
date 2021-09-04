import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import api from '../services/api';
import { Eye, Edit, Trash, ArrowLeft } from 'react-feather';

export default function Home() {
  const history = useHistory();
  const [clients, setClients] = useState([]);
  const [pages, setPage] = useState([1]);
  const [curPage, setCurPage] = useState(1);

  function edit(c) {
    console.log(c);
    history.push('./cadastro');
  }

  function renderClients() {
    setPageQuantity();
    return (
      clients.slice((curPage - 1) * 6, curPage * 6).map((client, i) => {
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
                  <button className='btn btn-transparent p-0 px-1'>
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

  function setPageQuantity() {
    for (let i in clients) {
      let lastPage = pages[pages.length - 1]
      if (i == lastPage * 6) { /* eslint eqeqeq: 0 */
        setPage(oldPages => [...oldPages, lastPage + 1]);
      }
    }
  }

  async function loadClients(filter) {
    setCurPage(1);
    let response = [];
    if (filter === '')
      response = await api.get('/clients/list');
    else
      response = await api.get('/clients/byname/' + filter + "/" + filter)
    setClients(response.data);
    setPageQuantity();
  }

  useEffect(() => {
    loadClients('');
  });

  return (
    <div className='main'>
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
              : <p>NÃO FOI ENCONTRADOS CLIENTES!</p>
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
      </div>
    </div>
  );
}