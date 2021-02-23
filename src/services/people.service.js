import axios from './axios';

/*
    Classe que faz as requisições HTTP para a API e retorna dados.
*/
class PeopleService{
    async getAll() {
        return axios.get('/tecnico');
    }
    async create(data) {
        return axios.post("/tecnico", data);
    }
    async delete(id){
        return axios.delete('/tecnico/' + id);
    }
}

export default new PeopleService();