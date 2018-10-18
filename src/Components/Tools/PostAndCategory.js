import React, { Component } from 'react';
import '../CSS/PostAndCategory.css';
import SelectForCategory  from './SelectForCategory.js'
import Dropdown  from './Dropdown.js'
import { dbUser } from './DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      category: [],
      heightPC: "88%",
      finishJob: false,
      messageFinish: <div/>
    };
  }

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post");    
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
    });

    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });

    const refUserFinish = dbUser.ref("Users/"+this.props.numberUser);
    refUserFinish.on("value", (snapshot) => {
      let userFs = snapshot.val();
      this.setState({userFs: userFs})
      if(userFs.UserState === "finished"){
        this.setState({finishJob: true})
        this.setState({heightPC: "84%"})
        this.setState({messageFinish: <div style={{height:"4%", backgroundColor:"#4ECB0F", color:"white"}}>Thank you very much for having finished your work.</div>})
      }else{
        this.setState({finishJob: false})
        this.setState({heightPC: "88%"})
        this.setState({messageFinish: <div/>})
      };
      //verificando si ya termino
      var arrayPost0 = []
      for (let i = 0; i < userFs.PostAndCategory.Post.length; i++) { 
        if(userFs.PostAndCategory.Post[i].category === "Select Category"){ arrayPost0.push(i) };
      };
      var user = userFs
      if(arrayPost0.length === 0){
        user.UserState = "finished"
        refUserFinish.set(user)
      }else{
        user.UserState = "working"
        refUserFinish.set(user)
      };
    });
  };
  
  finishWork() {
    this.setState({heightPC: "84%"})
    this.setState({messageFinish: <div style={{height:"4%", backgroundColor:"#E82704", color:"white"}}>You have not finished Categorizing the Posts yet.</div>})
  };

  render() {

    var todasLasCategorias = this.state.category
    todasLasCategorias = Object.keys(todasLasCategorias).map((val)=>{return val})
    todasLasCategorias.unshift("Select Category")

    var theFunction = this.finishWork.bind(this);
    if(this.state.finishJob){
      theFunction = this.props.change
    }
    return (
      <div style={{height:"92%", textAlign:"center"}}>
      {this.state.messageFinish}
        <div className="DivPostCategory" style={{height:this.state.heightPC, maxHeight:this.state.heightPC}}>
          <div className="titleList">
            <li style={{width:"3%", maxWidth:"3%", padding:"0"}}>No.</li>
            <li style={{width:"62%", maxWidth:"62%"}}>Post</li>
            <li style={{width:"18%", maxWidth:"20%"}}>Category</li>
            <li style={{width:"17%", maxWidth:"17%"}}>Popularity</li>
          </div>
          {this.state.post.map((val, ind) =>{
            //esto es Select Category y Estadistica
            const refUserCategorySelected = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post/"+ind+"/category/")
            const refUserCategoryTime = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post/"+ind+"/time/")
            const refUserSate= dbUser.ref("Users/"+this.props.numberUser+"/UserState")

            var popularity = <div/>
            if(this.state.post[ind].category !== "Select Category"){
              popularity = <Dropdown numberPost={ind}  numberUser={this.props.numberUser}/>
            }else{
              popularity = "You must select a Category"
            }
            //Aqui termina lo de Select Category y Estadistica
            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"3%", maxWidth:"3%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val.post} style={{width:"62%", maxWidth:"62%"}}>{val.post}</li>
                <li style={{width:"18%", maxWidth:"18%", padding:"0", margin:"0"}}>
                  {<SelectForCategory id={ind} listCategory={todasLasCategorias} categoryValue={this.state.post[ind].category}
                      handleChange={(event) =>{
                        refUserCategorySelected.set(event.target.value)
                        this.setState({messageFinish: <div/>});
                        this.setState({heightPC: "88%"});
                        refUserCategoryTime.set(this.props.timing)
                        refUserSate.set("working")
                      }}
                  />}                 
                </li>
                <li style={{width:"17%", maxWidth:"17%", padding:"0", margin:"0", textAlign:"center"}}> {popularity} </li>
              </div>
            )
          })}
        </div>
        <button onClick={theFunction} className="payButton">Finish Work</button>
      </div>
    );
  }
}

export default PostAndCategory;