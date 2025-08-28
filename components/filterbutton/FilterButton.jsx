import React from 'react'

const FilterButton = ({label}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50"
    >
      {label}
      {/* Replace with {chevronDownIcon} */}
      <span className="text-gray-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    </button>
  );
}

export default FilterButton