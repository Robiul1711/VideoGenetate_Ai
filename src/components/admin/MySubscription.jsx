import React from 'react'
import SubscriptionDashboard from '../common/Dashboard_Components/SubscriptionDashboard'
import MyPricePlan from '../common/Dashboard_Components/MyPricePlan'
import ChoosePlan from '../Home_Components/ChoosePlan'

const MySubscription = () => {
  return (
    <div className='p-6'>
      <div>
        <SubscriptionDashboard />
      </div>
      <div className=''>
        <ChoosePlan />
      </div>
    </div>
  )
}

export default MySubscription
