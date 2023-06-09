// import { VscServerProcess } from "react-icons/vsc";

import { GiWorld } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import { BsCartCheckFill } from "react-icons/bs";
import { FaUserCog, FaPassport } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import React, { useState } from "react";
import AboutCard from "./AboutCard";
import AddDesti from "./AddDesti";
import OrderSummary from "./OrderSummary";
import Graph from "./Graph";
import UserEdit from "./UserEdit";
import InventoryByContinents from "./InventoryByContinents";
import FlightUpdate from "./FlightUpdate";
import SocketIO from "../../SocketIO";
import { Socket } from "../../contexts/SocketContext";
import EditDest from "./EditDest";
import axios from "axios";

function AdminPage() {
  const [content, setcontent] = useState("");
  const { numClients } = Socket();

  const handleEdit = (id) => {
    setcontent(<EditDest id={id} />);
  };

  return (
    <div>
      <p>Number of connected clients: {numClients}</p>
      <div className="max-w-full mx-auto p-4">
        <div className="max-w-[1240px] mx-auto px-4 py-16 ">
          <div>
            <h1 className="py-4 text-3xl font-bold">
              <span className="text-neutral-600">My</span>
              <span className="text-blue-600">Maneger</span>
            </h1>

            {/* Card Container */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card */}
              <div
                onClick={() => {
                  setcontent(<AddDesti />);
                }}
              >
                <AboutCard
                  icon={<GiWorld size={40} />}
                  heading="Add New destination"
                />
              </div>

              <div
                onClick={() => {
                  setcontent(<FlightUpdate editFlight={handleEdit} />);
                }}
              >
                <AboutCard
                  icon={<FiEdit size={40} />}
                  heading="edit destination
                Page"
                />
              </div>
              <div
                onClick={() => {
                  setcontent(<UserEdit />);
                }}
              >
                <AboutCard
                  icon={<FaUserCog size={40} />}
                  heading="User Edit  "
                />
              </div>

              <div
                onClick={() => {
                  axios
                    .get("http://localhost:8000/allSales")
                    .then((response) => {
                      var data = response.data;
                      // console.log(data);
                      setcontent(<Graph data={data} />);
                    });
                }}
                // onClick={() => {
                //   setcontent(<Graph />);
                // }}
              >
                <AboutCard icon={<VscGraph size={40} />} heading="statistics" />
              </div>
              <div
                onClick={() => {
                  setcontent(<InventoryByContinents />);
                }}
              >
                <AboutCard
                  icon={<FaPassport size={40} />}
                  heading="Inventory By Continents"
                />
              </div>
              <div
                onClick={() => {
                  setcontent(<OrderSummary />);
                }}
              >
                <AboutCard
                  icon={<BsCartCheckFill size={40} />}
                  heading="Orders Summary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
}

export default AdminPage;
