import React, { createContext, useState } from 'react'
import api from '../services/api';

const defaultInfo = {
  id: 0,
  nome: '',
  sobrenome: '',
  dataNasc: '',
  cpf: '',
  rg: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
};

export const DataContext = createContext();
export default function DataProvider({ children }) {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState(defaultInfo);
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState([]);
  const [allDone, setAllDone] = useState(false);
  const [action, setAction] = useState('');

  async function sClient() {
    const {
      id, nome, sobrenome, dataNasc, cpf, rg,
      facebook, instagram, linkedin, twitter
    } = info;

    if (action === 'new')
      await api.post('/clients/', {
        id, nome, sobrenome, dataNasc, cpf, rg,
        facebook, instagram, linkedin, twitter
      });
    else
      await api.put('/clients/', {
        id, nome, sobrenome, dataNasc, cpf, rg,
        facebook, instagram, linkedin, twitter
      });
  }

  async function sPhone() {
    if (action === 'new')
      await api.post('/phone/', phone);
    else
      await api.put('/phone/', phone);
  }

  async function sAdress() {
    if (action === 'new')
      await api.post('/address/', address);
    else
      await api.put('/address/', address);
  }

  function clearAllFields() {
    setInfo(defaultInfo);
    setAddress([]);
    setPhone([]);
    setAction('new');
    setStep(0);
  }

  function saveData() {
    sClient();
    sAdress();
    sPhone();

    setAllDone(true);
    clearAllFields();
  }

  return (
    <DataContext.Provider
      value={{
        step, setStep, info, setInfo, address, setAddress, defaultInfo,
        phone, setPhone, allDone, setAllDone, saveData, action, setAction, clearAllFields
      }}>
      {children}
    </DataContext.Provider>
  );
}