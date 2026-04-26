import React from 'react'

const PlansComparisonTable = ({label, featurePlanOfferObject}) => {

  const totalCols = (Object.values(featurePlanOfferObject))[0].length + 1;

  return (
    <div className='relative my-5'>
    { label && <h3 className='font-bold text-xl md:text-lg mb-2'>{label}</h3>}
    <table className='table-fixed min-w-[1000px] w-full '>
        <tbody className='text-xl md:text-lg divide-y divide-gray-200 dark:divide-gray-400'>
        {featurePlanOfferObject && Object.keys(featurePlanOfferObject).map((key, index) => (
            <tr key={index} className='divide-x divide-gray-200 dark:divide-gray-400 hover:bg-[#e0fdfb] hover:dark:bg-primary group '>
            <th className={`text-left w-1/${totalCols}  py-3 pl-2 text-gray-400 text-lg md:text-base font-medium group-hover:pl-5 transition-effect`}>{key}</th>
            { featurePlanOfferObject[key].map((planOffer, index1) => (
                <td key={index1} className={`w-1/${totalCols} p-3 text-lg md:text-base`}>{planOffer}</td>
            ))
            }
            </tr>
        ))}
        </tbody>     
    </table>
    </div>
  )
}

export default PlansComparisonTable