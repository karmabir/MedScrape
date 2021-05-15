import react from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddForm from "./Components/medicine-form/medicine-form.component.jsx";
import HomePage from "./Components/home/home.component.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/add" component={AddForm}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
