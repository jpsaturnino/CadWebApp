import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import { Edit, Trash } from 'react-feather';

import Button from '../form/Button';
import Error from '../form/Error';
import TextField from '../form/TextField';

export const Phone = () => {
  const { phone, setPhone, info, step, setStep, action } = useContext(DataContext);
  const defaultValues = {
    cli_id: info.id,
    tel_tipo: '',
    tel_numero: ''
  }
  const [phAux, setAux] = useState(defaultValues);
  const [error, setError] = useState({
    tipo: '',
    numero: ''
  });

  /* Limpa os campos da variavel auxiliar */
  function resetFields() {
    setAux(defaultValues);
  }

  /* Verifica o select do tipo de telefone */
  function checkType() {
    let message = '';
    let valid = true;

    if (phAux.tel_tipo === '') {
      message = 'escolha o tipo do telefone!';
      valid = false;
    }

    setError({ ...error, tipo: message });
    return valid;
  }

  /* Adiciona um telefone no vetor de telefones */
  function savePhone(e) {
    e.preventDefault();
    if (checkType() && checkNum()) {
      setPhone([...phone, phAux]);
      resetFields();
    }
  }

  /* Remove um endereco que esta no vetor a partir do numero  */
  function removePhone(numero, e) {
    e.preventDefault();
    setPhone(phone.filter(ph => ph.tel_numero !== numero))
  }

  /* Verifica se o numero tem formato valido */
  function checkNum() {
    let message = '';
    let valid = true;

    if (phAux.tel_numero === '') {
      message = 'número não pode estar vazio!';
      valid = false;
    }
    else if (!(/^[0-9-]{10,12}$/).test(phAux.tel_numero)) {
      message = 'número inválido! DDDXXXXX-XXXX';
      valid = false;
    }

    setError({ ...error, numero: message });
    return valid;
  }

  function next(e) {
    e.preventDefault();
    if (phone.length !== 0)
      setStep(step + 1);
    else
      alert('Adicione ao menos um telefone!')
  }

  /* Carrega para o formulario, dados de um telefone pre-selecionado */
  function editPhone(p, e) {
    setAux(p);
    removePhone(p.tel_numero, e);
  }

  return (
    <>
      <h3 className='text-semibold mb-5'>Telefones</h3>
      <div className='row m-0 justify-content-between'>
        <div className='col-sm-5 p-0'>
          <div>
            <label htmlFor='tipo'>
              Tipo
            </label>
          </div>
          <select
            className='w-100 bg-transparent input-style rounded p-2'
            value={phAux.tel_tipo}
            onBlur={() => checkType()}
            onChange={(e) => {
              setAux({ ...phAux, tel_tipo: e.target.value })
            }}>
            <option value='' disabled>
              Escolher tipo...
            </option>
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Móvel">Móvel</option>
            <option value="Outro">OUTRO</option>
          </select>
          <Error>{error.tipo}</Error>
        </div>
        <div className='col-sm-5 p-0'>
          <TextField
            label='Numero'
            onChange={(tel_numero) => {
              setAux({ ...phAux, tel_numero })
            }}
            onBlur={() => checkNum()}
            value={phAux.tel_numero}
          />
          <Error>{error.numero}</Error>
        </div>
      </div>

      <div className='row justify-content-end mt-2'>
        <Button divClass='col text-end' onClick={e => savePhone(e)}
          className='btn btn-primary p-0 px-2'>Salvar</Button>
      </div>

      <div className=''>
        {
          phone.length !== 0
            ? phone.map((ph, i) => (
              <div className='row justify-content-between p-2 align-items-center m-0 mt-3 container-data' key={i}>
                <div className='col-sm-9'>
                  <p className='m-0 text-black'>{ph.tel_tipo}: {ph.tel_numero}</p>
                </div>

                {
                  action === 'edit'
                    ?
                    <Button divClass='col-sm-1 p-0 mx-1 text-center' onClick={e => editPhone(ph, e)} className='btn btn-dark px-2 py-1'>
                      <Edit />
                    </Button >
                    : <Button divClass='col-sm-1 p-0 mx-1 text-center' className='btn btn-danger px-2 py-1'
                      onClick={e => removePhone(ph.tel_numero, e)}>
                      <Trash />
                    </Button>
                }

              </div>
            ))
            : null
        }
      </div>

      <div className='row align-items-center justify-content-between mt-5'>
        <Button divClass='col text-start' onClick={() => setStep(step - 1)}>Voltar</Button>
        <Button divClass='col text-end' onClick={e => next(e)}>Próximo</Button>
      </div>
    </>
  );
}