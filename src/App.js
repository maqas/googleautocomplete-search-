
//import './App.css';
import Search  from './components/Search.js';
import GoogleMap from './components/GoogleMap';
import SideNav from './components/SideNav'
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



//fetch weather data
const getWeatherData = async(dispatch) => {
  const key  = '41392866f61b1f714f98e33207d68acb';
  const getData = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=356&lon=1396&cnt=1&appid=${key}');
  console.log(getData);
  
}



function App() {
  return (
    <Router>
      <div className="App">
      <h1 className="Title">Weather Tracker on Google Maps</h1>
      
    
      <SideNav />
      
      <Switch>
        <Route path= "/" component= {GoogleMap}/>
        <Route path="/saved" component= {Search}/>
      </Switch>
      
     </div>

    </Router>
    
  );
}

export default App;
