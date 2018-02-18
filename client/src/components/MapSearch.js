import * as React from 'react';

class MapSearch extends React.Component {

  state = {
    value: ''
  }

  onSelectItem = (index) => {
    this.setState({
      value: ''
    });

    this.props.onSelectItem(index);
  };

  onSearch = ({ target }) => {
    this.setState({
      value: target.value
    });

    if (target.value.length > 2) {
      this.props.onSearch(target.value);
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className="mapSearch">
        <input className="mapInput"
               onChange={this.onSearch}
               value={value} placeholder="Search for a location"/>
        {value.length > 2 &&
          (<ul className="searchList">
            {this.props.options.length > 0 ?
              this.props.options.map((el, index) => (
                <li
                  key={index}
                  className="searchItem"
                  onClick={this.onSelectItem.bind(this, index)}
                >
                  {el.place_name}
                </li>
              ))
            :
              null 
            }
          </ul>)
        }
      </div>
    );
  }
}

export default MapSearch;