import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import api from '../../services/api';

export const Info = () => {
  const { info, setInfo } = useContext(DataContext);
  const [error, setError] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    dataNasc: '',
    cpf: '',
    rg: '',
  });

  async function checkId(id) {
    const result = await api.get('/clients/byid/' + id);
    let message = '';
    if (result.data.length === 1) {
      message = 'id já existe';
    }
    setError(prev => {
      return { ...prev, id: message }
    });
  }

  function checkName(name, flag) {
    let message = '';
    if (name === '') {
      message = 'nome não pode estar vazio!';
    } else if (!(/^[a-zA-Z '.-]*$/).test(name)) {
      message = 'nome inválido!';
    }
    if (flag === 'nome')
      setError(prev => {
        return { ...prev, nome: message }
      });
    else
      setError(prev => {
        return { ...prev, sobrenome: message }
      });
  }

  function checkDate(date) {
    let message = '';
    const dt = new Date();
    if (date === '') {
      message = 'data não pode estar vazia!';
    } else if (date.split('-')[0] < 1900 && date.split('-')[0] > dt.getFullYear()) {
      message = 'data inválida!';
    }
    setError(prev => {
      return { ...prev, dataNasc: message }
    });
  }

  async function checkCpf() {
    let message = '';
    if (info.cpf === '') {
      message = 'CPF não pode estar vazio!';
    } else if (!(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/).test(info.cpf)) {
      message = 'CPF inválido! xxx.xxx.xxx-xx ou xxxxxxxxxxx';
    } else {
      const result = await api.get('/clients/bycpf/' + info.cpf);
      if (result.data.length !== 0) {
        message = 'CPF já existe!';

      }
    }

    setError(prev => {
      return { ...prev, cpf: message }
    });
  }

  function checkRg() {
    let message = '';
    if (info.rg === '') {
      message = 'RG não pode estar vazio!';
    } else if (!(/^[0-9.-]*$/).test(info.rg)) {
      message = 'RG inválido!';
    }

    setError(prev => {
      return { ...prev, rg: message }
    });
  }

  return (
    <>
      <h3 className='text-semibold mb-5'>Informações Pessoais</h3>
      <div className='col-2 p-0'>
        <div>
          <label htmlFor='id'>
            ID
          </label>
        </div>
        <input
          onChange={e => {
            const newId = e.target.value;
            setInfo(prev => {
              return { ...prev, id: newId }
            })
          }}
          onBlur={e => checkId(e.target.value)}
          value={info.id}
          className='w-100 bg-transparent input-style rounded p-2'
          type='text' id='id' placeholder=''
        />
        {<span className='error'>{error.id}</span>}
      </div>
      <div className='row m-0 mt-3 justify-content-between'>
        <div className='col-md-auto p-0'>
          <div>
            <label htmlFor='nome'>
              Nome
            </label>
          </div>
          <input
            onChange={e => {
              const newName = e.target.value;
              setInfo(prev => {
                return { ...prev, nome: newName }
              })
            }}
            onBlur={e => checkName(e.target.value, 'nome')}
            value={info.nome}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='nome' placeholder=''
          />
          <div>
            {<span className='error p-0 m-0'>{error.nome}</span>}
          </div>
        </div>

        <div className='col-md-auto p-0'>
          <div>
            <label htmlFor='sobrenome'>
              Sobrenome
            </label>
          </div>
          <input
            onChange={e => {
              const newSurname = e.target.value;
              setInfo(prev => {
                return { ...prev, sobrenome: newSurname }
              })
            }}
            onBlur={e => checkName(e.target.value, 'sobrenome')}
            value={info.sobrenome}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='sobrenome' placeholder=''
          />
          <div>
            {<span className='error p-0 m-0'>{error.sobrenome}</span>}
          </div>
        </div>
        <div className='col-md-auto p-0'>
          <div>
            <label htmlFor='dataNasc'>
              Data de Nascimento
            </label>
          </div>
          <input
            onChange={e => {
              const newDate = e.target.value;
              setInfo(prev => {
                return { ...prev, dataNasc: newDate }
              })
            }}
            onBlur={e => checkDate(e.target.value)}
            value={info.dataNasc}
            className='w-100 bg-transparent input-style rounded p-2'
            type='date' id='dataNasc' placeholder=''
          />
          <div>
            {<span className='error p-0 m-0'>{error.dataNasc}</span>}
          </div>
        </div>
      </div>
      <div className='row mt-4 justify-content-center'>
        <div className='col'>
          <div>
            <label htmlFor='cpf'>
              CPF
            </label>
          </div>
          <input
            onChange={e => {
              const newCpf = e.target.value;
              setInfo(prev => {
                return { ...prev, cpf: newCpf }
              })
            }}
            onBlur={() => checkCpf()}
            value={info.cpf}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='cpf' placeholder=''
          />
          <div>
            {<span className='error p-0 m-0'>{error.cpf}</span>}
          </div>
        </div>
        <div className='col'>
          <div>
            <label htmlFor='rg'>
              RG
            </label>
          </div>
          <input
            onChange={e => {
              const newRg = e.target.value;
              setInfo(prev => {
                return { ...prev, rg: newRg }
              })
            }}
            onBlur={() => checkRg()}
            value={info.rg}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='rg' placeholder=''
          />
          {<span className='error p-0 m-0'>{error.rg}</span>}
        </div>
      </div>
    </>
  );
}