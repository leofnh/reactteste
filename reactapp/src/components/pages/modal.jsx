import React from 'react';

const BACKGROUND_STYLE = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: '1000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const MODAL_STYLE = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
  padding: '20px',
  width: '400px'
};

const MODAL_TITLE_STYLE = {
  marginBottom: '15px'
};

const MODAL_BUTTONS_CONTAINER_STYLE = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '5px'
};

const MODAL_BUTTON_STYLE = {
  backgroundColor: 'red',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  padding: '8px 16px',
  cursor: 'pointer',
  marginLeft: '5px'
};

const MODAL_BUTTON_STYLE_SALVAR = {
  backgroundColor: 'rgb(18, 114, 46)',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  padding: '8px 16px',
  cursor: 'pointer',
  marginLeft: '5px'
};

const Modal = ({ companyId, isOpen, setModalOpen,  children, editarEmpresa }) => {
  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <h3 style={MODAL_TITLE_STYLE}>Editar Empresa</h3>
          {children}
       
          <div style={MODAL_BUTTONS_CONTAINER_STYLE}>
            <button
              style={MODAL_BUTTON_STYLE}
              onClick={setModalOpen}
            >
              Cancelar
            </button>
            <button
              style={MODAL_BUTTON_STYLE_SALVAR}
              onClick={() => editarEmpresa(companyId)}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Modal;