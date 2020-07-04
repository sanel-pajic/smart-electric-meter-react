import React from "react";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DatePickerComponent } from "./components/DatePickerComponent";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/date" component={DatePickerComponent} />

          <Route render={() => <Error />} />
        </Switch>
        <Footer
          title="Created by Sanel Pajic"
          description="Smart Electric Meter App"
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
