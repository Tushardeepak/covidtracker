import { CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./News.css";

function News({ country = "in" }) {
  const [newsList, setNewsList] = useState([]);

  const getNews = async () => {
    await fetch(
      `http://api.mediastack.com/v1/news?access_key=95b526e6c86e76a455185ab47163f932&keywords=corona&limit=100&countries=${country.toLowerCase()}&languages=en`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setNewsList(res.data);
      });
  };

  useEffect(() => {
    getNews();
  }, [country]);
  return (
    <div className="news">
      {newsList?.map((news) => (
        <Card className="newsCard">
          <CardContent className="newsContent">
            <img src={news.image} />
            <div className="newsSub">
              <h1>{news.description}</h1>
              <a href={news.url} target="_blank">
                <Button className="button">Read more</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default News;
