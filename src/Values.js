import React from "react";
import "./Values.css";

class Values extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filteredData: []
    };
  }
  // state = {
  //   filteredData: [],
  // };
  componentDidMount() {
    fetch("https://www.omdbapi.com/?apikey=45f0782a&s=war")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.Search);
        this.setState({
          isLoaded: true,
          items: result.Search,
          filteredData: result.Search
        });
      });
  }

  _handleSearchChange = (e) => {
    const { value } = e.target;
    const lowercasedValue = value.toLowerCase();
    console.log(lowercasedValue);

    this.setState(() => {
      const filteredData = this.state.items.filter((el) =>
        el.Title.toLowerCase().includes(lowercasedValue)
      );
      console.log(filteredData);

      return { filteredData };
    });
  };

  render() {
    // let arrValues = this.state.items;
    // let data = [];
    // for (let i = 0; i < arrValues.length; i++) {
    //   data.push(arrValues[i].Title);
    //   console.log(arrValues[i].Title);
    // }

    // var data1 = [];
    // Object.keys(data).forEach(function (key) {
    //   var obj = {};
    //   obj[key] = data[key];
    //   data1.push(obj);
    // });
    // console.log(data1);

    let { filteredData } = this.state;
    console.log(filteredData);

    return (
      <div>
        <div className="line"></div>
        <div className="heading">Movies</div>
        <div class="search">
          <input
            className="search_box"
            onChange={this._handleSearchChange}
            placeholder="Search"
          />
        </div>
        <div className="cards">
          {filteredData.map((el) => (
            <div key={el.key} className="card">
              <div>
                <img className="images" src={el.Poster} />
              </div>
              <div className="overlay">
                <div className="hover_effect">
                  <div>
                    <b>Title: </b>
                    {el.Title.toUpperCase()}
                  </div>
                  <div>
                    <b>Type: </b>
                    {el.Type}
                  </div>
                  <div>
                    <b>Year: </b>
                    {el.Year}
                  </div>
                  <div>
                    <b>imdbID: </b>
                    {el.imdbID}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Values;
