import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

import Button from '../form/Button';
import TextField from '../form/TextField';

export const Social = () => {
  const { info, setInfo, step, setStep } = useContext(DataContext);

  return (
    <>
      <h3 className='text-semibold mb-5'>Redes Sociais</h3>
      <div className='row m-0 align-items-center justify-content-between'>
        <div className='col-md-5 p-0'>
          <TextField
            label='Facebook'
            onChange={(facebook) => {
              setInfo({ ...info, facebook })
            }}
            value={info.facebook}
          />
        </div>
        <div className='col-md-5 p-0'>
          <TextField
            label='Instagram'
            onChange={(instagram) => {
              setInfo({ ...info, instagram })
            }}
            value={info.instagram}
          />
        </div>
        <div className='col-md-5 p-0'>
          <TextField
            label='LinkedIn'
            onChange={(linkedin) => {
              setInfo({ ...info, linkedin })
            }}
            value={info.linkedin}
          />
        </div>
        <div className='col-md-5 p-0'>
          <TextField
            label='Twitter'
            onChange={(twitter) => {
              setInfo({ ...info, twitter })
            }}
            value={info.twitter}
          />
        </div>
      </div>

      <div className='row align-items-center justify-content-between mt-5'>
        <Button divClass='col text-start' onClick={() => setStep(step - 1)}>Voltar</Button>
        <Button divClass='col text-end' onClick={() => setStep(step + 1)}>Próximo</Button>
      </div>
    </>
  );
}