import React, { useEffect, useState } from "react";

import initialize from "./OrgModel";

const data = initialize();
let update;

const Card = (props) => {
  const {data} = props;
  console.log(data);
  const conatainsOneChild = data.children ? data.children.length === 1 : false;
  const conatainsMoreThanOneChild = data.children ? data.children.length > 1 : false;
  return (
    <ul key={data.id} className={ (!data.children || data.children.length === 0) ? " last" : conatainsOneChild ? "one-child" : ''}>
      <div className={`box ${conatainsMoreThanOneChild ? 'has-child' : ''}`}>
        {data.name}
        <p>This is box with width and height, you can place any ui elemnts in it.</p>
      </div>
      {data.children && data.children.length > 0 && data.children.map((item, index) => (
        <>
          <li className={index + 1 === data.children.length ? "card last" : index === 0 ? "card first" : "card"} key={item.id}>
            <Card data={item} />
          </li>
        </>
      ))}
    </ul>
  );
};

function LevelView({hierarchy}) {

  const [collapsed, setCollapsed] = useState(false);

  const onClick = () => {

    setCollapsed(collapsed => {
      if (collapsed) {
        data.expandLevel(hierarchy.level);
        update && update(crypto.randomUUID());
        return false;
      } else {
        data.collapseLevel(hierarchy.level);
        update && update(crypto.randomUUID());
        return true;
      }
    })
    
  }

  return (
    <ul className={`${hierarchy.level === 1 ? "first-level" : ""}`} key={hierarchy.level}>
      <button onClick={onClick}>{collapsed ? `Expand ${hierarchy.level}` : `Collapse ${hierarchy.level}`}</button>
      <li>
        {hierarchy && hierarchy.children && hierarchy.children.map(item => <LevelView hierarchy={item} />)}
      </li>
    </ul>
  )
}

function LevelInitializer({noOfLevels}) {

  const [levels, setLevels] = useState({})
  useEffect(() => {
    if (noOfLevels) {
      let level = {};
      let nextLevel = {};
      // Loop from 1 to n and add each number to the array
      for (let i = 1; i <= noOfLevels; i++) {
        if (i === 1) {
          level = {level: i, children: []};
          nextLevel = level;
        } else {
          const newLevel = {level: i, children: []};
          nextLevel.children.push(newLevel);
          nextLevel = newLevel;
        }
        
      }
      setLevels(level);
    }
  }, [noOfLevels]);

  return (
    <LevelView hierarchy={levels} />
  )

}

const EmployeeChart = (props) => {
  const [,render] = useState("");

  useEffect(() => {
    update = render;
  }, [render])
  return (
    <div>
      <div className="list-view">
        <LevelInitializer noOfLevels={data.getMaxDepth()} />
      </div>
      <div className="org-chart">
        Employee Chart
        <br/> <br/>
        Max Depth : {data.getMaxDepth()}
        <Card data={data.getRootNode()} />
      </div>
    </div>
    
  );
};

export default EmployeeChart;
