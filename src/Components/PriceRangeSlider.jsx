/* eslint-disable react/prop-types */

import ReactSlider from "react-slider";

function PriceRangeSlider({ searchParams, setSearchParams }) {
  const minPriceSearch = searchParams.get("minPrice") || 0;
  const maxPriceSearch = searchParams.get("maxPrice") || 2000;

  function updateRange(newValues) {
    setSearchParams((prev) => {
      prev.set("minPrice", newValues[0]);
      prev.set("maxPrice", newValues[1]);
      return prev;
    });
  }

  const values = [Number(minPriceSearch), Number(maxPriceSearch)];

  return (
    <div className="p-2 w-full mt-4"> {/* Added mt-4 (margin-top: 1rem) */}
      <label className="block text-gray-700 mb-4  text-sm font-bold mb-2">
        Select Price Range:
      </label>
      <ReactSlider
        style={{ width: '100%', height: '4px', margin: '24px 0', }}
        thumbClassName="thumb"
        trackClassName="track"
        min={0}
        max={2000}
        step={10}
        value={values}
        onChange={updateRange}
      />
      <style>{`
        .track {
          background: #ccc;
          height: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        .thumb {
          background: blue;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          transform: translateY(-50%);
        }
      `}</style>
      <div className="mt-4 flex justify-between">
        <span className="block text-sm mt-4 text-gray-700">Min: ${values[0]}</span>
        <span className="block mt-4 text-sm text-gray-700">Max: ${values[1]}</span>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
