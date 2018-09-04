import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from 'react-icons-kit';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp';
import { refAllUsers } from './DataBase.js'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      categoriasPopularty: {},
      arrayCategories: []
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      let PostOfUser = AllUsers.map( val => val.PostAndCategory.Post)
      //estadistica
      let arrayValores = PostOfUser.map(val => val[this.props.numberP].category);
      var Postvalores = [];
      for (let i = 0; i < arrayValores.length; i++) {
        if(arrayValores[i] !== "Select Category"){ Postvalores.push(arrayValores[i]) };
      };
      let TotalValores = Postvalores.length
      var percentage = {};
      for (let i = 0; i < TotalValores; i++) { percentage[Postvalores[i]] = percentage[Postvalores[i]] ? Number(percentage[Postvalores[i]]) + 1 : 1 };
      //Ordenando la lista
      var anObject = {}
      var categorias = this.props.categorias
      categorias.shift()
      for(let i = 0; i < categorias.length; i++){
        anObject[categorias[i]] = 0
        if(percentage[categorias[i]] !== undefined){
          anObject[categorias[i]] = percentage[categorias[i]]
        }
      }
      this.setState({categoriasPopularty: anObject})
      var arrayCategories = Object.keys(anObject).sort((b,a)=>{return anObject[a]-anObject[b]})
      this.setState({arrayCategories: arrayCategories})
    });
  };  

  render() {
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
        width: "320px",
        border: "2px solid black",
        borderRadius: "4px"
    };
    var numeroEstadistico = {
        float:"left", 
        color:"black", 
        backgroundColor:"#95FC5A", 
        borderRadius:"3px", 
        width:"40px", 
        textAlign:"center"
    };

    return (
      <div style={{height:"100%", width:"100%"}}>
         <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{position:"inherit", height:"100%", width:"100%"}}>
          <DropdownToggle caret style={buttonStyle}>
            Popularity of post {(this.props.numberP+1)}
          </DropdownToggle>
          <DropdownMenu style={dropDownS}>
            <DropdownItem style={{color:"black"}} header>{"Post "+(this.props.numberP+1)}</DropdownItem>
            <DropdownItem divider />
            {
              this.state.arrayCategories.map((val, ind) => {
                return(
                  <DropdownItem disabled key={ind}>
                      <div style={{float:"left", marginRight:"16px"}}>{val}</div> 
                      <div style={numeroEstadistico}>{this.state.categoriasPopularty[val]} <Icon size={12} icon={arrowUp}/></div>
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