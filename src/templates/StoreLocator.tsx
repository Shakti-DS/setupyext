import * as React from "react";
import Card from "../components/card";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
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
import "../index.css";
import Search from "../components/Seach";

export const getPath: GetPath<TemplateProps> = ({ document }) => {
    return `index.html`;
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
        ],
  };
};

const StoreLocator = (title: any, url: string, imps: string) => {
    const [apiData, setApiData] = React.useState<any>([]);

    React.useEffect(() => {
        const url =
            "https://liveapi-sandbox.yext.com/v2/accounts/me/entities?api_key=aae38614d0701660f74015c1c1fe1587&v=20230110&entityTypes=location";

      const fetchData = async () => {
          try {
              const response = await fetch(url);
              const data = await response.json();
              setApiData(data);
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);

    return (
        <>
            <Header />
          <div>
              <Search />
          </div>

          {apiData?.response?.entities?.map((item: any) => {
              console.log("item", item);

          return (
              <>
                  <div>
                      <Card
                          title={<a href={item.slug}> {item?.name}</a>}
                        url={item?.address?.line1}
                        imps={item?.logo?.image?.url}
                        phn={item?.mainPhone}
                    />
                </div>
            </>
        );
      })}

          <Footer />
      </>
  );
};

export default StoreLocator;
