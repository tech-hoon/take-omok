import Play from "./components/Play/Play";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Play} />
      {/* <Route path='/play' component={Omok} /> */}
    </Router>
  );
};

export default App;
