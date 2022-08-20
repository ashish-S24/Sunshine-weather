import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id:1,
            title:'London'
        },
        {
            id:2,
            title:'Sydney'
        },
        {
            id:3,
            title:'Tokyo'
        },
        {
            id:4,
            title:'Paris'
        },
        {
            id:5,
            title:'Toronto'
        }
    ]
  return (
    <div className="flex items-center justify-around font-medium">
        {cities.map((city) => (
            <button key={city.id} className="text-white text-lg" onClick={() => setQuery({q : city.title})}>
                {city.title}
            </button>
        ))}
    </div>
  )
}

export default TopButtons