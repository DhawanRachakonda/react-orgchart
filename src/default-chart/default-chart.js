import React from "react";
import OrganizationChart from "../components/ChartContainer";

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
const EmployeeChart = (props) => {

  const data = {
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
              { id: "n12", 
                name: "Yue Yue1", 
                title: "senior engineer",
                children: [
                  { id: "n13", name: "Dan Dan", title: "engineer" },
                  { id: "n14", name: "Xiang Xiang", title: "engineer" }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="org-chart">
      Employee Chart
      <br/> <br/>
      <Card data={data} />
    </div>
  );
};

export default EmployeeChart;
