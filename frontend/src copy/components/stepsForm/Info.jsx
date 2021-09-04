import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import api from '../../services/api';
import Button from '../form/Button';
import TextField from '../form/TextField';

export const Info = () => {
  const history = useHistory();
  const { info, setInfo, setStep, step } = useContext(DataContext);
  const [error, setError] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    dataNasc: '',
    cpf: '',
    rg: '',
  });

  function allValid() {
    if (checkId() && checkName(info.nome, 'nome') &&
      checkName(info.sobrenome, 'sobrenome') && checkCpf() &&
      checkDate(info.dataNasc) && checkRg())
      setStep(step + 1);
  }

  /* Verifica se o id já está cadastrado no banco de dados */
  async function checkId() {
    let message = '';
    let valid = true;

    if (info.id == 0 || info.id === "" || info.id < 0) { /* eslint eqeqeq: 0 */
      message = 'id inválido!'
      valid = false;
    } else {
      const result = await api.get('/clients/byid/' + info.id);
      if (result.data.length === 1) {
        message = 'id já existe';
        valid = false;
      }
    }

    setError({ ...error, id: message });
    return valid;
  }

  /* Verifica nome e sobrenome */
  function checkName(value, field) {
    let message = '';
    let valid = true;

    if (value === '') {
      message = field + ' não pode estar vazio!';
      valid = false;
    } else if (!(/^[a-zA-Z '.-]*$/).test(value)) {
      message = field + ' inválido!';
      valid = false;
    }

    setError({ ...error, [field]: message });
    return valid;
  }

  /* Verifica se a data está válida */
  function checkDate(date) {
    let message = '';
    let valid = true;
    const tempDate = new Date();

    if (date === '') {
      message = 'data não pode estar vazia!';
      valid = false;
    }
    else if (date.split('-')[0] < 1900 && date.split('-')[0] > tempDate.getFullYear()) {
      message = 'data inválida!';
      valid = false;
    }

    setError({ ...error, dataNasc: message });
    return valid;
  }

  /* 
  Faz a validação do campo CPF verificando se não existe no banco de dados 
  e se está no formato correto
  */
  async function checkCpf() {
    let message = '';
    let valid = true;

    if (info.cpf === '') {
      message = 'CPF não pode estar vazio!';
      valid = false;
    } else if (!(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/).test(info.cpf)) {
      message = 'CPF inválido! xxx.xxx.xxx-xx ou xxxxxxxxxxx';
      valid = false;
    } else {
      const result = await api.get('/clients/bycpf/' + info.cpf);
      if (result.data.length !== 0) {
        message = 'CPF já existe!';
        valid = false;
      }
    }

    setError({ ...error, cpf: message });
    return valid;
  }

  function checkRg() {
    let message = '';
    let valid = true;
    if (info.rg === '') {
      message = 'RG não pode estar vazio!';
      valid = false;
    } else if (!(/^[0-9.-]*$/).test(info.rg)) {
      message = 'RG inválido!';
      valid = false;
    }

    setError({ ...error, rg: message });
    return valid;
  }

  return (
    <>
      <h3 className='text-semibold mb-5'>Informações Pessoais</h3>
      <div className='col-2 p-0'>
        <TextField
          label='ID'
          onChange={(id) => {
            setInfo({ ...info, id })
          }}
          onBlur={() => checkId()}
          value={info.id}
        />
        {/* <div>
          <label htmlFor='id'>
            ID
          </label>
        </div>
        <input
          onChange={e => {
            setInfo({ ...info, id: e.target.value })
          }}
          onBlur={() => checkId()}
          value={info.id}
          className='w-100 bg-transparent input-style rounded p-2'
          type='number' id='id' placeholder=''
        /> */}
        {<span className='error'>{error.id}</span>}
      </div>
      <div className='row m-0 mt-3 justify-content-between'>
        <div className='col-md-auto p-0'>
          <TextField
            label='Nome'
            onChange={(nome) => {
              setInfo({ ...info, nome })
            }}
            onBlur={(nome) => checkName(nome, 'nome')}
            value={info.nome}
          />
          {/* <div>
            <label htmlFor='nome'>
              Nome
            </label>
          </div>
          <input
            onChange={e => {
              setInfo({ ...info, nome: e.target.value })
            }}
            onBlur={e => checkName(e.target.value, 'nome')}
            value={info.nome}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='nome' placeholder=''
          /> */}
          <div>
            {<span className='error p-0 m-0'>{error.nome}</span>}
          </div>
        </div>

        <div className='col-md-auto p-0'>
          <TextField
            label='Sobrenome'
            onChange={(sobrenome) => {
              setInfo({ ...info, sobrenome })
            }}
            onBlur={(sobrenome) => checkName(sobrenome, 'sobrenome')}
            value={info.sobrenome}
          />
          {/* <div>
            <label htmlFor='sobrenome'>
              Sobrenome
            </label>
          </div>
          <input
            onChange={e => {
              setInfo({ ...info, sobrenome: e.target.value })
            }}
            onBlur={e => checkName(e.target.value, 'sobrenome')}
            value={info.sobrenome}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='sobrenome' placeholder=''
          /> */}
          <div>
            {<span className='error p-0 m-0'>{error.sobrenome}</span>}
          </div>
        </div>
        <div className='col-md-auto p-0'>
          <TextField
            label='Data de Nascimento'
            type='date'
            onChange={(dataNasc) => {
              setInfo({ ...info, dataNasc })
            }}
            onBlur={(dataNasc) => checkDate(dataNasc)}
            value={info.dataNasc}
          />
          {/* <div>
            <label htmlFor='dataNasc'>
              Data de Nascimento
            </label>
          </div>
          <input
            onChange={e => {
              setInfo({ ...info, dataNasc: e.target.value })
            }}
            onBlur={e => checkDate(e.target.value)}
            value={info.dataNasc}
            className='w-100 bg-transparent input-style rounded p-2'
            type='date' id='dataNasc' placeholder=''
          /> */}
          <div>
            {<span className='error p-0 m-0'>{error.dataNasc}</span>}
          </div>
        </div>
      </div>
      <div className='row mt-4 justify-content-center'>
        <div className='col'>
          <TextField
            label='CPF'
            onChange={(cpf) => {
              setInfo({ ...info, cpf })
            }}
            onBlur={() => checkCpf()}
            value={info.cpf}
          />
          {/* <div>
            <label htmlFor='cpf'>
              CPF
            </label>
          </div>
          <input
            onChange={e => {
              setInfo({ ...info, cpf: e.target.value })
            }}
            onBlur={() => checkCpf()}
            value={info.cpf}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='cpf' placeholder=''
          /> */}
          <div>
            {<span className='error p-0 m-0'>{error.cpf}</span>}
          </div>
        </div>
        <div className='col'>
          <TextField
            label='RG'
            onChange={(rg) => {
              setInfo({ ...info, rg })
            }}
            onBlur={() => checkRg()}
            value={info.rg}
          />
          {<span className='error p-0 m-0'>{error.rg}</span>}
        </div>
      </div>
      <div className='row align-items-center justify-content-between mt-5'>
        {/* <div className='col-md-auto'>
          <button type="button" onClick={() => history.push('./')} className='p-1 bg-transparent border-0'>
            Voltar
          </button>
        </div> */}
        <Button onClick={() => history.push('./')}> Voltar </Button>
        <Button onClick={() => allValid()}> Proximo </Button>
        {/* <div className='col-md-auto'>
          <button type="button" onClick={() => allValid()} className='p-1 bg-transparent border-0'>
            Proximo
          </button>
        </div> */}
      </div>
    </>
  );
}