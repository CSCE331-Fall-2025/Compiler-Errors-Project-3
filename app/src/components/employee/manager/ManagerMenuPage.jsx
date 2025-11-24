import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import ManagerMenuCard from "./ManagerMenuCard";


function ManagerMenuPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
      async function getMenu() {
          const response = await fetch('http://localhost:3000/api/OrderMenu/fetchMenu');
          const data = await response.json();
          setData(data);
      }
      getMenu();
  }, []);

  return (
      <>
          <div class="manager-page-root">
              <ManagerNavBar/>
              <div class="manager-template-page">
                  <div class="manager-template-list">
                        {data.map((item, idx) => (
                            <div key={item.title+"-Manager-"+idx} class="manager-template-card">
                                <ManagerMenuCard {...item}/>
                            </div>
                        ))}
                        <div class="manager-template-card">
                            <Link to="/employee/manager/menu/add"><div class="manager-add-card">+</div></Link>
                        </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default ManagerMenuPage;