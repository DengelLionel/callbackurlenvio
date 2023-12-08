// En tu archivo routes/shipping-rate.js

import { json } from '@remix-run/node';

export const action = async ({ request }) => {
    const body = await request.json();
    const { destination } = body.rate; // Extrae la información del destino del pedido

    // Implementa tu lógica de cálculo aquí
    // Por ejemplo, usando un mapeo simple de código postal a tarifa
    const tarifasPorZona = {
        'LOS OLIVOS': 15, // Nueva York
        'JAUJA': 30,
       'JUNIN':30
    };

    const precioEnvio = tarifasPorZona[destination.postal_code] || 40; // Tarifa por defecto

    const shippingRate = {
        service_name: "Standard Shipping",
        service_code: "standard",
        total_price: precioEnvio.toString(), // Convertir a string para la respuesta
        currency: "PEN",
        min_delivery_date: new Date().toISOString(),
        max_delivery_date: new Date().toISOString()
    };

    // Responder a Shopify con la tarifa de envío
    return json({ rates: [shippingRate] });
};
