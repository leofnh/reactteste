import React, { useState, useEffect } from 'react';
import { useAuth } from './estado';
import InputMask from 'react-input-mask';

export default function cadEmpresa() {
    const [cnpj, setCnpj] = useState('');
    const [cnae, setCnae] = useState('');
    const [aviso, setAviso] = useState('');  
    const [nomeRazao, setNomeRazao] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const { usuarioId, setUsuarioId } = useAuth();

    const enviarDados = () => {
        if (cnpj === '' || nomeRazao === '' || nomeFantasia == '' || cnae == '') {
          setAviso('Digite todos os campos para enviar o formulário!');
        } else {
          if (cnpj.length < 18 || cnae.length <  9) {           
            setAviso('CNPJ ou CNAE inválido!');
          }  else {

          
          setAviso('');    
          
          const data = {
            "cnae": cnae,
            "cnpj": cnpj,
            "nomeRazao": nomeRazao,
            "nomeFantasia": nomeFantasia,
            "id_usuario": usuarioId
          }


          fetch(`https://leofnhflask.pythonanywhere.com/cadastro-empresa`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
            
          })
          .then(result => result.json())
          .then(data => {
            const status = data['status'];           
            setAviso(status);
          })
          .catch(error => {
            console.error(error);
          });
        }
        }
      };
    
    return (
        <>      
      <div className="corpo">Teste - Cadastrando Empresas</div>
      <div className="alert">{aviso}</div>
      <div className="corpo">
          
        <label htmlFor="cnpj">CNPJ:</label>
        <InputMask
            id="cnpj"
            mask="99.999.999/9999-99"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
        />
    

        <label htmlFor="cnae">CNAE:</label>
        <InputMask 
        mask="9999-9/99"
        id="cnae"
        value={cnae}
        onChange={(event) => setCnae(event.target.value)}
        />

        <label htmlfor="nomeRazao">Nome Razão</label>
        <input 
        id="nomeRazao"
        value={nomeRazao}
        onChange={(event) => setNomeRazao(event.target.value)}
        />

        <label htmlfor="nomeFantasia">Nome Fantasia</label>
        <input 
        id="nomeRazao"
        value={nomeFantasia}
        onChange={(event) => setNomeFantasia(event.target.value)}
        />
        
        <button onClick={enviarDados}>Cadastrar</button>
      </div>
    </>
    )
}