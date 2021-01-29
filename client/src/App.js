<<<<<<< HEAD
import Home from "./components/Home/Home";
=======
>>>>>>> b0d09e06784ff9052ffad9cf9461f47820e16efe
import Play from "./components/Play/Play";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
<<<<<<< HEAD
      <Route path='/' exact component={Home} />
      <Route path='/play' component={Play} />
=======
      <Route path='/' exact component={Play} />
      {/* <Route path='/play' component={Omok} /> */}
>>>>>>> b0d09e06784ff9052ffad9cf9461f47820e16efe
    </Router>
  );
};

export default App;
