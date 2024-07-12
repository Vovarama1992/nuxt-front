const result = await fetch("https://www.cdek.ru/api-site/v1/graphql/", {
  headers: {
    "Content-Type": "application/json",
  },
  method: 'POST',
  body: JSON.stringify({
    query:
      "\nquery getTrackingInfo(\n  $trackId: String!\n  $phone: String\n  $locale: String!\n  $token: String\n) {\n  tracking: trackingInfo(\n    trackId: $trackId\n    phone: $phone\n    locale: $locale\n    token: $token\n  ) {\n    success\n    orderNumber\n    status {\n      code\n      name\n      note\n      date\n    }\n    statuses {\n      code\n      name\n      note\n      date\n      completed\n      items {\n        code\n        name\n        statuses {\n            code\n            name\n            date\n        }\n      }\n    }\n    cityFrom {\n      code\n      name\n    }\n    cityTo {\n      code\n      name\n    }\n    orderDate\n    tariffDateEnd\n    storageDateEnd\n    deliveryAgreementDate\n    returnOrderNumber\n    weight\n    stockType\n    receiver {\n        initials\n        address {\n            title\n            city {\n                code\n                name\n            }\n            office {\n                systemName\n                type\n                worktime\n                notes\n            }\n        }\n    }\n    notes {\n        code\n        name\n    }\n    nonDeliveryNote {\n        code\n        name\n    }\n    errors {\n      message\n      code\n    }\n    specialNote\n    canBeReturned\n  }\n}\n",
    variables: {
      trackId: "f8-238931412250927",
      locale: "ru",
      token: null,
    },
    context: {
      enabledGlobalError: false,
    },
  }),
});

console.log(await result.json())