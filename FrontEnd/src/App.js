import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddForm from "./Components/medicine-form/medicine-form.component.jsx";
import HomePage from "./Components/home/home.component.jsx";
import MedicineInfo from './Components/medicine-info/medicine-info.component.jsx'
import Header from './Components/header/header.component.jsx';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/add" component={AddForm}></Route>
          <Route path="/medinfo" component={MedicineInfo}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
