import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CityImage(props) {
  let [imageUrl, setImageUrl] = useState(null);

  function displayCityImage(response) {
    setImageUrl(response.data.photos[3].src.portrait);
  }

  useEffect(function getCityImage() {
    axios({
      method: "get",
      url: `https://api.pexels.com/v1/search?query=${props.city}+query&per_page=15&page=1`,
      headers: {
        Authorization:
          "563492ad6f91700001000001ea246cab4f4645409f66c0be39fbe2b1",
      },
    }).then(displayCityImage);
  });

  return <img alt="" src={imageUrl} className="city-image card border-light" />;
}
