import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';

class App extends Component {

  constructor(props) {
  super(props);

    this.state = {
    data: [],
    message: null,
    idToDelete: null,
    idToUpdate: null,
    newMessage: null
  };
}

  componentDidMount() {
    this.getDataFromDB();
    setInterval(this.getDataFromDB, 1000);
  }

  getDataFromDB = () => {
    axios({
      url: 'http://localhost:3001/api/getData',
      method: 'GET'
    }).then((response) => {
      console.log(response);
      //Update our state with the data from the backend
      this.setState({ data: response.data.data });
    }).catch((error) => {
      console.log(error);
    })
  };

  postDataToDB = message => {
    //1. Figure out what ID this message needs to have
    //2. Use Axios to connect to our API server, which will send the data on to our database

    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++;
    }

    axios({
      url: 'http://localhost:3001/api/postData',
      method: 'POST',
      data: {
        id: idToBeAdded,
        message: message
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  };

  deleteFromDB = idToDelete => {
    let objectIdToDelete = null;
    
    this.state.data.forEach(dat => {
      if (String(dat.id) === String(idToDelete)) {
        objectIdToDelete = dat.id;
      }
    });

    axios({
      url: 'http://localhost:3001/api/deleteData',
      method: 'DELETE',
      data: {
        id: objectIdToDelete
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  renderListItems() {
    const { data } = this.state;

    if (data.length === 0) {
      return "NO DB ENTRIES YET";
    }
  }

  render () {
    return (
      <div>
        {/* Display the data we retrieve from the database */}
        <ul>

        </ul>

        <div>
          <input 
            type='text'
            placeholder='Add a New Message to the Database'
            onChange={event => this.setState({ message: event.target.value })}
          />
          <button onClick={() => this.postDataToDB(this.state.message)}>ADD</button>
        </div>

        <div>
          <input
            type='text'
            placeholder='Enter ID of item to Delete'
            onChange={event => this.setState({ idToDelete: event.target.value })}
           />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>DELETE</button>
        </div>

        <div>
          <input />
          <input />
          <button>UPDATE</button>
        </div>
      </div>
    );
  }
}

export default App;