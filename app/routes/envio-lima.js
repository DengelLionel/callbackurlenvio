import { json } from '@remix-run/node';

export const action = async ({ request }) => {
    const body = await request.json();
    const { destination } = body.rate;

    // Define las zonas de Lima y sus tarifas
    const zonasLima = {
        "LOSOLIVOS": 1000,
        "SANLUIS": 1000,
        "MAGDALENA": 1000,
        "MIRAFLORES": 1000,
        "SURCO": 1000,
        "SANISIDRO": 1000,
        "LAMOLINA": 1000,
        "BARRANCO": 1000,
    };

    // Define las zonas de provincias y sus tarifas
    const zonasProvincias = {
    "AREQUIPA": 2000,
    "CUSCO": 2000,
    "TRUJILLO": 2000, 
    "PIURA": 2000,
    "CHICLAYO": 2000,
    "HUANCAYO": 2000,
    "ICA": 2000,
    "PUNO": 4000,
    };

    // Determina la tarifa basada en la zona
    let precioEnvio = zonasLima[destination.postal_code] || zonasProvincias[destination.postal_code] || 2000; // Tarifa por defecto para zonas no especificadas

    const shippingRate = {
        service_name: precioEnvio === 2000 ? "Envios a Provincias" : "Envios a Lima",
        service_code: precioEnvio === 2000 ? "Provincias" : "Lima",
        total_price: precioEnvio.toString(),
        currency: "PEN",
        min_delivery_date: new Date().toISOString(),
        max_delivery_date: new Date().toISOString()
    };

    return json({ rates: [shippingRate] });
};
