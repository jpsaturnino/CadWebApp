import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

export const Info = () => {
  const { info, setInfo } = useContext(DataContext);

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
          value={info.id}
          className='w-100 bg-transparent input-style rounded p-2'
          type='text' id='id' placeholder=''
        />
      </div>
      <div className='row m-0 mt-3 align-items-center justify-content-between'>

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
            value={info.nome}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='nome' placeholder=''
          />
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
            value={info.sobrenome}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='sobrenome' placeholder=''
          />
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
            value={info.dataNasc}
            className='w-100 bg-transparent input-style rounded p-2'
            type='date' id='dataNasc' placeholder=''
          />
        </div>
      </div>
      <div className='row mt-4 align-items-center justify-content-center'>
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
            value={info.cpf}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='cpf' placeholder=''
          />
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
            value={info.rg}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='rg' placeholder=''
          />
        </div>
      </div>
    </>
  );
}