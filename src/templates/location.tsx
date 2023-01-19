import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Banner from "../components/banner";
import Details from "../components/details";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import Favicon from "../public/yext-favicon.ico";
import "../index.css";
import axios from "axios";

export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "photoGallery",
      "c_descriptionInfo",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    description,
    photoGallery,
    c_descriptionInfo,
  } = document;

  const [apiData, setApiData] = React.useState([]);

  var config = {
    method: "get",
    url: "https://liveapi-sandbox.yext.com/v2/accounts/me/entities?api_key=aae38614d0701660f74015c1c1fe1587&v=20230110&entityTypes=location",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      setApiData(response?.data?.response?.entities);
    })
    .catch(function (error) {
      console.log(error);
    });

  React.useEffect(() => { }, [apiData]);

  return (
    <>
      <PageLayout _site={_site}>
        {/* <Banner name={name} address={address} /> */}
        <div className="centered-container">
          <div className="section">
            <div className="grid grid-cols-2 gap-x-10 gap-y-10">
              <div className="bg-gray-100 p-2">
                <Details address={address} phone={mainPhone}></Details>
                {services && <List list={services}></List>}
              </div>
              <div className="bg-gray-100 p-2">
                {photoGallery.map((imgs: any) => {
                  return (
                    <>
                      <img src={imgs?.image?.url} alt="44" />
                    </>
                  );
                })}

                {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
              </div>
              {geocodedCoordinate && (
                <StaticMap
                  latitude={geocodedCoordinate.latitude}
                  longitude={geocodedCoordinate.longitude}
                ></StaticMap>
              )}

              <div>
                <img
                  src={c_descriptionInfo?.image?.url}
                  alt=""
                  style={{ height: "100px", width: "100px" }}
                />

                {/* <a href={c_descriptionInfo?.url}>ClickUrl</a> */}
              </div>
              <div>
                <a
                  href={c_descriptionInfo?.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Click Me Redirect to Website
                </a>
              </div>

              <div className="bg-gray-100 p-2">
                <div className="text-xl font-semibold">{`About ${name}`}</div>
                <p className="pt-4">{c_descriptionInfo?.description}</p>
              </div>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Region</th>
                    <th>Postel Code</th>
                    <th>Country Code</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Go to my Page</th>
                  </tr>
                </thead>

                <tbody>
                  {apiData.map((data: any) => {
                    return (
                      <tr>
                        <td data-column="First Name">{data?.meta?.id}</td>
                        <td data-column="Last Name">{data?.name}</td>
                        <td data-column="Twitter">
                          <p>{data?.address?.line1}</p>
                        </td>
                        <td data-column="Job Title"> {data?.address?.city}</td>
                        <td data-column="Twitter">{data?.address?.region}</td>
                        <td data-column="Twitter">
                          {data?.address?.postalCode}
                        </td>
                        <td data-column="Twitter">
                          {data?.address?.countryCode}
                        </td>
                        <td>{data?.c_descriptionInfo?.description}</td>
                        <td>
                          <img
                            src={data?.c_descriptionInfo?.image?.url}
                            style={{ width: "200px", height: "100px" }}
                          />
                        </td>
                        <td>
                          <a
                            href={data?.c_descriptionInfo?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click Me
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
