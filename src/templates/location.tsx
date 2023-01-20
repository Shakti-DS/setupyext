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

export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
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

  console.log("description===>", c_descriptionInfo);

  return (
    <>
      <PageLayout _site={_site}>
        {/* <Banner name={name} address={address} /> */}
        <div className="centered-container">
          <div className="section">
            <div className="grid grid-cols-2 gap-x-10 gap-y-10">
              <div
                className="bg-gray-100 p-2 "
                style={{ display: "flex", gap: "20px" }}
              >
                <div className="bg-gray-100 p-2">
                  {photoGallery.map((imgs: any) => {
                    return (
                      <>
                        <img src={imgs?.image?.url} alt="44" />
                      </>
                    );
                  })}
                </div>

                <div>
                  <Details address={address} phone={mainPhone}></Details>
                  {services && <List list={services}></List>}

                  <div> {hours && <Hours hours={hours} />}</div>
                </div>
              </div>

              {geocodedCoordinate && (
                <StaticMap
                  latitude={geocodedCoordinate.latitude}
                  longitude={geocodedCoordinate.longitude}
                ></StaticMap>
              )}

              {/* <div>
                <img
                  src={c_descriptionInfo?.image?.url}
                  alt=""
                  style={{ height: "100px", width: "100px" }}
                />

              </div> */}
              {/* <a href={c_descriptionInfo?.url}>ClickUrl</a> */}
              {/* <div>
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
              </div> */}

              <div className="bg-gray-100 p-2">
                <div className="text-xl font-semibold">
                  <h2> {`About ${name}`}</h2>
                </div>

                <p className="pt-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Voluptatum autem quae nobis libero dolorum culpa consequuntur
                  tempora, maiores labore quaerat pariatur, facere asperiores
                  distinctio ipsam doloribus neque maxime consequatur
                  perferendis!Lorem Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Harum at officia similique obcaecati odio!
                  Id cum accusamus expedita, ipsum repellendus dolorum alias
                  aperiam natus recusandae! Accusamus, quae? Ipsa, eos sequi!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  aliquid voluptates recusandae repellendus quae deserunt, quasi
                  sequi numquam suscipit cum voluptate illum modi aperiam, harum
                  aut inventore ipsum magnam fuga. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Voluptatibus cum nihil eveniet
                  magnam alias. Deleniti autem doloribus quas nesciunt
                  voluptates? Inventore explicabo ullam ab delectus omnis quas
                  culpa quisquam ex? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Sequi maxime iusto hic dolore quam officia.
                  Fugiat quam reprehenderit, adipisci obcaecati dicta, incidunt
                  cupiditate dolore, vel autem nobis doloremque quod magni.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Necessitatibus fuga velit quidem laudantium, laborum culpa
                  optio quo illum placeat commodi hic voluptatum excepturi
                  recusandae dolores odit, nisi voluptatibus doloremque
                  deserunt. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Perspiciatis consectetur accusantium minima, adipisci
                  fugit obcaecati consequatur a nulla animi quasi hic ipsam in
                  culpa voluptate voluptas possimus, distinctio earum at.
                  deserunt. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Perspiciatis consectetur accusantium minima, adipisci
                  fugit obcaecati consequatur a nulla animi quasi hic ipsam in
                  culpa voluptate voluptas possimus, distinctio earum at.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
