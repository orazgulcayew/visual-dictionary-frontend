import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home  from './pages/home/Home'
import Add from './pages/Add/Add'


const App = () => {
  return(
     <Router>
       <Switch>
            <Route path='/' exact><Home/></Route>
            <Route path='/add' exact><Add/></Route>
       </Switch>
     </Router>
  )
}

export default App;  