import React, { Component } from "react";
import axios from 'axios';
import Ids from './Ids.js';
import Title from './Title.js';
import RatingsBar from "./RatingsBar.js";
import ImageBar from './ImageBar.js';
import MainImage from './MainImage.js';
import './style.scss';
import HiddenComponent from './HiddenComponent.js';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products : [],
      currentProduct: '',
      HiddenComponentClass: 'hide'
    };
  }
  
  componentDidMount() {
    axios.get('/images')
    .then( (data) => {
      console.log(data)
      this.setState({
        products : data.data,
        currentProduct: data.data[6]
      })
    })
  }
  handleShowComponent(){
    this.setState({
      HiddenComponentClass: 'show-hidden'
    })
  }
  render() {
    return (
      <div>
        <div className = 'text'>
        {this.state.currentProduct && <Ids product = {this.state.currentProduct}/>}
          {this.state.currentProduct && <Title product = {this.state.currentProduct}/>}
          {this.state.currentProduct && <RatingsBar product = {this.state.currentProduct}/>}
          {this.state.currentProduct && <HiddenComponent class ={this.state.HiddenComponentClass} products = {this.state.products} product = {this.state.currentProduct}/>}
          </div>
        <div className = 'images'>
          { this.state.currentProduct && <ImageBar onClick = {this.handleShowComponent.bind(this)} products = {this.state.products} product = {this.state.currentProduct}/>}
          {this.state.currentProduct && <MainImage onClick = {this.handleShowComponent.bind(this)} product = {this.state.currentProduct}/>}
        </div>
      </div>
    );
  }
}
