'use strict';

const { uuid } = require('uuidv4')

const ERROR_IDS = ['400', '404', '422', '500']

const isErrorId = (id) => ERROR_IDS.includes(id)

const httpResponse = (body, statusCode = 200) => {
    return {
        statusCode,
        body: JSON.stringify(body)
    }
}

const getPathParameter = (event, key) => event['pathParameters'][key]
const getBody = (event) => JSON.parse(event.body)

const getBuyerById = (event) => {
    const buyerId = getPathParameter(event, 'buyerId')

    if (isErrorId(buyerId)) {
        return httpResponse({}, buyerId)
    }

    return httpResponse({
        id: buyerId,
        enabled: true,
        identification: "12345678",
        gender: "M",
        name: "Example",
        lastName: "Buyer",
        email: "a@buyer.com",
        dateOfBirth: "01/01/1970",
        address: {
            id: 1,
            city: "Buenos Aires",
            country: "AR",
            line1: "Buyers house 123",
            line2: "2 B",
            postalCode: "CP1424AR",
            state: "CABA"
        }
    })
}

const getSellerById = (event) => {
    const sellerId = getPathParameter(event, 'sellerId')

    if (isErrorId(sellerId)) {
        return httpResponse({}, sellerId)
    }

    return httpResponse({
        id: sellerId,
        identification: "1234444511",
        enabled: true,
        name: "Example",
        lastName: "Seller",
        email: "a@seller.com",
        dateOfBirth: "01/02/1971",
        address: {
            id: 2,
            city: "Buenos Aires",
            country: "AR",
            line1: "Sellers house 1234",
            line2: "2 C",
            postalCode: "CP1425AR",
            state: "CABA"
        }
    })
}

const getQrById = (event) => {
    const qrId = getPathParameter(event, 'qrId')

    if (isErrorId(qrId)) {
        return httpResponse({}, qrId)
    }

    return httpResponse({
        id: qrId,
        enabled: true
    })
}

const getPaymentMethod = (event) => {
    const buyerId = getPathParameter(event, 'buyerId')
    const paymentMethodToken = getPathParameter(event, 'paymentMethodToken')

    if (isErrorId(paymentMethodToken)) {
        return httpResponse({}, paymentMethodToken)
    }

    return httpResponse({
        id: 1,
        enabled: true,
        securityCode: '123',
        token: paymentMethodToken,
        type: "CREDIT"
    })
}

const authorizePayment = (event) => {
    const { establishmentId } = getBody(event)

    if(isErrorId(establishmentId)) {
        return httpResponse({}, establishmentId)
    }

    return httpResponse({
        id: uuid(),
        traceNumber: uuid(),
        status: 'ACCEPTED',
        timestamp: new Date().toISOString()
    })
}

module.exports = {
    getBuyer: async (event) => getBuyerById(event),
    getSeller: async (event) => getSellerById(event),
    getQr: async (event) =>  getQrById(event),
    getPaymentMethod: async (event) => getPaymentMethod(event),
    authorizePayment: async (event) => authorizePayment(event)
}