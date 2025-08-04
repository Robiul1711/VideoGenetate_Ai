import React from 'react'
import SubscriptionDashboard from '../common/Dashboard_Components/SubscriptionDashboard'
import MyPricePlan from '../common/Dashboard_Components/MyPricePlan'

const MySubscription = () => {
  return (
    <div className='p-6'>
      <div>
        <SubscriptionDashboard />
      </div>
      <div className='mt-20 w-full mx-auto'>
        <MyPricePlan />
      </div>
    </div>
  )
}

export default MySubscription
