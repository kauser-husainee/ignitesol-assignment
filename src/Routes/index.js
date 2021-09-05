import { Route, Switch } from "react-router-dom";

import ListGenreCards from "../Cards/ListGenreCards";
import ListBookCards from "../Cards/ListBookCards";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ListGenreCards} />
      <Route path="/catalog" component={ListBookCards} />
    </Switch>
  );
}

export default Routes;
