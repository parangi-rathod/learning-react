export function Dropdown({countries, onSelect}) {
  return (
    <div className="max-w-md mx-auto mb-8">
    <select
      className="border border-gray-300 rounded p-2"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select a country</option>
      {countries.map((country, index) => (
        <option key={index} value={typeof country === 'string' ? country : country.name.common}>
          {typeof country === 'string' ? country : country.name.common}
        </option>
      ))}
    </select>
    </div>
  );
}