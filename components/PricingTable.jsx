// PricingTable.jsx
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0€",
    description: "Empieza gratis. Ideal para probar la plataforma.",
    features: [
      "3 exámenes al mes",
      "3 correcciones IA/mes",
      "Historial 30 días",
      "Soporte básico",
    ],
    cta: {
      label: "Regístrate gratis",
      href: "/auth/signup",
      variant: "outline",
    },
    highlight: false,
  },
  {
    name: "Pro",
    price: "9€/mes",
    description: "Para estudiantes intensivos y opositores.",
    features: [
      "50 exámenes al mes",
      "50 correcciones IA/mes",
      "Historial ilimitado",
      "Exportar PDF",
      "Soporte prioritario",
    ],
    cta: {
      label: "Hazte Pro",
      href: "/auth/signup?plan=pro",
      variant: "default",
    },
    highlight: true,
  },
];

export default function PricingTable() {
  return (
    <section className="py-20 bg-white border-t border-blue-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
          Elige tu plan
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Empieza gratis y sube a Pro cuando lo necesites.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 shadow-md flex flex-col items-center ${
                plan.highlight
                  ? "border-blue-600 bg-blue-50"
                  : "border-blue-100 bg-white"
              }`}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {plan.name}
              </h3>
              <div className="text-3xl font-extrabold mb-2 text-blue-700">
                {plan.price}
              </div>
              <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
              <ul className="mb-8 space-y-2 w-full">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-blue-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                variant={plan.cta.variant}
                className={`w-full ${plan.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
              >
                <a href={plan.cta.href}>{plan.cta.label}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}