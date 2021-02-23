import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PeopleService from '../services/people.service';
import { cpfRegex, telefoneRegex, nascimentoRegex } from '../utils/format';
import { InputCpf, InputDataNascimento, InputGenero } from '../utils/inputs';
import { validator } from '../utils/validator';

/*
    Componente de edição, é basicamente o componente de adicionar com algumas funções a mais
    E mudanças de nomenclatura. Poderia ter feito um componente generico que Cadastraria ou atualizaria.
    Mas por motivos de organização e simplicidade escolhi desse jeito.
*/
export default class EditPeople extends Component {
  /*
    Construtor, onde se realiza os bindings de funções ( que se possibilita serem chamadas no template HTML).
    E seus estado.
  */
  constructor(props) {
    super(props);

    this.editPeople = this.editPeople.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.onChangeTelefone = this.onChangeTelefone.bind(this);
    this.onChangeDataNascimento = this.onChangeDataNascimento.bind(this);
    this.onChangeSeuDiferencial = this.onChangeSeuDiferencial.bind(this);

    this.state = {
      id: -1,
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

  /*
    Método é chamado quando o componente é montado.
  */
  async componentDidMount() {
    document.title = 'Editar Cadastro';
    this.searchPeople(this.props.match.params.id);
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
    Como não há get/id, precisamos buscar, todos. Depois iteramos até achar o id que o router do react passou por parametros
    (Como é client side, não há métodos POST no browser) e quando acharmos, alimentamos os dados de edição.
  */
  async searchPeople(id) {
    try {
      const response = await PeopleService.getAll();
      let currentPeople = {};

      response.data.forEach((people) => {
        if (people.id.toString() === id.toString()) {
          currentPeople = people;
        }
      });

      this.setState({
        id: currentPeople.id,
        cpf: currentPeople.cpf === undefined ? '' : cpfRegex(currentPeople.cpf),
        nome: currentPeople.nome,
        email: currentPeople.email,
        genero: currentPeople.genero,
        telefone: currentPeople.telefone === undefined ? '' : telefoneRegex(currentPeople.telefone),
        data_nascimento: currentPeople.data_nascimento === undefined ? '' : nascimentoRegex(currentPeople.data_nascimento),
        seu_diferencial: currentPeople.seu_diferencial,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /*
    Criamos o objeto data que contem os dados para o PUT, e o id. Depois verificamos o validador e
  */
  async editPeople() {
    const id = this.state.id;
    const data = {   
      cpf: this.state.cpf,
      nome: this.state.nome,
      email: this.state.email,
      genero: this.state.genero.toUpperCase(),
      telefone: this.state.telefone,
      seu_diferencial: this.state.seu_diferencial,
      data_nascimento: this.state.data_nascimento,
    };

    const objetoValidacao = validator(data);

    if (!objetoValidacao.formValido) {
      alert(`Formulário contém erros. Seguintes campos não estão validados: ${objetoValidacao.msgErro}`);
    } else {
      try {
          await PeopleService.update(id, data);
        this.setState({
          saved: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.saved ? (
          <div>
            <h4>Você Editou com sucesso!</h4>
            <Link
              to={`/people`}
            >
              <button className="btn btn-lg btn-success" onClick={this.newPeople}>
                Voltar a pagina inicial
              </button>
            </Link>
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
              <input
                className="form-control"
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

            <button onClick={this.editPeople} className="btn btn-lg btn-success">
              Atualizar
            </button>
          </div>
        )}
      </div>
    );
  }
}
