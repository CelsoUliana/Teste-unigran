export const validator = data => {
    let fields = data;
    let resposta = {
        formValido: true,
        msgErro: ""
    }

    /*
        Existe e só letras.
    */
    if(!fields['nome'] || !fields["nome"].match(/^[ a-zA-Z]+$/)){
        resposta.formValido = false;
        resposta.msgErro = resposta.msgErro + ' nome,';
        console.log('Campo não validado: nome');
    }

    /*
        Existe e 14 digitos.
    */
    if(!fields['cpf'] || fields['cpf'].length !== 14){
        resposta.formValido = false;
        resposta.msgErro = resposta.msgErro + ' cpf,';
        console.log('Campo não validado: cpf');
    }

    /*
        Existe e maior que 13 e menor que 14 
    */
    if(!fields['telefone'] || fields['telefone'].length !== 14){
        resposta.formValido = false;
        resposta.msgErro = resposta.msgErro + ' telefone,';
        console.log('Campo não validado: telefone');
    }

    /*
        Existe e contem um @.
    */
    if(!fields['email'] || !fields['email'].match(/^.*@.*$/)){
        resposta.formValido = false;
        resposta.msgErro = resposta.msgErro + ' email,';
        console.log('Campo não validado: email');
    }

    /*
        Existe e contem o formato (2 digitos).(2 digitos).(4 digitos) dd.mm.aaaa
    */
    if(!fields['data_nascimento'] || !fields['data_nascimento'].match(/^\d{2}.\d{2}.\d{4}/)){
        resposta.formValido = false;
        resposta.msgErro = resposta.msgErro + ' data de nascimento,';
        console.log('Campo não validado: data de nascimento');
    }

    /*
        Existe e contem apenas 1 caracter que só pode M ou H.
    */
    if(!fields['genero'] || fields['genero'].length !== 1 || (fields['genero'] !== "H" && fields['genero'] !== "M")){
        resposta.formValido = false;
        resposta.msgErro = resposta.msgErro + ' gênero,'; 
        console.log('Campo não validado: genero');
    }

    /*
        Existe.
    */
    if(!fields['seu_diferencial']){
        resposta.formValido = false; 
        resposta.msgErro = resposta.msgErro + ' seu diferencial,';
        console.log('Campo não validado: seu_diferencial');
    }

    /*
        Remove o , da mensagem de erro.
    */
    resposta.msgErro = resposta.msgErro.slice(0,-1);

    return resposta;
}