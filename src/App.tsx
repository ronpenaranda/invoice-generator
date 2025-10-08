import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import CreateInvoice from "./page/invoice";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/invoice" element={<CreateInvoice />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
