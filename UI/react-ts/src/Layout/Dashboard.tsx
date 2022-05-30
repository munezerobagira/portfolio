import { Link, Outlet, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./dashboard.css";

function Dashboard() {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user.token) return <Link to="/signin">Sign in</Link>;
  return (
    <>
      <main className="margin-nav">
        <div className="flex wrapper">
          <aside id="sidebar">
            <div id="sidebar-wrapper" className="flex active">
              <div id="sidebar-toggler">
                <i className="fa-solid fa-bars"></i>
              </div>
              <div className="info">
                <h3 className="color-primary" id="user-name"></h3>
              </div>
              <ul id="sidebar-menu">
                {isAdmin && (
                  <>
                    <li className="menu-list-item">
                      <Link className="silent" to="dashboard/posts">
                        Posts
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link className="silent" to="dashboard/projects">
                        Projects
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link to="dashboard/messages/" className="silent">
                        {" "}
                        Messages
                      </Link>
                    </li>
                  </>
                )}
                <li className="menu-list-item">
                  <Link to="dashboard/profile" className="silent">
                    {" "}
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <section id="admin-content">
            <div>
              <Link className="silent" to="dashboard">
                dashboard
              </Link>{" "}
              &gt;
              <Link to="dashboard/" className="silent">
                dashboard
              </Link>{" "}
              &gt;
              <Link to="dashboard" className="silent">
                personal
              </Link>
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

