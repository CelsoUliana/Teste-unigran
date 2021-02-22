import React from "react";
import InputMask from "react-input-mask";

/*
  Criação de mascaras para input do tipo CPF e telefone.
*/

export const InputCpf = (props) => (
  <InputMask mask="999.999.999-99" value={props.value} onChange={props.onChange}/>
);

export const InputTelefone = (props) => (
  <InputMask mask="(99) 99999-9999)" value={props.value} onChange={props.onChange}/>
);

