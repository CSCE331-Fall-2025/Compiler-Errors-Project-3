import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import ManagerInventoryCard from "./ManagerInventoryCard";
import { deleteInventoryItem } from "../../../js/utils";


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

  const handleDelete = async (name) => {
        const res = await fetch('http://localhost:3000/api/Manager/deleteInventoryItem', deleteInventoryItem(name));
    //   if (res.ok) {
    //       setData(prev => prev.filter(item => item.name !== name));
    //   } else {
    //       alert("Failed to delete item");
    //   }
  };

  return (
      <>
          <div class="manager-page-root">
              <ManagerNavBar/>
              <div class="manager-template-page">
                  <div class="manager-template-list">
                          {data.map((item) => (
                              <div class="manager-template-card">
                                  <ManagerInventoryCard key={item.name} {...item} onDelete={handleDelete}/>
                              </div>
                          ))}
                          <div class="manager-template-card">
                            <Link to="/employee/manager/inventory/add"><div class="manager-add-card">+</div></Link>
                          </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default ManagerInventoryPage;