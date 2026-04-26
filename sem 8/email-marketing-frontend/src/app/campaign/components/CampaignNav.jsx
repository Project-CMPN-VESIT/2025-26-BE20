import React from 'react'
import { Link } from 'react-router-dom'
import NavItem from '../../subscribers/components/NavItem'

const CampaignNav = () => {
  return (
    <div>
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            
                            <NavItem
                                to="/campaigns"
                                page="All Campaigns"
                                dataTestId="campaign navigation"
                                activeClass="underline" 
                                end
                            />

                        </li>
                        <li>
                            <NavItem
                                to="/campaigns/status/draft"
                                page="Draft Campaigns"
                                dataTestId="draft-campaigns"
                                activeClass="underline" 
                                end
                            />
                        </li>
                        <li>
                            <NavItem
                                to="/campaigns/status/completed"
                                page="Completed Campaigns"
                                dataTestId="completed-campaigns"
                                activeClass="underline" 
                                end
                            />
                        </li>
                        <li>
                            <NavItem
                                to="/campaigns/status/scheduled"
                                page="Scheduled Campaigns"
                                dataTestId="scheduled-campaigns"
                                activeClass="underline" 
                                end
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default CampaignNav