import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import axios from 'axios';



export const Address = () => {
  const { address, setAddress, info } = useContext(DataContext);
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

  /* 
  Utiliza a API do via cep para fazer uma requisição HTTP no formato JSON 
  a partir de determinado cep
  */
  function searchCep(e) {
    e.preventDefault();
    const { value } = e.target;
    const cep = value?.replace(/[^0-9]/g, ''); //formata o valor do input deixando apenas numeros

    //verifica se existem 8 digitos, caso contrario nao faz a busca
    if (cep?.length !== 8)
      return;

    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        console.log(response.data);
        setAux(prev => {
          return {
            ...prev,
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  /* Limpa os campos da variavel auxiliar */
  function resetFields() {
    setAux(defaultValues)
  }

  /* 
  Adiciona um novo endereco na variavel que vem do context com as informacoes anteriores
  e limpa a variavel auxiliar
  */
  function saveAddress(e) {
    e.preventDefault();
    setAddress([...address, adAux]);
    resetFields();
  }

  /* Remove um endereco adicionado anteriormente a partir de seu numero */
  function removeAddress(numero, e) {
    e.preventDefault();
    setAddress(address.filter(adr => adr.numero !== numero));
  }

  function allDone() {
    return true;
  }

  return (
    <>
      <h3 className='text-semibold mb-5'>Endereços</h3>
      <div className='row m-0 align-items-center justify-content-between'>
        <div className='col-sm-4 p-0'>
          <div>
            <label htmlFor='cep'>
              CEP
            </label>
          </div>
          <input
            onChange={e => {
              const newCep = e.target.value;
              setAux(prev => {
                return { ...prev, cep: newCep }
              })
            }}
            onBlur={e => searchCep(e)}
            value={adAux.cep}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='cep' placeholder=''
          />
        </div>
      </div>
      <div className='row m-0 align-items-center justify-content-between'>
        <div className='col-sm-5 p-0'>
          <div>
            <label htmlFor='rua'>
              Rua
            </label>
          </div>
          <input
            onChange={e => {
              const newStreet = e.target.value;
              setAux(prev => {
                return { ...prev, rua: newStreet }
              })
            }}
            value={adAux.rua}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='rua' placeholder=''
          />
        </div>
        <div className='col-sm-4 p-0'>
          <div>
            <label htmlFor='bairro'>
              Bairro
            </label>
          </div>
          <input
            onChange={e => {
              const newNbh = e.target.value;
              setAux(prev => {
                return { ...prev, bairro: newNbh }
              })
            }}
            value={adAux.bairro}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='bairro' placeholder=''
          />
        </div>
        <div className='col-sm-2 p-0'>
          <div>
            <label htmlFor='numero'>
              Número
            </label>
          </div>
          <input
            onChange={e => {
              const newNum = e.target.value;
              setAux(prev => {
                return { ...prev, numero: newNum }
              })
            }}
            value={adAux.numero}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='numero' placeholder=''
          />
        </div>
      </div>
      <div className='row align-items-center justify-content-between'>
        <div className='col-sm-6'>
          <div>
            <label htmlFor='cidade'>
              Cidade
            </label>
          </div>
          <input
            onChange={e => {
              const newCity = e.target.value;
              setAux(prev => {
                return { ...prev, cidade: newCity }
              })
            }}
            value={adAux.cidade}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='cidade' placeholder=''
          />
        </div>
        <div className='col-sm-5'>
          <div>
            <label htmlFor='estado'>
              Estado
            </label>
          </div>
          <input
            onChange={e => {
              const newSt = e.target.value;
              setAux(prev => {
                return { ...prev, estado: newSt }
              })
            }}
            value={adAux.estado}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='estado' placeholder=''
          />
        </div>
      </div>
      {
        allDone()
          ? <div className='row justify-content-end mt-2'>
            <div className='col-md-auto'>
              <button onClick={e => saveAddress(e)} className='btn btn-primary p-0 px-2'>Salvar</button>
            </div>
          </div>
          : null
      }

      <div className=''>
        {
          address.length !== 0
            ? address.map((adr, i) => (
              <div className='row justify-content-between p-2 align-items-center m-0 mt-3 container-data' key={i}>
                <div className='col-md-auto'>
                  <p className='m-0 p-0 text-black'>{adr.rua}, Nº {adr.numero}</p>
                </div>
                <div className='col-md-auto'>
                  <button className='btn btn-danger px-2 py-1' onClick={e => removeAddress(adr.numero, e)}>X</button>
                </div>
              </div>
            ))
            : null
        }
      </div>
    </>
  );
}