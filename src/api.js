import axios from 'axios';

export async function searchLocation(location_prefix){
    const api_key = import.meta.env.VITE_FLIGHT_DATA_API_KEY;
    const options = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
    params: {
        query: location_prefix,
        locale: 'en-US'
    },
    headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data["data"]
    } catch (error) {
        console.error(error);
    }
}

function parse_response(data){
    let response_data = {}
    response_data["details"] = []
    let duration = data["data"]["filterStats"]["duration"]
    let itineraries = data["data"]["itineraries"]
    for(let i=0;i<itineraries.length;i++){
        let item_detail = {}
        let price = itineraries[i]["price"]["formatted"]
        let legs = itineraries[i]["legs"][0]
        let marketing = legs["carriers"]["marketing"]
        let departure = new Date(legs["departure"])
        let arrival = new Date(legs["arrival"])
        item_detail["price"] = price
        item_detail["departure"] = departure
        item_detail["arrival"] = arrival
        item_detail["airlines"] = []
        for(let j =0; j<marketing.length;j++){
            item_detail["airlines"].push(marketing[j]["name"])
            // console.log(marketing[j]["name"])
        }
        // console.log(prices, arrival, departure)
        response_data["details"].push(item_detail)
    }
    response_data["min"] = duration["min"]
    response_data["max"] = duration["max"]
    return response_data
}

export async function searchFlights(people, from, to, from_date, to_date) {
    const api_key = import.meta.env.VITE_FLIGHT_DATA_API_KEY;
    const options = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
    params: {
        originSkyId: from["value"],
        destinationSkyId: to["value"],
        originEntityId: from["id"],
        destinationEntityId: to["id"],
        date: from_date,
        returnDate: to_date,
        cabinClass: 'economy',
        adults: people['Adult'],
        childrens: people['Children'] || 0,
        infants: people['Infant'] || 0,
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
    },
    headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        return parse_response(response.data)
    } catch (error) {
        console.error(error);
    }
}