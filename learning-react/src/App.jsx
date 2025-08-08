import "./App.css";
import { YoutubeForm } from "./components/youtubeForm/youtubeForm.jsx";
// import {  useState } from "react";
// import { CountryCard } from "./components/countryCard/countryCard.jsx";
// import { Note } from "./components/note/note.jsx";
// import { PasswordGenerator } from "./components/passwordGenerator/passwordGenerator.jsx";
// import { Dropdown } from "./components/dropdown/dropdown.jsx";

function App() {
  // const countryList = [
  //   "India",
  //   "United States",
  //   "United Kingdom",
  //   "Germany",
  //   "France",
  //   "Italy",
  //   "Canada",
  //   "Brazil",
  //   "Australia",
  //   "Japan",
  //   "South Africa",
  //   "Russia",
  //   "Mexico",
  //   "China",
  //   "Argentina",
  // ];

  // const [selectedCountryData, setSelectedCountryData] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const fetchCountryData = async (countryName) => {
  //   if (!countryName) return;

  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `https://restcountries.com/v3.1/name/${countryName}`
  //     );
  //     console.log(response);

  //     if (response.ok) {
  //       const data = await response.json();
  //       setSelectedCountryData(data[0]); // Take first result
  //       console.log("Fetched country data:", data[0]);
  //     } else {
  //       console.error("Country not found");
  //       setSelectedCountryData(null);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching country:", error);
  //     setSelectedCountryData(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
    <YoutubeForm /></>
    // <div className="w-full min-h-screen bg-gray-100 p-4 !block">
    //   <h1 className="text-3xl font-bold underline text-center mb-8">
    //     🌍 Country Info Viewer
    //   </h1>

    //   <Dropdown
    //     countries={countryList}
    //     onSelect={(country) => {
    //       fetchCountryData(country);
    //     }}
    //   />

    //   {loading && (
    //     <div className="text-center">
    //       <p className="text-lg text-blue-600">Loading country data...</p>
    //     </div>
    //   )}

    //   {selectedCountryData && (
    //     <CountryCard
    //       countryName={selectedCountryData.name.common}
    //       description={`${selectedCountryData.name.common} is located in ${selectedCountryData.region}`}
    //       imageUrl={selectedCountryData.flags.png}
    //       capital={
    //         selectedCountryData.capital ? selectedCountryData.capital[0] : "N/A"
    //       }
    //       population={selectedCountryData.population}
    //     />
    //   )}

    //   {selectedCountryData && (
    //     <div className="w-full">
    //       <CountryCard
    //         countryName={selectedCountryData.name.common}
    //         description={`${selectedCountryData.name.common} is located in ${selectedCountryData.region}`}
    //         imageUrl={selectedCountryData.flags.png}
    //         capital={
    //           selectedCountryData.capital
    //             ? selectedCountryData.capital[0]
    //             : "N/A"
    //         }
    //         population={selectedCountryData.population}
    //       />

    //       {/* Use the new CountryInfo component */}
    //       <CountryCard countryData={selectedCountryData} />
    //     </div>
    //   )}

    //   {/* <Note /> */}
    //   {/* <PasswordGenerator /> */}
    // </div>
  );
}

export default App;
