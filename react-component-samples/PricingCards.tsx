// TEST: valid component that takes a list (type any) and sends the chosen item.
// Configure: Inputs  title (string), plans (any)   Outputs  planSelected
// Value for plans, if you type it: [{"name":"Basic","price":"$9","features":["1 user","Email support"]}]
// Expected: valid, no errors. Without plans it shows three sample plans.
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  features: string[];
}

interface PricingCardsProps {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plans?: any;
  onOutput?: (key: string, value: unknown) => void;
}

const SAMPLE_PLANS: Plan[] = [
  { name: 'Basic', price: '$9', features: ['1 user', 'Email support'] },
  { name: 'Team', price: '$29', features: ['10 users', 'Priority support', 'Reports'] },
  { name: 'Business', price: '$99', features: ['Unlimited users', 'Phone support', 'Reports', 'Single sign-on'] },
];

export default function PricingCards({ title = 'Choose a plan', plans, onOutput }: PricingCardsProps) {
  const list: Plan[] = Array.isArray(plans) && plans.length > 0 ? plans : SAMPLE_PLANS;

  return (
    <section style={{ padding: '40px 24px', maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginTop: 0 }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {list.map((plan) => (
          <div
            key={plan.name}
            style={{ border: '1px solid rgba(128, 128, 128, 0.35)', borderRadius: 12, padding: 20 }}
          >
            <h3 style={{ margin: 0 }}>{plan.name}</h3>
            <p style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 16px' }}>{plan.price}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'grid', gap: 8 }}>
              {(plan.features || []).map((feature) => (
                <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <Check size={16} /> {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onOutput?.('planSelected', plan)}
              style={{
                width: '100%',
                padding: '10px 0',
                borderRadius: 8,
                border: '1px solid currentColor',
                background: 'transparent',
                color: 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
