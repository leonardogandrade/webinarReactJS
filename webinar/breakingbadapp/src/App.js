import React,{Component} from 'react';
import './App.css';
import backgroundIMG from './img/breaking_bad.jpg';
import api from './services/api';

export default class App extends Component {
  state = {
    nomePersonagem : '',
    info : []
  }

  async loadData(){
    const result = await api.get(`/characters?name=${this.state.nomePersonagem}`);
    this.setState({info : result.data});
  }

  handleSubmit = async event =>{
    event.preventDefault();
    this.loadData();
  }

  handleNomePersonagem = event =>{
    event.preventDefault();
    this.setState({[event.target.name] : event.target.value})
  }

  render(){
    return (
      <div className="App">
        <img  className='background' src={backgroundIMG} alt=''/>

        <form>
          <div className='search-container'>
            <input 
                className='search'
                type='text'
                name='nomePersonagem'
                value={this.state.nomePersonagem}
                onChange={this.handleSubmit} 
            />
          </div>
        </form>

        <div className='info'>
          {
            this.state.info.map(d =>(
              <div key={d.char_id}>
                <img className='avatar' src={d.img}/>
                <div>
                  <h3>Nome: {d.name}</h3>
                  <h3>Apelido: {d.nickname}</h3>
                  <h3>Ocupação: {d.occupation[0]}</h3>
                </div>
              </div>
            ))
          }
        </div>


      </div>
    );
  }
}
