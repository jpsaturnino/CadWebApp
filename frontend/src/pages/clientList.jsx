import React, { useEffect, useState } from 'react';
//import { useHistory } from "react-router-dom";
import api from '../services/api';
import { Eye, Edit, Trash, Search } from 'react-feather';

export default function Home() {
  //const history = useHistory();
  const [clients, setClients] = useState([]);
  const [pages, setPage] = useState([1]);
  const [curPage, setCurPage] = useState(1);

  function renderClients() {
    setPageQuantity();
    return (
      clients.slice((curPage - 1) * 6, curPage * 6).map((client, i) => {
        return (
          <div className='col-sm-4 m-0 mb-3' key={i}>
            <li className="col-sm-12 container rounded p-2 list">
              <div className='row justify-content-between align-items-center'>
                <header className='col-auto'>
                  <div className='col'>
                    <p className='m-0 text-black'>ID: {client.cli_id}</p>
                    <p className='m-0 text-black'>{client.cli_nome}</p>
                  </div>
                </header>
                <div className='col-auto'>
                  <button className='btn btn-transparent p-0 px-1'>
                    <Trash size={18} color='black' />
                  </button>
                  <button className='btn btn-transparent p-0 px-1'>
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
      if (i == lastPage * 6) /* eslint eqeqeq: 0 */ {
        setPage(oldPages => [...oldPages, lastPage + 1]);
      }
    }
  }

  async function searchClient(name) {
    alert(name);
  }

  useEffect(() => {
    async function loadClients() {
      const response = await api.get('/clients/list');
      setClients(response.data);
    }
    loadClients();
  }, []);

  return (
    <div className='main'>
      <h1 className='text-center text-bold'>Lista de Clientes</h1>
      <div className='mx-auto shadow p-4 container'>
        <div className='row mb-5 align-items-center justify-content-end'>
          <div className='col-auto p-0'>
            <button className='p-2 btn btn-primary rounded'>
              <Search />
            </button>
          </div>
          <div className='col-auto'>
            <input type='text' onBlur={e => searchClient(e.target.value)} className='w-100 bg-transparent input-style rounded p-2' />
          </div>
        </div>

        <ul className='row p-0 align-items-center justify-content-start'>
          {
            clients.length !== 0
              ? renderClients()
              : <p>NÃO HÁ CLIENTES CADASTRADOS!</p>
          }
        </ul>

        <div className='row w-100 justify-content-center'>

          {
            clients.length !== 0
              ? pages.map((page) => {
                return (
                  <div className='col-auto px-1'>
                    <button className='p-0 px-2 btn btn-primary' onClick={() => { setCurPage(page) }} key={page}>
                      {page}
                    </button>
                  </div>
                );
              })
              : null
          }
          <span className='text-center text-semibold p-2'>Pagina: {curPage}</span>
        </div>
      </div>
    </div>
  );
}