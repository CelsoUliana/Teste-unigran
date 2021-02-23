
export const cpfRegex = value => {
    /*
        Troca tudo não numerico por '' (vazio).
        Agrupa o primeiro quadrante de 3 numeros.
        Agrupa o segundo quadrante de 3 numeros.
        Agrupa o ultimo quadrante de 3 numeros.
        Agrupa os ultimos 2 numeros depois do traço.
    */
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); 
}

export const telefoneRegex = value => {
    /*
        Troca tudo não numerico por '' (vazio).
        Agrupo os 2 primeiros digitos em um paranteses.
        Agrupa os primeiros 4 ou 5 digitos (juntos) - opcional e agrupa com um 1 traço os ultimos 4 digitos.
    */
    return value
        .replace(/\D/g, '') 
        .replace(/(\d{1})(\d{1})/, '($1$2)') 
        .replace(/(\d{4,5})(\d{4})/, '$1-$2');
}

export const nascimentoRegex = value => {
    /*
        Muda a ordem dos termos tirando os traços e botando pontos.
    */
    return value
        .replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
}