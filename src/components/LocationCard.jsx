import React from "react";

function LocationCard({ locations, onLocationClick }) {
  return (
    <div className="card-deck">
      {locations && locations.length > 0 ? (
        locations.map((location, index) => (
          <div
            key={index}
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => onLocationClick(location.skyId, location.entityId)}
          >
            <div className="card-body">
              <h5 className="card-title">Sky ID: {location.skyId}</h5>
              <p className="card-text">Entity ID: {location.entityId}</p>
              <p className="card-text">Title: {location.presentation.title}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No airports found</p>
        // <div
        //     key="index"
        //     className="card"
        //     style={{ cursor: "pointer" }}
        //     onClick={() => onLocationClick(location.skyId, location.entityId)}
        //   >
        //     <div className="card-body">
        //       <h5 className="card-title">Sky ID: "location.skyId"</h5>
        //       <p className="card-text">Entity ID: "location.entityId"</p>
        //       <p className="card-text">Title: "location.presentation.title"</p>
        //     </div>
        //   </div>
      )}
    </div>
  );
}

export default LocationCard;
