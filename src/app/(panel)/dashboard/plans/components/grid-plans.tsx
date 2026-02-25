import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { subscriptionPlans } from '@/utils/plans/index';

export function GridPlans() {
  return (
    <div className='flex gap-4'>
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className={`flex flex-col w-full mx-auto overflow-hidden ${index === 1 ? 'pt-0' : ''}`}
        >
          {index === 1 && (
            <div className='bg-emerald-500 w-full py-3 text-center'>
              <p className='font-semibold text-white'>PROMOÇÃO EXCLUSIVA</p>
            </div>
          )}

          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
