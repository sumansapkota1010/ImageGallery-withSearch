import axios from "axios";
import { useEffect, useState } from "react";
import { ACCESS_KEY } from "./config/constants";

function App() {
  const [imageList, setImageList] = useState([]);
  const [tempImageList, setTempImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.title = "Image Gallery App";

    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=30`
      )
      .then((res) => {
        setImageList(res.data);
        setTempImageList(res.data);
        setIsLoading(false);
        console.log(res.data);
      });
  }, []);

  const searchImage = (query) => {
    if (query === "") {
      setImageList(tempImageList);
    } else {
      const filteredImage = imageList.filter((image) => {
        image.alt_description =
          image.alt_description === "null" ? "react" : image.alt_description;
        return image.alt_description.includes(query);
      });
      setImageList(filteredImage);
    }
  };

  return (
    <>
      <center>
        <input
          type="text"
          style={{ height: "40px", width: "50%" }}
          placeholder="Search Images.."
          onChange={(e) => {
            searchImage(e.target.value);
          }}
        />
      </center>

      {/* image container */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {imageList.length > 0 ? (
          imageList.map((image) => (
            <div
              key={image.id}
              style={{ padding: "20px", textAlign: "center" }}
            >
              <img
                src={image.urls.regular}
                style={{
                  height: "250px",
                  width: "250px",
                  objectFit: "cover",
                }}
                alt={image.alt_description}
              />
              <br />
              {image.alt_description.substring(0, 20)}
            </div>
          ))
        ) : isLoading ? (
          "loading.."
        ) : (
          <b>No images Found!!!</b>
        )}
      </div>
    </>
  );
}

export default App;
