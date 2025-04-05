import React from "react";
import { Link } from "react-router-dom"; // Ensure react-router is used for navigation

const Adhar = () => {
  const rows = 3;
  const cols = 3;

  // Define different service cards
  const cards = [
    { title: "Address Correction", link: "/Services/Adhar" },
    { title: "Name Correction", link: "/Services/Pan" },
    { title: "Phone Number Link", link: "/Services/PF" }
  ];

  return (
    <>
      <style>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(${cols}, 1fr);
            gap: 1rem;
            padding: 2rem;
          }

          .cookie-card {
            max-width: 300px;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
          }

          .title {
            font-weight: 600;
            color: rgb(31, 41, 55);
          }

          .description {
            margin-top: 1rem;
            font-size: 0.75rem;
            line-height: 1.25rem;
            color: rgb(75, 85, 99);
          }

          .description a {
            color: rgb(59, 130, 246);
            text-decoration: none;
          }

          .description a:hover {
            text-decoration: none;
          }

          .actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 1rem;
            column-gap: 1rem;
          }

          .pref {
            font-size: 0.75rem;
            color: rgb(31, 41, 55);
            transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            background-color: transparent;
            cursor: pointer;
          }

          .pref:hover {
            color: rgb(156, 163, 175);
          }

          .accept {
            font-size: 0.75rem;
            background-color: rgb(17, 24, 39);
            font-weight: 500;
            border-radius: 0.5rem;
            color: #fff;
            padding: 0.5rem 0.75rem;
            border: none;
            cursor: pointer;
            transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            display: inline-block;
            text-align: center;
          }

          .accept:hover {
            background-color: rgb(55, 65, 81);
            text-decoration: none;
          }
        `}
      </style>

      <div className="grid-container">
        {cards.map((card, index) => (
          <div key={index} className="cookie-card">
            <span className="title">{card.title}</span>
            {/* <p className="description">

              We offer {card.title} related services. Click below to proceed.
            </p> */}
            <div className="actions">
              <Link to={card.link} className="accept">
                Open {card.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Adhar;
