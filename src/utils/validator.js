export const validator = data => {
    let fields = data;
    let formValido = true;

    /*
        Existe e só letras.
    */
    if(!fields['nome'] || !fields["nome"].match(/^[ a-zA-Z]+$/)){
        formValido = false;
        console.log('nome')
    }

    /*
        Existe e 14 digitos.
    */
    if(!fields['cpf'] || fields['cpf'].length !== 14){
        formValido = false;
        console.log('cpf')
    }

    /*
        Existe e maior que 13 e menor que 14 
    */
    if(!fields['telefone'] || fields['telefone'].length < 13 || fields['telefone'].length > 14){
        formValido = false;
        console.log('telefone')
    }

    /*
        Existe e contem um @.
    */
    if(!fields['email'] || !fields['email'].match(/^.*@.*$/)){
        formValido = false;
        console.log('email')
    }

    /*
        Existe e contem o formato (2 digitos).(2 digitos).(4 digitos) dd.mm.aaaa
    */
    if(!fields['data_nascimento'] || !fields['data_nascimento'].match(/^\d{2}.\d{2}.\d{4}/)){
        formValido = false;
        console.log('data nascimento')
    }

    /*
        Existe e contem apenas 1 caracter que só pode M ou H.
    */
    if(!fields['genero'] || fields['genero'].length !== 1 || (fields['genero'] !== "H" && fields['genero'] !== "M")){
        formValido = false; 
        console.log('genero')
    }

    /*
        Existe.
    */
    if(!fields['seu_diferencial']){
        formValido = false; 
        console.log('seu_diferencial')
    }

    return formValido;
}