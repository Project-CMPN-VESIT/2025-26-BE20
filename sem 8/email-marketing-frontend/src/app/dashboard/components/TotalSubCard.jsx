import React from 'react'

const TotalSubCard = () => {
  return (
    <div data-test-id="big-card" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 sm:p-6 shadow-md rounded-lg text-center h-full flex flex-col justify-between w-full sm:max-w-[250px]">
      <div>
        <h2 data-test-id="card-title" className="text-lg font-semibold text-gray-700 mb-4">Total active subscribers</h2>
        <p data-test-id="card-count" className="text-4xl font-bold">1</p>
      </div>
      <p className="mt-6 mb-9  text-sm text-gray-500">
        Want more subscribers? 
        <a href="#" data-test-id="link" className="text-primary hover:underline">
          signup forms
        </a>
      </p>
    </div>
  )
}

export default TotalSubCard
