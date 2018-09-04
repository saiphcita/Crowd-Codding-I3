import React from 'react';
import '../CSS/ListCategory.css';
import { refGeneralCategory } from './DataBase.js'

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }

  componentDidMount() {
    refGeneralCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
  }

  render() {
    return (
        <div className="DivDefinition2">
          <div className="titleList2">
            <li style={{width:"15%", maxWidth:"15%"}}>Category</li>
            <li style={{width:"85%", maxWidth:"85%"}}>Description</li>
          </div>
          {this.state.category.map((val, ind) =>{
            return (
              <div key={ind} className="Clist">
                <li key={ind} style={{width:"15%", maxWidth:"15%"}}>{val.categoryName}</li>
                <li key={val.post} style={{width:"85%", maxWidth:"85%"}}>{val.categoryDefinition}</li>
              </div>
            )
          })}
        </div>
    );
  }
}

export default ListCategory;