import { NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const adminSidenav = (
    <>
      <li
        data-aos="fade-left"
        data-aos-delay="100"
        data-aos-anchor-placement="top-bottom"
      >
        <NavLink to={"addtask"}>Add Task</NavLink>
      </li>
      <li
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-anchor-placement="top-bottom"
      >
        <NavLink to={"tasklist"}>Task lists</NavLink>
      </li>
      <li
        data-aos="fade-left"
        data-aos-delay="300"
        data-aos-anchor-placement="top-bottom"
      >
        <NavLink to={"preavioustasks"}>Preavious Tasks</NavLink>
      </li>
      <li
        data-aos="fade-left"
        data-aos-delay="400"
        data-aos-anchor-placement="top-bottom"
      >
        <NavLink to={"logout"}>Log Out</NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="text-4xl p-3 flex justify-start items-center gap-3 bg-gray60  cursor-pointer w-full lg:hidden"
        >
          <GiHamburgerMenu />{" "}
          <p
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-anchor-placement="top-bottom"
            className="text-4xl text-center font-bold"
          >
            To
            <span className="text-green-medium">Doest.</span>
          </p>
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-64 min-h-full bg-gray60 text-base-content">
          {/* Sidebar content here */}
          <p
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-anchor-placement="top-bottom"
            className="text-4xl text-center mb-5 font-bold"
          >
            To
            <span className="text-green-medium">Doest.</span>
          </p>
          <div
            data-aos="fade-left"
            data-aos-delay="700"
            data-aos-anchor-placement="top-bottom"
            className="text-center space-y-2 mb-10"
          >
            <img className="rounded-full mx-auto" src={user?.photoURL} alt="" />
            <p className="text-xl">{user?.displayName}</p>
            <p>{user?.email}</p>
          </div>
          {adminSidenav}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
