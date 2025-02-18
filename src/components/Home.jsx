import { useState, useRef } from "react";
import ParentListItem from "./PeopleList";
import {searchLocation, searchFlights} from "../api";
import LocationCard from "./LocationCard";
import FlightCardContainer from "./FlightCard";
import Spinner from "./Spinner";

function FlightSearchForm() {
  const [from, setFrom] = useState({"id":"from-date","value":""});
  const [to, setTo] = useState({"id":"to-date","value":""});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [twoWay, setTwoWay] = useState(false);
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);
  const [flightType, setFlightType] = useState("Select Flight Type");
  const [flightPath, setFlightPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState({
    Adult: 0,
    Children: 0,
    Infants: 0
  });
  let fromDebounceTimeout = useRef(null);
  let toDebounceTimeout = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response_data = await searchFlights(people, from, to, fromDate, toDate)
      setFlightPath(response_data)
    } catch (error) {
      console.error('Error searching from location:', error);
    } finally{
      setLoading(false);
    }
  };

  const updateDropdown=(e, value)=>{
    setFlightType(e.target.innerHTML)
    setTwoWay(value)
  }
  
  const searchFromLocation = async (e) => {
    const value = e.target.value;
    setFrom(prev => ({ ...prev, value }));
    
    if (fromDebounceTimeout.current) {
      clearTimeout(fromDebounceTimeout.current);
    }
    setLoading(true);

    fromDebounceTimeout.current = setTimeout(async () => {
      try {
        const data = await searchLocation(value);
        setFromLocations(data);
      } catch (error) {
        console.error('Error searching from location:', error);
      } finally{
        setLoading(false)
      }
    }, 1000);
  };
  
  const searchToLocation = async (e) => {
    const value = e.target.value;
    setTo(prev => ({ ...prev, value }));
    
    if (toDebounceTimeout.current) {
      clearTimeout(toDebounceTimeout.current);
    }
    setLoading(true);
    toDebounceTimeout.current = setTimeout(async () => {
      try {
        const data = await searchLocation(value);
        setToLocations(data);
      } catch (error) {
        console.error('Error searching to location:', error);
      } finally{
        setLoading(false)
      }
    }, 1000);
  };


  const handleLocationClick = (skyId, entityId, isFrom) => {
    if (isFrom) {
      setFrom({ value: skyId, id: entityId });
      setFromLocations([]);
    } else {
      setTo({ value: skyId, id: entityId });
      setToLocations([]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap space-x-2 p-4">
        <div className="d-flex flex-wrap m-2 w-100">
          <div className="dropdown m-1 w-100 sm:w-auto">
            <button className="btn btn-secondary dropdown-toggle w-100 sm:w-auto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {flightType}
            </button>
            <ul className="dropdown-menu">
              <li onClick={(e) => updateDropdown(e, false)} className="dropdown-item">One Way</li>
              <li onClick={(e) => updateDropdown(e, true)} className="dropdown-item">Two Way</li>
            </ul>
            <ParentListItem people={people} setPeople={setPeople} />
          </div>

        </div>

        <div className="d-flex flex-wrap m-2 w-100">
          <input type="text" id={from['id']} value={from['value']} onChange={(e) => searchFromLocation(e)} placeholder="From" className="border p-2 w-100 sm:w-auto m-1" />
          <input type="text" id={to['id']} value={to['value']} onChange={(e) => searchToLocation(e)} placeholder="To" className="border p-2 w-100 sm:w-auto m-1" />
          <input type="date" id="from-date-travel" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border p-2 w-100 sm:w-auto m-1" />
          {twoWay && <input type="date" id="to-date-travel" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border p-2 w-100 sm:w-auto m-1" />}
          <button type="submit" className="btn btn-primary text-white p-2 rounded w-100 sm:w-auto m-1">Search</button>
        </div>
      </form>

      {fromLocations.length > 0 && (
        <LocationCard 
          locations={fromLocations} 
          onLocationClick={(skyId, entityId) => handleLocationClick(skyId, entityId, true)} 
        />
      )}
      {toLocations.length > 0 && (
        <LocationCard 
          locations={toLocations} 
          onLocationClick={(skyId, entityId) => handleLocationClick(skyId, entityId, false)} 
        />
      )}
      {flightPath && <FlightCardContainer flightData={flightPath}/>}
      {loading && <Spinner/>}
      </>
  );
}

export default FlightSearchForm