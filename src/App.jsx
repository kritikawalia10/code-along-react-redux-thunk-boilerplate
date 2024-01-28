import React from "react";
import Counter from "./components/Counter";
import './App.css';

export default class App extends React.Component{

  render(){
    return (
      <div className="container">
        <Counter/>
      </div>
    )
  }
  
}