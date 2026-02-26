import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { subscriptionPlans } from '@/utils/plans/index';
import { SubscriptionPlan } from './subsription-plan';

export function GridPlans() {
  return (
    <section className="md:grid md:grid-cols-2 gap-4 lg:gap-6">
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className={`flex flex-col w-full mx-auto my-4 overflow-hidden ${index === 1 ? 'pt-0 border-emerald-500' : ''}`}
        >
          {index === 1 && (
            <div className="bg-emerald-500 w-full py-3 text-center">
              <p className="font-semibold text-white">PROMOÇÃO EXCLUSIVA</p>
            </div>
          )}

          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              {plan.features.map((feature, index) => (
                <li className="text-sm md:text-base" key={index}>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-gray-500 text-sm md:text-base line-through">
                {plan.oldPrice}
              </p>
              <p className="text-lg font-semibold mt-1">{plan.price}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubscriptionPlan
              type={plan.id === 'BASIC' ? 'BASIC' : 'PROFESSIONAL'}
            />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
