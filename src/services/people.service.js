import axios from './axios';

/*
    Classe que faz as requisições para a API e retorna dados.
*/
class PeopleService{
    async getAll() {
        return axios.get('/tecnico');
    }
}

export default new PeopleService();