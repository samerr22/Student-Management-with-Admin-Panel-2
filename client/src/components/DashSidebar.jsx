import { HiUser, HiArrowSmRight, HiChartPie } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" hidden flex-col flex-shrink-0 p-3 bg-gray-100 w-56 h-screen  lg:block">
      <ul className="flex flex-col space-y-1 mb-auto">
        {currentUser && currentUser.isAdmin && (
          <li className="nav-item">
            <Link to="/dashboard?tab=dash" className={`block py-2 px-4 rounded-lg hover:bg-gray-200 ${tab === "dash" || !tab ? "bg-gray-200" : ""}`}>
              <HiChartPie className="inline-block w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/dashboard?tab=profile" className={`block py-2 px-4 rounded-lg hover:bg-gray-200 ${tab === "profile" ? "bg-gray-200" : ""}`}>
            <HiUser className="inline-block w-5 h-5 mr-2" />
            Profile
          </Link>
        </li>
      </ul>
      <hr className="my-2 border-gray-300" />
      <div className="dropdown">
      
        <ul className="dropdown-menu">
          <li>
            <button className="block w-full py-2 px-4  rounded-lg hover:opacity-90 font-semibold bg-blue-500 text-white   focus:outline-none" onClick={handleSignout}>Sign out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
