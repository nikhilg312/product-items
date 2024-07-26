import React from "react";
import styled from "styled-components";
import { ProjectsCard } from "../Utils/Constants";

function CardComponent() {
  return (
    <Wrapper>
      <div className="card-container">
        {ProjectsCard.map((card) => {
          const { id, title, text, image, alt } = card;
          return (
            <div className="card" key={id}>
              <img src={image} alt={alt} />
              <div className="card-content">
                <h2>{title}</h2>
                <p>{text}</p>
                <div className="btn-container">
                  <button type="button" className="btn plus-btn">
                    +
                  </button>
                  <button type="button" className="btn minus-btn">
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  .card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 100px;

    .card {
      width: 325px;
      background-color: #f0f0f0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      margin: 20px;

      img {
        width: 100%;
        height: auto;
      }

      .card-content {
        padding: 16px;

        h2 {
          font-size: 28px;
          margin-bottom: 8px;
        }

        p {
          color: #666;
          font-size: 15px;
          line-height: 1.3;
        }

        .btn-container {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;

          .btn {
            display: inline-block;
            padding: 8px 16px;
            background-color: var(--clr-grey-6);
            color: var(--clr-grey-1);
            text-decoration: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            border: none;
          }

          .btn:hover {
            background-color: transparent;
            color: var(--clr-grey-6);
            border: 3px solid var(--clr-grey-8);
          }

          .plus-btn {
            background-color: green;
          }

          .minus-btn {
            background-color: red;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .card-container {
      padding-top: 130px; /* Add padding top for mobile view */
    }
  }
`;

export default Card;