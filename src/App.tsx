import { BrowserRouter, Switch, Route } from "react-router-dom";

import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Categories} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
