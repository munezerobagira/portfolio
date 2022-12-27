import styles from "./LoadingBall.module.scss";
function LoadingBall() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        right: "0px",
        zIndex: "100",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#333",
        animation: "background 1ms forwards",
      }}
    >
      <div className={styles.background}>
        {[1, 2, 3, 4, 5, 6, 7].map((element) => (
          <div key={element} className={styles.ball}></div>
        ))}
      </div>
    </div>
  );
}

export default LoadingBall;

