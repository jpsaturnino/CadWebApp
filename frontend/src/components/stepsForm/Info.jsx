import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import api from '../../services/api';
import Button from '../form/Button';
import Error from '../form/Error';
import TextField from '../form/TextField';

const defaultError = {
  id: '',
  nome: '',
  sobrenome: '',
  dataNasc: '',
  cpf: '',
  rg: '',
}

export const Info = () => {
  const history = useHistory();
  const { info, setInfo, setStep, step, action } = useContext(DataContext);
  const [error, setError] = useState(defaultError);

  /* Verifica todos os campos antes de seguir */
  function allValid() {
    checkId().then((id) => {
      if (id) {
        checkCpf().then((cpf) => {
          if (cpf && checkName(info.nome, 'nome') && checkName(info.sobrenome, 'sobrenome')
            && checkDate(info.dataNasc) && checkRg())
            setStep(step + 1);
        })
      }
    })
  }

  /* Verifica o id e se já está cadastrado no banco de dados */
  async function checkId() {
    let message = '';
    let valid = true;

    if (action !== 'edit') {
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
    } else if (!(/^[a-zA-Z\u00C0-\u017F '.-]*$/).test(value)) {
      message = field + ' inválido!';
      valid = false;
    }

    setError({ ...error, [field]: message });
    return valid;
  }

  /* Verifica se a data é válida */
  function checkDate(date) {
    let message = '';
    let valid = true;
    const tempDate = new Date();

    if (date === '') {
      message = 'data não pode estar vazia!';
      valid = false;
    }
    else if (date.split('-')[0] < 1950 || date.split('-')[0] >= tempDate.getFullYear()) {
      message = 'data inválida!';
      valid = false;
    }

    setError({ ...error, dataNasc: message });
    return valid;
  }

  /* 
  Verifica o CPF no banco de dados 
  e se está no formato correto
  */
  async function checkCpf() {
    let message = '';
    let valid = true;

    if (action !== 'edit') {
      if (info.cpf === '') {
        message = 'CPF não pode estar vazio!';
        valid = false;
      } else if (!(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/).test(info.cpf)) {
        message = 'CPF inválido! xxx.xxx.xxx-xx';
        valid = false;
      } else {
        const result = await api.get('/clients/bycpf/' + info.cpf);
        if (result.data.length !== 0) {
          message = 'CPF já existe!';
          valid = false;
        }
      }
    }

    setError({ ...error, cpf: message });
    return valid;
  }

  /* Verifica e valida formato do RG */
  function checkRg() {
    let message = '';
    let valid = true;

    if (info.rg === '') {
      message = 'RG não pode estar vazio!';
      valid = false;
    } else if (!(/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9X]{1}$/).test(info.rg)) {
      message = 'RG inválido! xx.xxx.xxx-x';
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
          type='number'
          onChange={(id) => {
            setInfo({ ...info, id })
          }}
          onBlur={() => checkId()}
          value={info.id}
          disabled={action === 'edit' ? true : false}
        />
        <Error>{error.id}</Error>
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
          <Error>{error.nome}</Error>
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
          <Error>{error.sobrenome}</Error>
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
          <Error>{error.dataNasc}</Error>
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
            disabled={action === 'edit' ? true : false}
          />
          <Error>{error.cpf}</Error>
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
          <Error>{error.rg}</Error>
        </div>
      </div>

      <div className='row align-items-center justify-content-between mt-5'>
        <Button divClass='col text-start' onClick={() => history.push('./')}> Voltar </Button>
        <Button divClass='col text-end' onClick={() => allValid()}> Proximo </Button>
      </div>
    </>
  );
}