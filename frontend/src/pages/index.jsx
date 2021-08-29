import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap'
import './style.css'

export default function Home() {
  const history = useHistory();

  return (
    <div className='main'>
      <div className='d-flex text-center flex-column p-5 container'>
        <Button className='m-2' onClick={() => history.push('/cadastro')}>
          CADASTRAR CLIENTE
        </Button>
        <Button className='m-2 bg-dark btn-dark' onClick={() => history.push('/')}>
          VIZUALIZAR CLIENTES CADASTRADOS
        </Button>
      </div>
    </div>
  );
}