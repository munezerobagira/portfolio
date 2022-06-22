import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaEdit,
  FaUser,
  FaEnvelope,
  FaArtstation,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import "./dashboard.css";
import { useEffect } from "react";

function Dashboard() {
  const { user, isAdmin, loading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  });
  const breadcrumbs = pathname.split("/").filter(Boolean);
  if (loading) return <div>Loading...</div>;
  const onSidBarTogglerClick = (e) => {
    document.getElementById("sidebar-wrapper").classList.toggle("active");
    document.getElementById("admin-content").classList.toggle("active");
    document.getElementById("sidebar").classList.toggle("active");
  };
  if (!user) navigate("/signin");
  return (
    <>
      <main>
        <div className="flex width-full">
          <aside id="sidebar">
            <div id="sidebar-wrapper" className="flex active">
              <div id="sidebar-toggler" onClick={onSidBarTogglerClick}>
                <FaBars />
              </div>
              <div className="info">
                <h4 className="color-primary" id="user-name">
                  {user.name}
                </h4>
              </div>
              <ul id="sidebar-menu">
                {isAdmin && (
                  <>
                    <li className="menu-list-item">
                      <Link className="silent" to="/dashboard/posts">
                        <FaEdit />
                        &nbsp; Posts
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link className="silent" to="/dashboard/projects">
                        <FaArtstation />
                        &nbsp; Projects
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link to="/dashboard/messages/" className="silent">
                        <FaEnvelope /> &nbsp; Messages
                      </Link>
                    </li>
                  </>
                )}
                <li className="menu-list-item">
                  <Link to="/dashboard/profile" className="silent">
                    <FaUser /> &nbsp; Profile
                  </Link>
                </li>
              </ul>
              <div>
                <button className="button">
                  Logout <FaSignOutAlt />
                </button>
              </div>
            </div>
          </aside>
          <section id="admin-content">
            <div>
              {breadcrumbs.map((crumb, index) => {
                const crumbPath = breadcrumbs
                  .slice(0, index + 1)
                  .reduce((i, c) => i + "/" + c, "");
                return (
                  <span key={index}>
                    {index > 0 && <span>&nbsp;&gt;&nbsp;</span>}
                    <Link to={crumbPath} className="silent">
                      {crumb}
                    </Link>
                  </span>
                );
              })}
            </div>
            <div>
              <Outlet />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;

