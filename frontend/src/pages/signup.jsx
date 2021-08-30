import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Address } from '../components/stepsForm/Address';
import { Info } from '../components/stepsForm/Info';
import { Phone } from '../components/stepsForm/Phone';
import { Social } from '../components/stepsForm/Social';
import { Submit } from '../components/stepsForm/Submit';
import { DataContext } from '../context/DataContext';

export default function SignUp() {
  const history = useHistory();
  const { step, setStep, saveData, allDone, setAllDone } = useContext(DataContext);
  const [btn, setBtn] = useState('Proximo');

  /* Vai para a etapa anterior do formulário */
  function goBack(e) {
    e.preventDefault();
    if (step === 0)
      return history.push('./');
    setBtn('Proximo');

    return setStep(step - 1);
  }

  /* Vai para a proxima etapa do formulário */
  function goNext(e) {
    e.preventDefault();
    if (step < 4) {
      if (step === 3)
        setBtn('Concluir');
      return setStep(step + 1);
    }

    return saveData();
  }

  function reset(flag) {
    setAllDone(false);
    setStep(0);
    setBtn('Próximo');

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
                <div className='row align-items-center justify-content-between mt-5'>
                  <div className='col-md-auto'>
                    <button onClick={e => goBack(e)} className='p-1 bg-transparent border-0'>
                      Voltar
                    </button>
                  </div>
                  <div className='col-md-auto'>
                    <button onClick={e => goNext(e)} className='p-1 bg-transparent border-0'>
                      {btn}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
          :
          <>
            <div className='mx-auto shadow p-4 container'>
              <h1 className='text-center text-semibold'>Cadastrado com sucesso!</h1>
              <div className='row align-items-center justify-content-center mt-1'>
                <div className='col-md-auto'>
                  <button onClick={() => reset('home')} className='p-1 btn btn-success px-2 border-0'>
                    INICIO
                  </button>
                </div>
                <div className='col-md-auto'>
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