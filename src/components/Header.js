import React from "react";

function Header() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      width: "100%",
      textAlign: "center",
      background: "rgba(0,0,0,0.4)",
      color: "white",
      fontWeight: "bold",
      padding: "10px",
      zIndex: 10,
      fontSize: "20px"
    }}>
      KetusTok
    </div>
  );
}

export default Header;
