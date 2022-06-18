import React from "react";
import { SpinnerInfinity } from "spinners-react";
import { useGlobalContext } from "./context";

const Stories = () => {
  const { hits, nbPages, isLoading, removePost } = useGlobalContext();

  if (isLoading) {
    return (
      <>
        <SpinnerInfinity size="5%" color="lightblue" secondaryColor="red"  className="spinner"/>
      </>
    );
  }
  return (
    
      <div className="stories-div">
        {hits?.map((item) => {
          const { title, author, objectID, url, num_comments } = item;
          {/* console.log({objectID}); */}
          return (
            <>
              <div className="card" key={objectID}>
                <h2>{title}</h2>
                <p>
                  By <span>{author}</span> |{" "}
                  <span>{num_comments} comments</span>
                </p>
                <div className="card-button">
                  <a href={url} target="_blank">
                    Read More
                  </a>
                  <a href="#" onClick={() => removePost(objectID)}>Remove</a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    
  );
};

export default Stories;
