import { onGetSubscriptionPlan } from '@/actions/settings';
import React from 'react';
import Section from '../section-label';
import { pricingCards } from '@/constants/landing-page';
import { CheckCircle2 } from 'lucide-react';

type Props = {};
const BillingSettings = async (props: Props) => {
    const plan = await onGetSubscriptionPlan();
    const planFeatures = pricingCards.find(
        (card) => card.title.toUpperCase() === plan?.toUpperCase()
      )?.features
      if (!planFeatures) return

    return (
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
            <div className='lg:col-span-1'>
                <Section 
                    label="Billing Settings"
                    message="Add payment information, upgrade and modify your plan"
                /> 
            </div>
            <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
                <p className="text-sm font-semibold">{plan}</p>
                <div className="flex gap-2 flex-col mt-2">
                {planFeatures.map((feature) => (
                    <div
                    key={feature}
                    className="flex gap-2"
                    >
                    <CheckCircle2 className="text-muted-foreground" />
                    <p className="text-muted-foreground">{feature}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default BillingSettings;