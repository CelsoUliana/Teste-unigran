import React, { Component } from "react";
import PeopleService from "../services/people.service";
import { Link } from "react-router-dom";
import { cpfRegex, telefoneRegex } from '../utils/format'

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

    this.refreshList = this.refreshList.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.retrievePeople = this.retrievePeople.bind(this);
    this.setActivePeople = this.setActivePeople.bind(this);
    this.dynamicSearch = this.dynamicSearch.bind(this);

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
  async componentDidMount() {
    this.retrievePeople();
  }

  dynamicSearch(){
    return this.state.people.filter(people => people.nome.toLowerCase().includes(this.state.searchTitle.toLowerCase()));
  }

  /*
    Função que busca uma pessoa pelo nome.
  */
  searchPeople(){
    this.setState({
      currentPeople: null,
      currentIndex: -1
    });
    // demais logica
  }

  /*
    Quando o valor do parametro de busca muda, essa função é executa.
    Ela muda o estado com o novo valor de busca.
  */
  onChangeSearch(event) {
    const searchTitle = event.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  /*
    Acontece quando um registro é clickado.
    Muda o estado para a pessoa atual a ser visualizada e renderizada no template HTML.
  */
  setActivePeople(people, index) {
    people.cpf = cpfRegex(people.cpf);
    people.telefone = telefoneRegex(people.telefone);

    this.setState({
      currentPeople: people,
      currentIndex: index
    });
  }

  /*
    Função auxiliar para dar refresh na lista.
  */
  refreshList() {
    this.retrievePeople();
    this.setState({
      currentPeople: null,
      currentIndex: -1
    });
  }

  /*
    Função que faz uso do nosso service para busca de todas as pessoas.
    É executado quando o componente é montado. 
  */
  async retrievePeople() {
    try{
      const response = await PeopleService.getAll()
      this.setState({
        people: response.data
      })
    } 
    catch (error) {
      console.log(error)
    }
  }

  render() {
    const { people, currentPeople, currentIndex, searchTitle } = this.state;

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

          <button
            className="m-3 btn btn-sm btn-primary"
            onClick={console.log('dale')}
          >
            Adicionar 
          </button>
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
                {currentPeople.genero === "M" ? "Mulher" : "Homem"}
              </div>
              <div>
                <label>
                  <strong>Diferencial:</strong>
                </label>{" "}
                {currentPeople.seu_diferencial}
              </div>
              <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
              <Link
                to={"/people/" + currentPeople.id}
              >
                <button className="m-6 btn btn-secondary">
                  Editar
                </button>
              </Link>
              <Link
                to={"/people/" + currentPeople.id}
              >
                <button className="m-6 btn btn-danger">
                  Excluir
                </button>
              </Link>
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