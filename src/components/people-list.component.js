import React, { Component } from "react";
import PeopleService from "../services/people.service";
import { Link } from "react-router-dom";
import { cpfRegex, telefoneRegex, nascimentoRegex } from '../utils/format'

/*
  Componente de listagem de pessoas.
*/
export default class PeopleList extends Component {
  /*
    Construtor, onde se realiza os bindings de funções ( que se possibilita serem chamadas no template HTML).
    E seus estado.
  */
  constructor(props) {
    super(props);

    this.clearSearch = this.clearSearch.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.dynamicSearch = this.dynamicSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.retrievePeople = this.retrievePeople.bind(this);
    this.setActivePeople = this.setActivePeople.bind(this);
    this.deleteCurrentPeople = this.deleteCurrentPeople.bind(this);

    this.state = {
      people: [],
      currentPeople: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  /*
    Função que é executada logo após a montagem do component.
    Nesse caso, faz a busca de todas as pessoas.
  */
  async componentDidMount(){
    this.retrievePeople();
  }

  /*
    Limpa o valor da busca quando é disparado.
  */
  clearSearch(){
    this.setState({
      searchTitle: ""
    });
  }

  /*
    Retorna a lista filtrada dinamicamente (conforme o usuario vai digitando).
  */
  dynamicSearch(){
    return this.state.people.filter(people => people.nome.toLowerCase().includes(this.state.searchTitle.toLowerCase()));
  }

  /*
    Quando o valor do parametro de busca muda, essa função é executa.
    Ela muda o estado com o novo valor de busca.
  */
  onChangeSearch(event){
    const searchTitle = event.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  /*
    Acontece quando um registro é clickado.
    Muda o estado para a pessoa atual a ser visualizada e renderizada no template HTML.
  */
  setActivePeople(people, index){
    people.cpf = cpfRegex(people.cpf);
    people.telefone = telefoneRegex(people.telefone);
    people.data_nascimento = nascimentoRegex(people.data_nascimento);

    this.setState({
      currentPeople: people,
      currentIndex: index
    });
  }

  /*
    Função auxiliar para dar refresh na lista.
  */
  refreshList(){
    this.retrievePeople();
    this.setState({
      currentPeople: null,
      currentIndex: -1,
      searchTitle: ""
    });
  }

  /*
    Função que faz uso do nosso service para busca de todas as pessoas.
    É executado quando o componente é montado. 
  */
  async retrievePeople() {
    try{
      const response = await PeopleService.getAll();
      this.setState({
        people: response.data
      })
    } 
    catch(error){
      console.log(error);
    }
  }

  /*
    Função que deleta a pessoa selecionada.
  */
  async deleteCurrentPeople(){
    const id = this.state.currentPeople.id;
    try{
      let response = await PeopleService.delete(id);
      console.log(response.data);
      alert(response.data + " em deletar a pessoa");
      this.refreshList();
    }
    catch(error){
      alert('erro ao excluir');
      console.log(error);
    }
  }

  render() {
    const { currentPeople, currentIndex, searchTitle } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Pelo Nome"
              value={searchTitle}
              onChange={this.onChangeSearch}
            />
             <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.clearSearch}
              >
                  Limpar busca
              </button>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Pessoas</h4>

          <ul className="list-group">
            {this.dynamicSearch() &&
              this.dynamicSearch().map((ppl, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePeople(ppl, index)}
                  key={index}
                >
                  {ppl.nome}
                </li>
              ))}
          </ul>
          <br></br>
          <div className="btn-group btn-group">
            <Link to={"/add"}>
              <button
                className="m-6 btn btn-sm btn-primary"
              >
                Cadastrar 
              </button>
            </Link>
              <button
                className="m-6 btn btn-sm btn-secondary"
                onClick={this.refreshList}
              >
                Atualizar lista 
              </button>
          </div>
        </div>
        <div className="col-md-6">
          {currentPeople ? (
            <div>
              <h4>Pessoa</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentPeople.nome}
              </div>
              <div>
                <label>
                  <strong>Cpf:</strong>
                </label>{" "}
                {currentPeople.cpf}
                
              </div>
              <div>
                <label>
                  <strong>Telefone:</strong>
                </label>{" "}
                {currentPeople.telefone}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentPeople.email}
              </div>
              <div>
                <label>
                  <strong>Data de nascimento:</strong>
                </label>{" "}
                {currentPeople.data_nascimento}
              </div>
              <div>
                <label>
                  <strong>Genero:</strong>
                </label>{" "}
                {currentPeople.genero === "M" ? "Homem" : "Mulher"}
              </div>
              <div>
                <label>
                  <strong>Diferencial:</strong>
                </label>{" "}
                {currentPeople.seu_diferencial}
              </div>
              <div className="btn-group" role="group">
              <Link
                to={"/people/" + currentPeople.id}
              >
                <button className="m-6 btn btn-secondary">
                  Editar
                </button>
              </Link>
                <button onClick={this.deleteCurrentPeople} className="m-6 btn btn-danger">
                  Excluir
                </button>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Clique em um nome para mais detalhes.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}