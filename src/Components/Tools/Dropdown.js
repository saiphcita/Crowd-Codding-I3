import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from 'react-icons-kit';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp';
import { refAllUsers, dbUser } from './DataBase.js'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      categorias: [],
      CategoriesSelected: [],
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({categorias : category})
    });

    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      let CategoriesSelected = AllUsers.map( val => val.PostAndCategory.Post[this.props.numberPost].category)
      this.setState({CategoriesSelected: CategoriesSelected})
    });
  };  

  render() {
    // ESTILOS----------------------------------------
    var buttonStyle = {
        position: "inherit",
        backgroundColor: "#3DDFEA",
        color: "black",
        height: "100%",
        width: "100%",
        border: "0",
        borderRadius: "0",
        padding: "0",
        margin: "0"
    };
    var dropDownS = {
      backgroundColor: "#E4FFF7",
      color:"black",
      height: "auto",
      width: "340px",
      border: "2px solid black",
      borderRadius: "4px"
    };
    var numeroEstadistico = {
        float:"right", 
        color:"black", 
        backgroundColor:"#95FC5A", 
        borderRadius:"3px", 
        width:"45px", 
        textAlign:"center"
    };
    // ESTILOS------------------------------------------

    // LOGICA DE ORDEN EN BASE A POPULARIDAD
    var todasLasCategorias = this.state.categorias
    todasLasCategorias = Object.keys(todasLasCategorias).map((val)=>{return val})
    for (let i = 0; i < todasLasCategorias.length; i++) { 
      todasLasCategorias[i] = [todasLasCategorias[i], 0]
    };

    var CategoriasSeleccionadas = this.state.CategoriesSelected
    for (let i = 0; i < todasLasCategorias.length; i++) { 
      for (let j = 0; j < CategoriasSeleccionadas.length; j++) {
        if(todasLasCategorias[i][0].includes(CategoriasSeleccionadas[j])){
          ++todasLasCategorias[i][1]
        }
      };
    };

    var Comparator = (b, a) => {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;
    }
    todasLasCategorias = todasLasCategorias.sort(Comparator);
    //AQUI TERMINA LA LOGICA

    return (
      <div style={{height:"100%", width:"100%"}}>
         <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{position:"inherit", height:"100%", width:"100%"}}>
          <DropdownToggle caret style={buttonStyle}>
            Popularity of Post {(this.props.numberPost+1)}
          </DropdownToggle>
          <DropdownMenu style={dropDownS}>
            <DropdownItem style={{color:"black"}} header>{"Post "+(this.props.numberPost+1)}</DropdownItem>
            <DropdownItem divider />
            {
              todasLasCategorias.map((val, ind) => {
                return(
                  <DropdownItem disabled key={ind}>
                      <div style={{float:"left"}}>{val[0]}</div> 
                      <div style={numeroEstadistico}>{val[1]} <Icon size={12} icon={arrowUp}/></div>
                  </DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}