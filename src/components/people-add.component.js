import React, { Component } from 'react';
import PeopleService from '../services/people.service';
import {
  InputCpf, InputDataNascimento, InputGenero, InputTelefone,
} from '../utils/inputs';
import { validator } from '../utils/validator';
import { cpfRegex, telefoneRegex, nascimentoRegex } from '../utils/format';

/*
  Componente de cadastro de novas pessoas.
*/
export default class AddPeople extends Component {
  /*
    Construtor, onde se realiza os bindings de funções ( que possibilita serem chamados no template HTML).
    E seus estado.
  */
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
      cpf: '',
      nome: '',
      email: '',
      genero: '',
      telefone: '',
      data_nascimento: '',
      seu_diferencial: '',

      saved: false,
    };
  }

  async componentDidMount() {
    document.title = 'Cadastrar pessoa';
  }

  /*
    Eventos que salvam os valores na ação onChange.
  */
  onChangeNome(e) {
    this.setState({
      nome: e.target.value,
    });
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value,
    });
  }

  onChangeTelefone(e) {
    this.setState({
      telefone: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeDataNascimento(e) {
    this.setState({
      data_nascimento: e.target.value,
    });
  }

  onChangeGenero(e) {
    this.setState({
      genero: e.target.value,
    });
  }

  onChangeSeuDiferencial(e) {
    this.setState({
      seu_diferencial: e.target.value,
    });
  }

  /*
    Método de cadastro, onde se cria e valida um objeto de dados para o POST.
  */
  async savePeople() {
    const data = {
      cpf: cpfRegex(this.state.cpf),
      nome: this.state.nome,
      email: this.state.email,
      genero: this.state.genero.toUpperCase(),
      telefone: telefoneRegex(this.state.telefone),
      seu_diferencial: this.state.seu_diferencial,
      data_nascimento: nascimentoRegex(this.state.data_nascimento),
    };

    const objetoValidacao = validator(data);

    if (!objetoValidacao.formValido) {
      alert(`Formulário contém erros. Seguintes campos não estão validados: ${objetoValidacao.msgErro}`);
    } else {
      try {
        await PeopleService.create(data);
        this.setState({
          saved: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  /*
    Limpar os campos quando uma pessoa é cadastrada.
  */
  newPeople() {
    this.setState({
      cpf: '',
      nome: '',
      email: '',
      genero: '',
      telefone: '',
      data_nascimento: '',
      seu_diferencial: '',

      saved: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.saved ? (
          <div>
            <h4>Você cadastrou com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newPeople}>
              Cadastrar outra pessoa
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
            <label htmlFor="cpf">CPF</label>
            <div className="form-group">
              <InputCpf
                type="text"
                id="cpf"
                required
                value={this.state.cpf}
                onChange={this.onChangeCpf}
                name="cpf"
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <InputTelefone
                type="text"
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
              <InputDataNascimento
                type="text"
                id="data_nascimento"
                required
                value={this.state.data_nascimento}
                onChange={this.onChangeDataNascimento}
                name="data_nascimento"
              />
            </div>
            <div className="form-group">
              <label htmlFor="genero">Letra inicial do seu gênero - M:Masculino - F:Feminino</label>
              <InputGenero
                type="text"
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

            <button onClick={this.savePeople} className="btn btn-lg btn-success">
              Cadastrar
            </button>
          </div>
        )}
      </div>
    );
  }
}
