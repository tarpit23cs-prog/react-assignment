import React, { useState, useRef } from "react";

function AccountSettingsPage({ user, onLogout }) {
  const [image, setImage] = useState(user?.profileImage || "");
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Only images allowed bro");
    setImage(URL.createObjectURL(file));
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Account Settings</h2>

      <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 20, background: "#fff" }}>
        <div style={{ display: "flex", gap: 15 }}>

          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#eee", position: "relative", overflow: "hidden" }}>
            {image
              ? <img src={image} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ textAlign: "center", lineHeight: "80px" }}>👤</div>
            }

            <button
              onClick={() => fileRef.current?.click()}
              style={{
                position: "absolute", bottom: 0, right: 0,
                width: 25, height: 25, borderRadius: "50%",
                border: "none", background: "#6c5ce7",
                color: "#fff", cursor: "pointer",
              }}
            >
              +
            </button>

            <input type="file" ref={fileRef} style={{ display: "none" }} onChange={handleImageChange} />
          </div>

          <div>
            <h3 style={{ margin: 0 }}>{user?.fullName || "No Name"}</h3>
            <p style={{ margin: 0, color: "#777" }}>{user?.email}</p>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 14 }}>
          {user?.bio || "No bio added"}
        </div>
      </div>

      <button onClick={onLogout} style={{
        width: "100%", marginTop: 20, padding: 12,
        background: "#ff7675", border: "none",
        color: "#fff", borderRadius: 6, cursor: "pointer",
      }}>
        Logout
      </button>
    </div>
  );
}

export default AccountSettingsPage;