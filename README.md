# Flight Path - Flight Search Application

This project is a flight search application built using React and TypeScript, leveraging the Sky-Scrapper API (via RapidAPI) to fetch flight data. It allows users to search for flights between different cities based on departure and arrival locations.  This project was developed as a take-home assignment for a Full Stack Developer role.

## Features
* **Search:** Search for flights by specifying departure and arrival cities.
* **Responsive Design:**  The application is responsive and adapts to different screen sizes (desktops, tablets, and mobile devices).
* **Loading State:**  A loading indicator is displayed while flight data is being fetched.


## Technologies Used

* **React:**  A JavaScript library for building user interfaces.
* **TypeScript:**  A typed superset of JavaScript that compiles to plain JavaScript.
* **Bootstrap CSS:** A utility-first CSS framework for rapidly styling custom designs.
* **Sky-Scrapper API (via RapidAPI):**  An API for retrieving flight data.

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/SagunDevkota/flight-path.git](https://www.google.com/search?q=https://github.com/SagunDevkota/flight-path.git)
   ```

2. Navigate to the project directory:

    ```Bash
    cd flight-path
    ```

3. Install dependencies:
    ```Bash
    npm install 
    ```

4. Obtain an API key from RapidAPI for the Sky-Scrapper API.

5. Create a .env file in the root of the project and add your API key:
    ```
        VITE_FLIGHT_DATA_API_KEY=your_rapid_api_key_here
    ```

6. Start the development server:
    ```
        npm run dev
    ```