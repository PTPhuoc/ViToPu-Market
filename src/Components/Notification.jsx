import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Data/User";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const defaultContext = useContext(UserContext)
  const [isWait, setIsWait] = useState(true);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const id = window.localStorage.getItem("ID");
  useEffect(() => {
    if(id){
      getNotificationClient();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotificationClient = () => {
    axios
      .post("http://localhost:9000/ThongBao/GetNotification", { id: id })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setNotification(rs.data.notification);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (notification && notification.length > 0) {
      setIsWait(false);
    } else {
      setTimeout(() => {
        setIsWait(false);
      }, 2000);
    }
  }, [notification]);

  defaultContext.socket.on("Notification", () => {
      setNotification([])
      getNotificationClient()
  });

  return (
    <div className="flex items-center justify-center w-full">
      {notification && notification.length !== 0 ? (
        <div className="flex flex-col w-[90%] h-[759px] bg-slate-300 my-10 rounded-2xl gap-3 p-5">
          {notification.map((i) => (
            <div className="flex items-center bg-white rounded-2xl overflow-hidden duration-200 hover:shadow-default">
              <div className="flex-grow pl-5 w-[90%]">
                <p className="overflow-hidden truncate w-[90%]">{i.noiDung}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    window.localStorage.setItem("IDPP", i.maSanPham);
                    navigate("/PageProduct");
                  }}
                  className="p-5 bg-[#458FFF] w-[100px] border-2 border-[#458FFF] rounded-r-2xl text-white duration-200 ease-linear hover:text-[#458FFF] hover:bg-white"
                >
                  Xem
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : isWait ? (
        <div className="flex flex-col justify-center items-center w-[90%] h-[759px] bg-slate-300 my-10 rounded-2xl">
          <div>
            <span className="loader"></span>
          </div>
          <div>
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-[90%] h-[759px] bg-slate-300 my-10 rounded-2xl">
          <div>
            <p className="font-extrabold text-white">
              {id?"Bạn chưa có thông báo nào": "Hãy đăng nhập để nhận thông báo"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
