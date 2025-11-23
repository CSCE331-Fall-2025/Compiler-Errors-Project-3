import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import ManagerInventoryCard from "./ManagerInventoryCard";


function ManagerInventoryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
      async function getInventory() {
          const response = await fetch('http://localhost:3000/api/Manager/fetchInventory');
          const data = await response.json();
          setData(data);
      }
      getInventory();
  }, []);

  return (
      <>
          <div class="manager-page-root">
              <ManagerNavBar/>
              <div class="manager-template-page">
                  <div class="manager-template-list">
                          {data.map((item) => (
                              <div class="manager-template-card">
                                  <ManagerInventoryCard key={item.name} {...item} />
                              </div>
                          ))}
                  </div>
              </div>
          </div>
      </>
  );
}

export default ManagerInventoryPage;