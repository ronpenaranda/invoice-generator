import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import CreateInvoice from "./page/invoice";
import Inventory from "./page/inventory";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<CreateInvoice />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
