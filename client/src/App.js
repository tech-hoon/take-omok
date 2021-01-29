import Home from "./components/Home/Home";
import Play from "./components/Play/Play";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/play' component={Play} />
    </Router>
  );
};

export default App;
