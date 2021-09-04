import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Address } from '../components/stepsForm/Address';
import { Info } from '../components/stepsForm/Info';
import { Phone } from '../components/stepsForm/Phone';
import { Social } from '../components/stepsForm/Social';
import { Submit } from '../components/stepsForm/Submit';
import { DataContext } from '../context/DataContext';

export default function SignUp() {
  const history = useHistory();
  const { step, setStep, allDone, setAllDone } = useContext(DataContext);

  function reset(flag) {
    setAllDone(false);
    setStep(0);

    if (flag === 'home')
      return history.push('./');

    return history.push('./cadastro');
  }

  return (
    <div className='main'>
      {
        !allDone
          ?
          <>
            <h1 className='text-center text-bold'>Novo Cliente</h1>
            <div className='mx-auto shadow p-4 container'>
              {/* Faz a troca dos componentes que devem aparecer na tela (etapas do formulario)*/}
              <form>
                {step === 0 && <Info />}
                {step === 1 && <Address />}
                {step === 2 && <Phone />}
                {step === 3 && <Social />}
                {step === 4 && <Submit />}
              </form>
            </div>
          </>
          :
          <>
            <div className='mx-auto shadow p-4 container'>
              <h1 className='text-center text-semibold'>Cadastrado com sucesso!</h1>
              <div className='row align-items-center justify-content-center mt-1'>
                <div className='col-auto m-1'>
                  <button onClick={() => reset('home')} className='p-1 btn btn-success px-2 border-0'>
                    INICIO
                  </button>
                </div>
                <div className='col-auto m-1'>
                  <button onClick={() => reset('new')} className='p-1 btn btn-primary px-2 border-0'>
                    ADICIONAR NOVO CLIENTE
                  </button>
                </div>
              </div>
            </div>
          </>
      }
    </div >
  );
}