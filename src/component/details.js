import React,{Component} from 'react';
import './details.css';
import api from '../services/api';


export default class App extends Component {
  state = {
    nomePersonagem : this.props.nomePersonagem,
    info : [],
  }

  componentDidMount(){
    this.loadData();
  }

  async loadData(){
    const result = await api.get(`/characters?name=${this.state.nomePersonagem}`);
    this.setState({info : result.data})
  }

  render(){
    return (
      <div className="App">
  
        <div className='info'>
          {
            this.state.info.map(d =>(
              <div key={d.char_id}>
                <img className='avatar' src={d.img} alt=''/>
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
