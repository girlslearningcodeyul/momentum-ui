/*
title: no-refresh, single-page application UI, using ReactJS framework
author: Ksenia Nadkina
purpose: Momentum Travel Group aptitude test
date: 12 August 2018
*/

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      listPeople: [],
      listPlanets: [],
      listStarships: [],
      searchResult: [],
    }
  }

  // componentDidMount() {
  //   this.handlePeople();
  // }

  handlePeople = () => {
    fetch('/searchPeople', { //need to have all results from 9 pages displayed?
      method: 'GET',
    })
      .then(response => response.text())
      .then(responseBody => {
        //console.log(responseBody);
        let listPeople = JSON.parse(responseBody).results;
        //console.log(listPeople);
        //console.log(typeof listPeople);
        this.setState({ listPeople: listPeople });
      })
  }

  handlePlanets = () => {
    fetch('/planets', { //need to have all results from 7 pages displayed?
      method: 'GET',
    })
      .then(response => response.text())
      .then(responseBody => {
        let listPlanets = JSON.parse(responseBody).results;
        //console.log(listPlanets);
        this.setState({ listPlanets: listPlanets });
      })
  }

  handleStarships = () => {
    fetch('/starships', { //need to have all results from 7 pages displayed?
      method: 'GET',
    })
      .then(response => response.text())
      .then(responseBody => {
        let listStarships = JSON.parse(responseBody).results;
        //console.log(listStarships);
        this.setState({ listStarships: listStarships });
      })
  }

  searchPersonByName = (event) => {
    fetch('/people/?search='+ event.target.value)
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        this.setState({ searchResult: response.results });
      })
  }

  render() {
    return (
      <div className="pageStyle">
        <div className="listPeople">
          <button onClick={this.handlePeople}>Display names</button>
          {Object.keys(this.state.listPeople).map((item, i) => (
            <li key={i}>
              <span>{this.state.listPeople[item].name}</span>
            </li>
          ))}
        </div>

        <div className="listPlanets">
          <button onClick={this.handlePlanets}>Display planets</button>
          {Object.keys(this.state.listPlanets).map((item, i) => (
            <li key={i}>
              <span>{this.state.listPlanets[item].name}</span>
            </li>
          ))}
        </div>

        <div className="listStarships">
          <button onClick={this.handleStarships}>Display starships</button>
          {Object.keys(this.state.listStarships).map((item, i) => (
            <li key={i}>
              <span>{this.state.listStarships[item].name}</span>
            </li>
          ))}
        </div>

        <div className="searchBar">
          <input type="text"
            placeholder="search for a person"
            onChange={this.searchPersonByName}>
          </input>
          {Object.keys(this.state.searchResult).map((item, i) => (
            <li key={i}>
              <span>{this.state.searchResult[item].name}</span>
            </li>
          ))}
        </div>

      </div>
    );
  }
}

export default App;
