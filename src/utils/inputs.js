import React from "react";
import InputMask from "react-input-mask";

/*
  Criação de mascaras para input do tipo CPF, telefone, data de nascimento e genero.
*/

export const InputCpf = (props) => (
  <InputMask className="form-control" mask="999.999.999-99" value={props.value} onChange={props.onChange}/>
);

export const InputTelefone = (props) => (
  <InputMask className="form-control" mask="(99)99999-9999" value={props.value} onChange={props.onChange}/>
);

export const InputDataNascimento = (props) => (
  <InputMask className="form-control" mask="99.99.9999" value={props.value} onChange={props.onChange}/>
);

export const InputGenero = (props) => (
    <InputMask className="form-control" mask="a" value={props.value} onChange={props.onChange}/>
);