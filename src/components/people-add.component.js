import React, { Component } from "react";
import PeopleService from '../services/people.service';
import { validator } from '../utils/validator';

export default class AddPeople extends Component {
  constructor(props) {
    super(props);

    this.newPeople = this.newPeople.bind(this);
    this.savePeople = this.savePeople.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.onChangeTelefone = this.onChangeTelefone.bind(this);
    this.onChangeDataNascimento = this.onChangeDataNascimento.bind(this);
    this.onChangeSeuDiferencial = this.onChangeSeuDiferencial.bind(this);

    this.state = {
      cpf: "",
      nome: "",
      email: "",
      genero: "",
      telefone: "",
      data_nascimento: "",
      seu_diferencial: "",

      published: false,
      submitted: false
    };
  }

  /*
    Binds de todos os valores que precisam ser salvos.
  */
  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value
    });
  }

  onChangeTelefone(e) {
    this.setState({
      telefone: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeDataNascimento(e) {
    this.setState({
      data_nascimento: e.target.value
    });
  }

  onChangeGenero(e) {
    this.setState({
      genero: e.target.value
    });
  }

  onChangeSeuDiferencial(e) {
    this.setState({
      seu_diferencial: e.target.value
    });
  }

  async savePeople() {
    let data = {
      cpf: this.state.cpf,
      nome: this.state.nome,
      email: this.state.email,
      genero: this.state.genero,
      telefone: this.state.telefone,
      seu_diferencial: this.state.seu_diferencial,
      data_nascimento: this.state.data_nascimento,
    };

    console.log(data)

    if(!validator(data)){
        alert("Formulario contem erros.");
    }

    else{
        try{
            //const response = await PeopleService.create(data);
            //console.log(response);
            alert("Registro salvo");
            this.newPeople();
        }
        catch(error){
            console.log(error);
        }
    }
  }

  /*
    Limpar os campos quando uma pessoa é cadastrada.
  */
  newPeople(){
      this.setState({
        cpf: "",
        nome: "",
        email: "",
        genero: "",
        telefone: "",
        data_nascimento: "",
        seu_diferencial: "",
  
        published: false,
        submitted: false
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPeople}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nome">nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                required
                value={this.state.cpf}
                onChange={this.onChangeCpf}
                name="cpf"
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                required
                value={this.state.telefone}
                onChange={this.onChangeTelefone}
                name="telefone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="data_nascimento">Data de nascimento</label>
              <input
                type="text"
                className="form-control"
                id="data_nascimento"
                required
                value={this.state.data_nascimento}
                onChange={this.onChangeDataNascimento}
                name="data_nascimento"
              />
            </div>
            <div className="form-group">
              <label htmlFor="genero">Gênero</label>
              <input
                type="text"
                className="form-control"
                id="genero"
                required
                value={this.state.genero}
                onChange={this.onChangeGenero}
                name="genero"
              />
            </div>
            <div className="form-group">
              <label htmlFor="seu_diferencial">Seu diferencial</label>
              <input
                type="text"
                className="form-control"
                id="seu_diferencial"
                required
                value={this.state.seu_diferencial}
                onChange={this.onChangeSeuDiferencial}
                name="seu_diferencial"
              />
            </div>

            <button onClick={this.savePeople} className="btn btn-success">
              Cadastrar
            </button>
          </div>
        )}
      </div>
    );
  }
}