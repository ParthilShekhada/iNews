
import './App.css';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import News from './components/News';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

export default class App extends Component {
  pageSize="12"

  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <>
      <Router>
        <Navbar />
        <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            
          />
        <Routes>
          <Route exact path="/" element={<News  setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" text="Top - Headlines"/>} />
            
          <Route exact path="/business" element={<News  setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" text="Business News"/>} />
            
        
          <Route exact path="/entertainment" element={<News  setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" text="Entertainment News"/>} />
            
          
          <Route exact path="/health" element={<News  setProgress={this.setProgress} key="health"  pageSize={this.pageSize} country="in" category="health" text="Health News"/>} />
            
          
          <Route exact path="/science" element={<News  setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" text="Science News"/>} />
            
          
          <Route exact path="/sports" key="sports" element={<News  setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="sports" text="Sports News"/>} />
         
      
          <Route exact path="/technology" key="technology" element={<News  setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="technology" text="Technology News"/>}/>
            
  
        </Routes>
        </Router>

      </>
    )
  }
}
