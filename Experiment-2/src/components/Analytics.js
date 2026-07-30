import React from "react";
import { useSelector } from "react-redux";
import {
  FaFileAlt,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaCheckCircle,
  FaPen
} from "react-icons/fa";

function Analytics() {
  const posts = useSelector((state) =>
    Object.values(state.posts.entities || {})
  );

  const total = posts.length;
  const draft = posts.filter((p) => p.status === "Draft").length;
  const published = posts.filter((p) => p.status === "Published").length;

  const twitter = posts.filter((p) => p.platform === "Twitter").length;
  const linkedin = posts.filter((p) => p.platform === "LinkedIn").length;
  const facebook = posts.filter((p) => p.platform === "Facebook").length;
  const instagram = posts.filter((p) => p.platform === "Instagram").length;

  const cards = [
    { title: "Total Posts", value: total, icon: <FaFileAlt />, color: "#3b82f6" },
    { title: "Draft Posts", value: draft, icon: <FaPen />, color: "#f59e0b" },
    { title: "Published", value: published, icon: <FaCheckCircle />, color: "#22c55e" },
    { title: "Twitter Posts", value: twitter, icon: <FaTwitter />, color: "#1DA1F2" },
    { title: "LinkedIn Posts", value: linkedin, icon: <FaLinkedin />, color: "#0A66C2" },
    { title: "Instagram Posts", value: instagram, icon: <FaInstagram />, color: "#E1306C" },
    { title: "Facebook Posts", value: facebook, icon: <FaFacebook />, color: "#1877F2" }
  ];

  return (
    <div className="analytics">
      {cards.map((card, index) => (
        <div className="card analytics-card" key={index}>
          <div
            className="icon-box"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <h3>{card.title}</h3>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default Analytics;