import React from 'react'
import { Link } from 'react-router-dom'

const FormsNav = () => {
  return (
    <div>
        <nav className="bg-gray-50 dark:bg-gray-700">
            <h1 className="text-xl font-bold">Forms</h1>
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            
                            <Link 
                            data-test-id="popup-navigation"
                            to="" 
                            className="text-gray-900 dark:text-white hover:underline hover:text-primary" aria-current="page"
                            >
                            Pop-ups
                            </Link>
                        </li>
                        <li>
                            <Link 
                            data-test-id="embeded-form-navigation"
                            to="" className="text-gray-900 dark:text-white hover:underline hover:text-primary">Embeded Forms</Link>
                        </li>
                        <li>
                            <Link 
                            data-test-id="promotions-navigation"
                            to="" className="text-gray-900 dark:text-white hover:underline hover:text-primary">Promotions</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default FormsNav