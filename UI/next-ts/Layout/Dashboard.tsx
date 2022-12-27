import {
  FaBars,
  FaEdit,
  FaUser,
  FaEnvelope,
  FaArtstation,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import LoadingBall from "../components/LoadingBall";

function Dashboard({ children }) {
  const { user, isAdmin, loading, logout } = useAuth();

  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  });
  const breadcrumbs = pathname.split("/").filter(Boolean);
  if (loading) return <LoadingBall />;
  const onSidBarTogglerClick = (e) => {
    document.getElementById("sidebar-wrapper").classList.toggle("active");
    document.getElementById("admin-content").classList.toggle("active");
    document.getElementById("sidebar").classList.toggle("active");
  };
  if (!user) router.push("/signin");
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
                      <a className="silent" href="/dashboard/posts">
                        <FaEdit />
                        &nbsp; Posts
                      </a>
                    </li>
                    <li className="menu-list-item">
                      <a className="silent" href="/dashboard/projects">
                        <FaArtstation />
                        &nbsp; Projects
                      </a>
                    </li>
                    <li className="menu-list-item">
                      <a href="/dashboard/messages/" className="silent">
                        <FaEnvelope /> &nbsp; Messages
                      </a>
                    </li>
                  </>
                )}
                <li className="menu-list-item">
                  <a href="/dashboard/profile" className="silent">
                    <FaUser /> &nbsp; Profile
                  </a>
                </li>
              </ul>
              <div>
                <button className="button" onClick={logout}>
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
                    <a href={crumbPath} className="silent">
                      {crumb}
                    </a>
                  </span>
                );
              })}
            </div>
            <div>{children}</div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;

