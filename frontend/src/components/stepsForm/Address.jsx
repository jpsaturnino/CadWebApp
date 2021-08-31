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
        .catch(error => {
          console.log(error);
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

  /* Checa todos os champos da etapa 2 */
  function check(value, field) {
    let message = '';
    if (value === '')
      message = field + ' não pode estar vazio!';
    else if (!(/^[a-zA-Z0-9 '.-]*$/).test(value))
      message = field + ' inválido!';

    if (field === 'rua')
      setError(prev => {
        return { ...prev, rua: message }
      });
    else if (field === 'numero')
      setError(prev => {
        return { ...prev, numero: message }
      });
    else if (field === 'bairro')
      setError(prev => {
        return { ...prev, bairro: message }
      });
    else if (field === 'cidade')
      setError(prev => {
        return { ...prev, cidade: message }
      });
    else if (field === 'estado')
      setError(prev => {
        return { ...prev, estado: message }
      });
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
              const newStreet = e.target.value;
              setAux(prev => {
                return { ...prev, rua: newStreet }
              })
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
              const newNbh = e.target.value;
              setAux(prev => {
                return { ...prev, bairro: newNbh }
              })
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
              const newNum = e.target.value;
              setAux(prev => {
                return { ...prev, numero: newNum }
              })
            }}
            onBlur={e => check(e.target.value, 'numero')}
            value={adAux.numero}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='numero' placeholder=''
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
              const newCity = e.target.value;
              setAux(prev => {
                return { ...prev, cidade: newCity }
              })
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
              const newSt = e.target.value;
              setAux(prev => {
                return { ...prev, estado: newSt }
              })
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
          <button onClick={e => saveAddress(e)} className='btn btn-primary p-0 px-2'>Salvar</button>
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