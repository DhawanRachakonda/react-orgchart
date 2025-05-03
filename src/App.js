import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./home/home";
import DefaultChart from "./default-chart/default-chart";
import PanZoomChart from "./pan-zoom-chart/pan-zoom-chart";
import CustomNodeChart from "./custom-node-chart/custom-node-chart";
import ExportChart from "./export-chart/export-chart";
import DragDropChart from "./drag-drop-chart/drag-drop-chart";
import EditChart from "./edit-chart/edit-chart";
import EditNode from "./edit-node/edit-node";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
        <Route path="/default-chart" component={DefaultChart} />
        <Route path="/pan-zoom-chart" component={PanZoomChart} />
        <Route path="/custom-node-chart" component={CustomNodeChart} />
        <Route path="/export-chart" component={ExportChart} />
        <Route path="/drag-drop-chart" component={DragDropChart} />
        <Route path="/edit-chart" component={EditChart} />
        <Route path="/edit-node" component={EditNode} />
    </Router>
  );
};

export default App;
