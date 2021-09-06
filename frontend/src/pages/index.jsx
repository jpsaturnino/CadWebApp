import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap'
import './style.css'
import { DataContext } from '../context/DataContext';

export default function Home() {
  const history = useHistory();
  const { clearAllFields } = useContext(DataContext);

  return (
    <div className='main'>
      <div className='d-flex text-center flex-column p-5 container'>
        <Button className='m-2' onClick={() => {
          history.push('/cadastro');
          clearAllFields()
        }}>
          CADASTRAR CLIENTE
        </Button>
        <Button className='m-2 bg-dark btn-dark' onClick={() => history.push('/clientes')}>
          VIZUALIZAR CLIENTES CADASTRADOS
        </Button>
      </div>
    </div>
  );
}