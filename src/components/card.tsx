import * as React from "react";


type CardProps = {
  title: string;
  url: string;
};

const Card = ({ title, url }: CardProps) => {
  return (
    <>
      {/* <div classNameName="centered-container">
        <div classNameName="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div classNameName="p-5">
            <a href="#">
              <h5 classNameName="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                This image below was fetched from an external API at build time.
                If you want to refresh it, you MUST rebuild.
              </h5>
            </a>
            <p classNameName="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {title}
            </p>
          </div>
          <div>
            <img classNameName="rounded-t-lg" src={url} alt="" />
          </div>
        </div>
      </div> */}

      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
