'use strict';

const { uuid } = require('uuidv4')

const httpResponse = (body) => {
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    }
}

const getPathParameter = (event, key) => event['pathParameters'][key]
const getBody = (event) => JSON.parse(event.body)

const getBuyerById = (event) => {
    const buyerId = getPathParameter(event, 'buyerId')
    return httpResponse({ buyerId: buyerId })
}

const getSellerById = (event) => {
    const sellerId = getPathParameter(event, 'sellerId')
    return httpResponse({ sellerId: sellerId })
}

const getQrById = (event) => {
    const qrId = getPathParameter(event, 'qrId')
    return httpResponse({ qrId: qrId })
}

const getPaymentMethod = (event) => {
    const paymentMethodId = getPathParameter(event, 'paymentMethodId')
    return httpResponse({ paymentMethodId: paymentMethodId })
}

const authorizePayment = (event) => {
    const httpBody = getBody(event)
    return httpResponse({ id: uuid(), code: uuid() })
}

module.exports = {
    getBuyer: async (event) => getBuyerById(event),
    getSeller: async (event) => getSellerById(event),
    getQr: async (event) =>  getQrById(event),
    getPaymentMethod: async (event) => getPaymentMethod(event),
    authorizePayment: async (event) => authorizePayment(event)
}