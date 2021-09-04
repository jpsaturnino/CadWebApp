import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import axios from 'axios';
import { Edit, Trash } from 'react-feather';
import Button from '../form/Button';
import Error from '../form/Error';
import TextField from '../form/TextField';

const defaultError = {
  cep: '',
  rua: '',
  endereco: '',
  bairro: '',
  numero: '',
  cidade: '',
  estado: ''
}

export const Address = () => {
  const { address, setAddress, info, setStep, step, action } = useContext(DataContext);
  const defaultValues = {
    cli_id: info.id,
    end_rua: '',
    end_cep: '',
    end_numero: 0,
    end_bairro: '',
    end_cidade: '',
    end_estado: ''
  }
  const [adAux, setAux] = useState(defaultValues);
  const [error, setError] = useState(defaultError)

  /* 
  Utiliza a API do via cep para fazer uma requisição HTTP que retorna dados do endereco 
  em formato JSON a partir de determinado cep
  */
  function searchCep() {
    let message = '';
    const cep = adAux.end_cep?.replace(/[^0-9]/g, ''); //formata o valor do input deixando apenas numeros
    let valid = true;

    if (cep?.length !== 8) {
      message = 'CEP inválido!'
      valid = false;
    } else {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro)
            setAux({
              ...adAux,
              end_rua: response.data.logradouro,
              end_bairro: response.data.bairro,
              end_cidade: response.data.localidade,
              end_estado: response.data.uf
            })
        })
        .catch(er => {
          console.log(er);
        })
    }

    setError({ ...error, cep: message });
    return valid;
  }

  /* Limpa os campos da variavel auxiliar */
  function resetFields() {
    setAux(defaultValues);
  }

  /* Remove um endereco que esta no vetor a partir do numero  */
  function removeAddress(numero, e) {
    e.preventDefault();
    setAddress(address.filter(adr => adr.end_numero !== numero));
  }

  /* Verifica qualquer um dos campos da etapa 2 */
  function check(value, field) {
    let message = '';
    let valid = true;

    if (value === '') {
      message = field + ' não pode estar vazio!';
      valid = false;
    }
    else if (!(/^[a-zA-Z\u00C0-\u017F 0-9]*$/).test(value)) {
      message = field + ' inválido!';
      valid = false;
    }

    setError({ ...error, [field]: message });
    return valid;
  }

  function next(e, flag) {
    e.preventDefault();

    if (flag === 'next') {
      if (address.length !== 0)
        setStep(step + 1);
      else
        alert('Adicione ao menos um endereço!')
    }
    else if (check(adAux.end_rua, 'rua') && check(adAux.end_bairro, 'bairro') &&
      check(adAux.end_numero, 'numero') && check(adAux.end_cidade, 'cidade')
      && check(adAux.end_estado, 'estado')) {
      setAddress([...address, adAux]);
      resetFields();
    }
  }

  /* Carrega para o formulario, dados de um endereco pre-selecionado */
  function editAddress(a, e) {
    setAux(a);
    removeAddress(a.end_numero, e);
  }

  function renderAddresses() {
    return (
      address.map((adr, i) => (
        <div className='row justify-content-between p-2 align-items-center m-0 mt-3 container-data' key={i}>
          <div className='col-sm-9'>
            <p className='m-0 p-0 text-black'>{adr.end_rua}, Nº {adr.end_numero}</p>
          </div>
          {
            action === 'edit'
              ? <Button
                onClick={e => editAddress(adr, e)}
                divClass='col-sm-1 p-0 mx-1 text-center'
                className='btn btn-dark px-2 py-1'>
                <Edit />
              </Button >
              : <Button divClass='col-sm-1 p-0 mx-1 text-center' className='btn btn-danger px-2 py-1'
                onClick={e => removeAddress(adr.end_numero, e)}>
                <Trash />
              </Button>
          }
        </div>
      ))
    );
  }

  return (
    <>
      <h3 className='text-semibold mb-5'>Endereços</h3>
      <div className='row m-0 justify-content-between'>
        <div className='col-sm-4 p-0'>
          <TextField
            label='CEP'
            onChange={(end_cep) => {
              setAux({ ...adAux, end_cep })
            }}
            onBlur={() => searchCep()}
            value={adAux.end_cep}
          />
          <Error>{error.cep}</Error>
        </div>
      </div>

      <div className='row m-0 mt-3 justify-content-between'>
        <div className='col-sm-5 p-0'>
          <TextField
            label='Rua'
            onChange={(end_rua) => {
              setAux({ ...adAux, end_rua })
            }}
            onBlur={(rua) => check(rua, 'rua')}
            value={adAux.end_rua}
          />
          <Error>{error.rua}</Error>
        </div>
        <div className='col-sm-4 p-0'>
          <TextField
            label='Bairro'
            onChange={(end_bairro) => {
              setAux({ ...adAux, end_bairro })
            }}
            onBlur={(bairro) => check(bairro, 'bairro')}
            value={adAux.end_bairro}
          />
          <Error>{error.bairro}</Error>
        </div>
        <div className='col-sm-2 p-0'>
          <TextField
            label='Numero'
            type='number'
            onChange={(end_numero) => {
              setAux({ ...adAux, end_numero })
            }}
            onBlur={(numero) => check(numero, 'numero')}
            value={adAux.end_numero}
          />
          <Error>{error.numero}</Error>
        </div>
      </div>

      <div className='row mt-3 justify-content-between'>
        <div className='col-sm-6'>
          <TextField
            label='Cidade'
            onChange={(end_cidade) => {
              setAux({ ...adAux, end_cidade })
            }}
            onBlur={(cidade) => check(cidade, 'cidade')}
            value={adAux.end_cidade}
          />
          <Error>{error.cidade}</Error>
        </div>
        <div className='col-sm-5'>
          <TextField
            label='Estado'
            onChange={(end_estado) => {
              setAux({ ...adAux, end_estado })
            }}
            onBlur={(estado) => check(estado, 'estado')}
            value={adAux.end_estado}
          />
          <Error>{error.estado}</Error>
        </div>
      </div>

      <div className='row justify-content-end mt-2'>
        <Button divClass='col text-end' onClick={e => next(e, 'save')}
          className='btn btn-primary p-0 px-2'>Salvar</Button>
      </div>

      <div className=''>
        {
          address.length !== 0
            ? renderAddresses()
            : null
        }
      </div>

      <div className='row align-items-center justify-content-between mt-5'>
        <Button divClass='col text-start' onClick={() => setStep(step - 1)}>Voltar</Button>
        <Button divClass='col text-end' onClick={e => next(e, 'next')}>Próximo</Button>
      </div>
    </>
  );
}