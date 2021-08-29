import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';

export const Submit = () => {
  const { info, address, phone } = useContext(DataContext);

  function loadAdresses() {
    return (
      address.length !== 0
        ? address.map((adr, i) => (
          <div className='row justify-content-between p-2 align-items-center m-0 mb-2 container-data' key={i}>
            <div className='col-md-auto'>
              <p className='m-0 p-0 text-black'>{adr.rua}, Nº {adr.numero}</p>
            </div>

          </div>
        ))
        : null
    );
  }

  function loadPhones() {
    return (
      phone.length !== 0
        ? phone.map((ph, i) => (
          <div className='row justify-content-between p-2 align-items-center m-0 mb-2 container-data' key={i}>
            <div className='col-md-auto'>
              <p className='m-0 p-0 text-black'>{ph.tipo}: {ph.numero}</p>
            </div>
          </div>
        ))
        : null
    );
  }

  return (
    <>
      <h3 className='text-semibold mb-5'>Revisar Informações</h3>
      <div className='row m-0 align-items-center justify-content-between'>
        <h4>Informações Pessoais</h4>
        <div className='row justify-content-between p-2 align-items-center m-0 container-data'>
          <div className='col-md-auto'>
            <p className='m-0 p-0 text-black'>NOME: {info.nome}</p>
            <p className='m-0 p-0 text-black'>SOBRENOME: {info.sobrenome}</p>
            <p className='m-0 p-0 text-black'>CPF: {info.cpf}</p>
            <h5 className='mt-4 text-semibold text-black'>Redes sociais</h5>
            <p className='m-0 p-0 text-black'>INSTAGRAM: {info.instagram}</p>
            <p className='m-0 p-0 text-black'>FACEBOOK: {info.facebook}</p>
            <p className='m-0 p-0 text-black'>LINKEDIN: {info.linkedin}</p>
            <p className='m-0 p-0 text-black'>TWITTER: {info.twitter}</p>
          </div>
        </div>
        <h4 className='mt-4' >Endereços Adicionados</h4>
        {loadAdresses()}
        <h4 className='mt-4'>Telefones Adicionados</h4>
        {loadPhones()}
      </div>
    </>
  );
}