import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';

const defaultValues = {
  tipo: '',
  numero: ''
}

export const Phone = () => {
  const { phone, setPhone } = useContext(DataContext);
  const [phAux, setAux] = useState(defaultValues);

  function resetFields() {
    setAux(defaultValues);
  }

  function savePhone(e) {
    e.preventDefault();
    setPhone([...phone, phAux]);
    resetFields();
  }

  function removePhone(numero, e) {
    e.preventDefault();
    setPhone(phone.filter(ph => ph.numero !== numero))
  }

  function allDone() {
    return true;
  }
  return (
    <>
      <h3 className='text-semibold mb-5'>Telefones</h3>
      <div className='row m-0 align-items-center justify-content-between'>
        <div className='col-sm-5 p-0'>
          <div>
            <label htmlFor='tipo'>
              Tipo
            </label>
          </div>
          <input
            onChange={e => {
              const newType = e.target.value;
              setAux(prev => {
                return { ...prev, tipo: newType };
              })
            }}
            value={phAux.tipo}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='tipo' placeholder=''
          />
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
            value={phAux.numero}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='numero' placeholder=''
          />
        </div>
      </div>

      {
        allDone()
          ? <div className='row justify-content-end mt-2'>
            <div className='col-md-auto'>
              <button onClick={e => savePhone(e)} className='btn btn-primary p-0 px-2'>Salvar</button>
            </div>
          </div>
          : null
      }

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
    </>
  );
}