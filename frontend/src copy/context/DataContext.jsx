import React, { createContext, useState } from 'react'
import api from '../services/api';

const defaultInfo =
{
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

  async function sClient() {
    const {
      id, nome, sobrenome, dataNasc, cpf, rg,
      facebook, instagram, linkedin, twitter
    } = info;

    const result = await api.post('/clients/', {
      id, nome, sobrenome, dataNasc, cpf, rg,
      facebook, instagram, linkedin, twitter
    });
    console.log("CLIENTE:" + result);
  }

  async function sPhone() {
    const result = await api.post('/phone/', phone);
    console.log("TELEFONE:" + result);
  }

  async function sAdress() {
    const result = await api.post('/address/', address);
    console.log("ENDERECO:" + result);
  }

  function clearAllFields() {
    setInfo(defaultInfo);
    setAddress([]);
    setPhone([]);
  }

  /* function saveData() {
    return new Promise((resolve, reject) => {
      sClient();
      sAdress();
      sPhone();
      setAllDone(true);
      clearAllFields();
      resolve();
    });
  }
 */
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
        step, setStep, info, setInfo, address, setAddress,
        phone, setPhone, allDone, setAllDone, saveData
      }}>
      {children}
    </DataContext.Provider>
  );
}