export function CountryCard({ countryData }) {
  if (!countryData) return null;

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Additional Information
      </h3>
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 w-full">
          <span className="font-medium text-gray-600">Region:</span>
          <p className="text-gray-800 mt-1">{countryData.region}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500 w-full">
          <span className="font-medium text-gray-600">Subregion:</span>
          <p className="text-gray-800 mt-1">{countryData.subregion}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500 w-full">
          <span className="font-medium text-gray-600">Area:</span>
          <p className="text-gray-800 mt-1">
            {countryData.area?.toLocaleString()} km²
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500 w-full">
          <span className="font-medium text-gray-600">Languages:</span>
          <p className="text-gray-800 mt-1">
            {Object.values(countryData.languages || {}).join(", ")}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 w-full">
          <span className="font-medium text-gray-600">Currency:</span>
          <p className="text-gray-800 mt-1">
            {Object.values(countryData.currencies || {})
              .map((currency) => `${currency.name} (${currency.symbol})`)
              .join(", ")}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500 w-full">
          <span className="font-medium text-gray-600">Timezone:</span>
          <p className="text-gray-800 mt-1">
            {countryData.timezones?.[0] || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
