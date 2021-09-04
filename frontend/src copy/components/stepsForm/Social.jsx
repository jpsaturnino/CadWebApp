import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

export const Social = () => {
  const { info, setInfo, step, setStep } = useContext(DataContext);

  return (
    <>
      <h3 className='text-semibold mb-5'>Redes Sociais</h3>
      <div className='row m-0 align-items-center justify-content-between'>
        <div className='col-md-5 p-0'>
          <div>
            <label htmlFor='facebook'>
              Facebook
            </label>
          </div>
          <input
            onChange={e => {
              const newFb = e.target.value;
              setInfo(prev => {
                return { ...prev, facebook: newFb }
              })
            }}
            value={info.facebook}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='facebook' placeholder=''
          />
        </div>
        <div className='col-md-5 p-0'>
          <div>
            <label htmlFor='instagram'>
              Instagram
            </label>
          </div>
          <input
            onChange={e => {
              const newInsta = e.target.value;
              setInfo(prev => {
                return { ...prev, instagram: newInsta }
              })
            }}
            value={info.instagram}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='instagram' placeholder=''
          />
        </div>
        <div className='col-md-5 p-0'>
          <div>
            <label htmlFor='linkedin'>
              LinkedIn
            </label>
          </div>
          <input
            onChange={e => {
              const newLi = e.target.value;
              setInfo(prev => {
                return { ...prev, linkedin: newLi }
              })
            }}
            value={info.linkedin}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='linkedin' placeholder=''
          />
        </div>
        <div className='col-md-5 p-0'>
          <div>
            <label htmlFor='twitter'>
              Twitter
            </label>
          </div>
          <input
            onChange={e => {
              const newTt = e.target.value;
              setInfo(prev => {
                return { ...prev, twitter: newTt }
              })
            }}
            value={info.twitter}
            className='w-100 bg-transparent input-style rounded p-2'
            type='text' id='twitter' placeholder=''
          />
        </div>
      </div>
      <div className='row align-items-center justify-content-between mt-5'>
        <div className='col-md-auto'>
          <button onClick={() => setStep(step - 1)} className='p-1 bg-transparent border-0'>
            Voltar
          </button>
        </div>
        <div className='col-md-auto'>
          <button onClick={e => setStep(step + 1)} className='p-1 bg-transparent border-0'>
            Proximo
          </button>
        </div>
      </div>
    </>
  );
}