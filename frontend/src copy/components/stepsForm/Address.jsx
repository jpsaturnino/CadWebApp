import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import axios from 'axios';
import { Edit, Trash } from 'react-feather';

export const Address = () => {
  const { address, setAddress, info, setStep, step } = useContext(DataContext);
  const defaultValues = {
    cli_id: info.id,
    rua: '',
    cep: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: ''
  }
  const [adAux, setAux] = useState(defaultValues);
  const [error, setError] = useState({
    cep: '',
    rua: '',
    endereco: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: ''
  })

  /* 
  Utiliza a API do via cep para fazer uma requisição HTTP que retorna dados do endereco 
  em formato JSON a partir de determinado cep
  */
  function searchCep(e) {
    e.preventDefault();
    let message = '';
    const { value } = e.target;
    const cep = value?.replace(/[^0-9]/g, ''); //formata o valor do input deixando apenas numeros

    //verifica se existem 8 digitos, caso contrario nao faz a busca
    if (cep?.length !== 8) {
      message = 'CEP inválido!'
    } else {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro)
            setAux(prev => {
              return {
                ...prev,
                rua: response.data.logradouro,
                bairro: response.data.bairro,
                cidade: response.data.localidade,
                estado: response.data.uf
              }
            })
          else {
            alert('CEP não encontrado, digite o endereço manualmente!');
          }
        })
        .catch(er => {
          console.log(er);
        })
    }
    setError(prev => {
      return { ...prev, cep: message }
    });
  }

  /* Limpa os campos da variavel auxiliar */
  function resetFields() {
    setAux(defaultValues)
  }

  /* Remove um endereco adicionado anteriormente a partir de seu numero */
  function removeAddress(numero, e) {
    e.preventDefault();
    setAddress(address.filter(adr => adr.numero !== numero));
  }

  /* Checa todos os champos da etapa 2 */
  function check(value, field) {
    let message = '';
    let valid = true;

    if (value === '') {
      message = field + ' não pode estar vazio!';
      valid = false;
    }
    else if (!(/^[a-zA-Z0-9 '.-\u00C0-\u00FF]*$/).test(value)) {
      message = field + ' inválido!';
      valid = false;
    }

    setError({ ...error, [field]: message });
    return valid;
  }

  function next(e, flag) {
    e.preventDefault();
    setAux({ ...adAux, cli_id: info.id });
    check(adAux.rua, 'rua');
    check(adAux.bairro, 'bairro');
    check(adAux.numero, 'numero');
    check(adAux.cidade, 'cidade');
    check(adAux.estado, 'estado');

    if (error.rua === '' && error.numero === '' && error.bairro === ''
      && error.cidade === '' && error.estado === '')
      if (flag === 'next' && address.length !== 0)
        setStep(step + 1);
      else {
        setAddress([...address, adAux]);
        resetFields();
      }
    else
      alert('Verifique os campos e adicione ao menos um endereço!');
  }

  return (
    <>
      <h3 className='text-semibold mb-5'>Endereços</h3>
      <div className='row m-0 justify-content-between'>
        <div className='col-sm-4 p-0'>
          <div>
            <label htmlFor='cep'>
              CEP
            </label>
          </div>
          <input
            onChange={e => {
              setAux({ ...adAux, cep: e.target.value })
            }}
            onBlur={e => searchCep(e)}
            value={adAux.cep}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='cep' placeholder=''
          />
          {<span className='error'>{error.cep}</span>}
        </div>
      </div>
      <div className='row m-0 mt-3 justify-content-between'>
        <div className='col-sm-5 p-0'>
          <div>
            <label htmlFor='rua'>
              Rua
            </label>
          </div>
          <input
            onChange={e => {
              setAux({ ...adAux, rua: e.target.value })
            }}
            onBlur={e => check(e.target.value, 'rua')}
            value={adAux.rua}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='rua' placeholder=''
          />
          {<span className='error'>{error.rua}</span>}
        </div>
        <div className='col-sm-4 p-0'>
          <div>
            <label htmlFor='bairro'>
              Bairro
            </label>
          </div>
          <input
            onChange={e => {
              setAux({ ...adAux, bairro: e.target.value })
            }}
            onBlur={e => check(e.target.value, 'bairro')}
            value={adAux.bairro}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='bairro' placeholder=''
          />
          {<span className='error'>{error.bairro}</span>}
        </div>
        <div className='col-sm-2 p-0'>
          <div>
            <label htmlFor='numero'>
              Número
            </label>
          </div>
          <input
            onChange={e => {
              setAux({ ...adAux, numero: e.target.value })
            }}
            onBlur={e => check(e.target.value, 'numero')}
            value={adAux.numero}
            className='w-100 bg-transparent input-style rounded p-2'
            type='number' id='numero' placeholder=''
          />
          {<span className='error'>{error.numero}</span>}
        </div>
      </div>
      <div className='row mt-3 justify-content-between'>
        <div className='col-sm-6'>
          <div>
            <label htmlFor='cidade'>
              Cidade
            </label>
          </div>
          <input
            onChange={e => {
              setAux({ ...adAux, cidade: e.target.value })
            }}
            onBlur={e => check(e.target.value, 'cidade')}
            value={adAux.cidade}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='cidade' placeholder=''
          />
          {<span className='error'>{error.cidade}</span>}
        </div>
        <div className='col-sm-5'>
          <div>
            <label htmlFor='estado'>
              Estado
            </label>
          </div>
          <input
            onChange={e => {
              setAux({ ...adAux, estado: e.target.value })
            }}
            onBlur={e => check(e.target.value, 'estado')}
            value={adAux.estado}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='estado' placeholder=''
          />
          {<span className='error'>{error.estado}</span>}
        </div>
      </div>
      <div className='row justify-content-end mt-2'>
        <div className='col-md-auto'>
          <button onClick={e => next(e, 'save')} className='btn btn-primary p-0 px-2'>Salvar</button>
        </div>
      </div>

      <div className=''>
        {
          address.length !== 0
            ? address.map((adr, i) => (
              <div className='row justify-content-between p-2 align-items-center m-0 mt-3 container-data' key={i}>
                <div className='col-md-auto'>
                  <p className='m-0 p-0 text-black'>{adr.rua}, Nº {adr.numero}</p>
                </div>
                <div className='col-md-auto'>
                  <button className='btn btn-danger px-2 py-1'
                    onClick={e => removeAddress(adr.numero, e)}>
                    <Trash />
                  </button>
                </div>
                <div className='col-md-auto'>
                  <button className='btn btn-danger px-2 py-1'>
                    <Edit />
                  </button>
                </div>
              </div>
            ))
            : null
        }
      </div>
      <div className='row align-items-center justify-content-between mt-5'>
        <div className='col-md-auto'>
          <button type="button" onClick={() => setStep(step - 1)}
            className='p-1 bg-transparent border-0'>
            Voltar
          </button>
        </div>
        <div className='col-md-auto'>
          <button type="button" onClick={e => next(e, 'next')}
            className='p-1 bg-transparent border-0'>
            Proximo
          </button>
        </div>
      </div>
    </>
  );
}