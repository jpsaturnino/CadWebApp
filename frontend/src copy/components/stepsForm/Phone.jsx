import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';

export const Phone = () => {
  const { phone, setPhone, info, step, setStep } = useContext(DataContext);
  const defaultValues = {
    cli_id: info.id,
    tipo: '',
    numero: ''
  }
  const [phAux, setAux] = useState(defaultValues);
  const [error, setError] = useState({
    tipo: '',
    numero: ''
  });

  function resetFields() {
    setAux(defaultValues);
  }

  function savePhone(e) {
    e.preventDefault();
    if (checkNum()) {
      setPhone([...phone, phAux]);
      resetFields();
    }
  }

  function removePhone(numero, e) {
    e.preventDefault();
    setPhone(phone.filter(ph => ph.numero !== numero))
  }

  function checkNum() {
    let message = '';
    if (phAux.numero === '') {
      message = 'número não pode estar vazio!';
      setError(prev => {
        return { ...prev, numero: message }
      });
      return false;
    }
    else if (!(/^[0-9-]{10,12}$/).test(phAux.numero)) {
      message = 'número inválido! DDDXXXXX-XXXX';
      setError(prev => {
        return { ...prev, numero: message }
      });
      return false;
    }
    setError(prev => {
      return { ...prev, numero: message }
    });
    return true;
  }

  function next(e) {
    e.preventDefault();
    if (error.tipo === '' && error.numero === '' && phone.length !== 0)
      setStep(step + 1);
    else
      alert('Verifique os campos e adicione ao menos um telefone!')
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
            defaultValue=''
            onChange={e => {
              const newType = e.target.value;
              setAux(prev => {
                return { ...prev, tipo: newType };
              })
            }}>
            <option
              value=''
              disabled>
              Escolher tipo...
            </option>
            <option value='Residencial'>Residencial</option>
            <option value='Comercial'>Comercial</option>
            <option value='Móvel'>Móvel</option>
            <option value='Outro'>OUTRO</option>
          </select>
        </div>
        <div className='col-sm-5 p-0'>
          <div>
            <label htmlFor='numero'>
              Número
            </label>
          </div>
          <input
            onChange={e => {
              const newNumb = e.target.value;
              setAux(prev => {
                return { ...prev, numero: newNumb };
              })
            }}
            onBlur={() => checkNum()}
            value={phAux.numero}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='numero' placeholder=''
          />
          {<span className='error'>{error.numero}</span>}
        </div>
      </div>

      <div className='row justify-content-end mt-2'>
        <div className='col-md-auto'>
          <button onClick={e => savePhone(e)} className='btn btn-primary p-0 px-2'>Salvar</button>
        </div>
      </div>

      <div className=''>
        {
          phone.length !== 0
            ? phone.map((ph, i) => (
              <div className='row justify-content-between p-2 align-items-center m-0 mt-3 container-data' key={i}>
                <div className='col-md-auto'>
                  <p className='m-0 text-black'>{ph.tipo}: {ph.numero}</p>
                </div>
                <div className='col-md-auto'>
                  <button className='btn btn-danger px-2 py-1' onClick={e => removePhone(ph.numero, e)}>X</button>
                </div>
              </div>
            ))
            : null
        }
      </div>
      <div className='row align-items-center justify-content-between mt-5'>
        <div className='col-md-auto'>
          <button type="button" onClick={() => setStep(step - 1)} className='p-1 bg-transparent border-0'>
            Voltar
          </button>
        </div>
        <div className='col-md-auto'>
          <button type="button" onClick={e => next(e)} className='p-1 bg-transparent border-0'>
            Proximo
          </button>
        </div>
      </div>
    </>
  );
}