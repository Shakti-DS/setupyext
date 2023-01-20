import * as React from "react";
import "../components/card.css"

type CardProps = {
  title: any;
  url: string;
  imps: string;
  phn: number;
};

const Card = ({ title, url, imps, phn }: CardProps) => {
  return (
    <>
      <div className="outer-wrap">

        <div className="content">
          <main className="main-area">
            <section className="cards">
              <article className="card">
                <a href="#">
                  <div className="card-content flex">
                    <div>
                      <h2>{title}</h2>
                      <p>{phn}</p>
                      <p>{url}</p>
                    </div>

                    <div className="right">
                      <picture className="thumbnail">
                        <img src={imps} />
                      </picture>
                    </div>
                  </div>
                </a>
              </article>{/* .card */}
            </section>{/* .cards */}
          </main>
        </div>{/* .content */}
      </div>{/* .outer-wrap */}
    </>
  );
};

export default Card;
