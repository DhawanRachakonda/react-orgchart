import React, { useEffect, useState } from "react";
import OrganizationChart from "../components/ChartContainer";
import initialize from "./OrgModel";

const data = initialize();
let update;

const DefaultChart = () => {
  const ds = {
    id: "n1",
    name: "Lao Lao",
    title: "general manager",
    children: [
      { id: "n2", name: "Bo Miao", title: "department manager" },
      {
        id: "n3",
        name: "Su Miao",
        title: "department manager",
        children: [
          { id: "n4", name: "Tie Hua", title: "senior engineer" },
          {
            id: "n5",
            name: "Hei Hei",
            title: "senior engineer",
            children: [
              { id: "n6", name: "Dan Dan", title: "engineer" },
              { id: "n7", name: "Xiang Xiang", title: "engineer" }
            ]
          },
          { id: "n8", name: "Pang Pang", title: "senior engineer" }
        ]
      },
      { id: "n9", name: "Hong Miao", title: "department manager" },
      {
        id: "n10",
        name: "Chun Miao",
        title: "department manager",
        children: [
          { id: "n11", 
            name: "Yue Yue", 
            title: "senior engineer",
            children: [
              { id: "n12", name: "Dan Dan", title: "engineer" },
              { id: "n13", name: "Xiang Xiang", title: "engineer" }
            ]
          }
        ]
      }
    ]
  };

  return <OrganizationChart datasource={ds} />;
};


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

function LevelView({level}) {

  const [collapsed, setCollapsed] = useState(false);

  const onClick = () => {

    setCollapsed(collapsed => {
      if (collapsed) {
        data.expandLevel(level);
        update && update(crypto.randomUUID());
        return false;
      } else {
        data.collapseLevel(level)
        update && update(crypto.randomUUID());
        return true;
      }
    })
    
  }

  return (
    <li><button onClick={onClick}>{collapsed ? `Expand ${level}` : `Collapse ${level}`}</button></li>
  )
}

function LevelInitializer({noOfLevels}) {

  const [levels, setLevels] = useState([])
  useEffect(() => {
    if (noOfLevels) {
      const result = [];
      // Loop from 1 to n and add each number to the array
      for (let i = 1; i <= noOfLevels; i++) {
        result.push(i);
      }
      setLevels(result);
    }
  }, [noOfLevels]);

  return (
    <ul>
      <li></li>
      {levels.map(level => <LevelView key={level} level={level} />)}
    </ul>
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
