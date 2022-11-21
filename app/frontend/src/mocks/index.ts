const loginUser = {
  username: 'Lucio',
  password: '1234asdF',
}

const authenticatedUser = {
  username: 'Lucio',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2lvIiwiaWF0IjoxNjY5MDU2MDQ2LCJleHAiOjE2NjkxNDI0NDYsInN1YiI6ImVhMjdmMDAwLTViMTEtNGQ4ZC1iODFmLTM5ZWFiYWZhZjI5MyJ9.LUXRLBTZcvw4I_tYd3KluhL834or9EyqIGPTF3z_TM0',
  account: {
    id: 'deefe6fb-105f-4a80-9040-d3724b390fdc',
    balance: 100,
  },
}

const transactions = [
  {
    id: '45e19034-12fd-47a0-a655-a286bef1830b',
    createdAt: '2022-11-19T01:39:27.312Z',
    description: 'Encanador',
    debitedAccountId: {
      id: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
      balance: 67,
    },
    creditedAccountId: {
      id: '801ac684-1f66-4b73-9da9-511d4117e8c9',
      balance: 221,
    },
  },
  {
    id: '4342c270-c9cf-41d9-8989-3f82cf71de63',
    createdAt: '2022-11-19T15:32:26.393Z',
    description: 'Pedreiro',
    debitedAccountId: {
      id: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
      balance: 67,
    },
    creditedAccountId: {
      id: '801ac684-1f66-4b73-9da9-511d4117e8c9',
      balance: 221,
    },
  },
  {
    id: 'f4ba5d20-f4b7-4b31-97c8-7089bde42936',
    createdAt: '2022-11-19T15:32:36.788Z',
    description: 'Carne',
    debitedAccountId: {
      id: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
      balance: 67,
    },
    creditedAccountId: {
      id: '801ac684-1f66-4b73-9da9-511d4117e8c9',
      balance: 221,
    },
  },
  {
    id: '0fc4d46c-8663-40a2-a52c-2808f8b94373',
    createdAt: '2022-11-19T15:49:33.532Z',
    description: 'Feira',
    debitedAccountId: {
      id: '801ac684-1f66-4b73-9da9-511d4117e8c9',
      balance: 221,
    },
    creditedAccountId: {
      id: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
      balance: 67,
    },
  },
  {
    id: 'ad3206f0-ac34-4143-a4a2-071e8dd6fe75',
    createdAt: '2022-11-19T15:56:17.452Z',
    description: 'Feira',
    debitedAccountId: {
      id: 'f388443d-8c54-4ffc-8255-2335e71dee69',
      balance: 12,
    },
    creditedAccountId: {
      id: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
      balance: 67,
    },
  },
]

export { loginUser, authenticatedUser, transactions }
