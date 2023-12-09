// En tu archivo routes/shipping-rate.js

import { json } from '@remix-run/node';

export const action = async ({ request }) => {
    const body = await request.json();
    const { destination } = body.rate; // Extrae la información del destino del pedido

    // Implementa tu lógica de cálculo aquí
    // Por ejemplo, usando un mapeo simple de código postal a tarifa
    const tarifasPorZona = {
        'LOSOLIVOS': 1500, // Nueva York
        'SANLUIS': 800,
        'MAGDALENA':1000,
       'SANTAANITA':1000
    };

    const precioEnvio = tarifasPorZona[destination.postal_code] || 150; // Tarifa por defecto

    const shippingRate = {
        service_name: "Envios a distritos de Lima",
        service_code: "Distritos_de_lima",
        total_price: precioEnvio.toString(), // Convertir a string para la respuesta
        currency: "PEN",
        min_delivery_date: new Date().toISOString(),
        max_delivery_date: new Date().toISOString()
    };

    // Responder a Shopify con la tarifa de envío
    return json({ rates: [shippingRate] });
};
