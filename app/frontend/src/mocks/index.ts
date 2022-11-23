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
    debitedAccountId: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
    creditedAccountId: '801ac684-1f66-4b73-9da9-511d4117e8c9',
    value: 2000,
  },
  {
    id: '4342c270-c9cf-41d9-8989-3f82cf71de63',
    createdAt: '2022-11-19T15:32:26.393Z',
    description: 'Pedreiro',
    debitedAccountId: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
    creditedAccountId: '801ac684-1f66-4b73-9da9-511d4117e8c9',
    value: 5000,
  },
  {
    id: 'f4ba5d20-f4b7-4b31-97c8-7089bde42936',
    createdAt: '2022-11-19T15:32:36.788Z',
    description: 'Carne',
    debitedAccountId: '5d8682e6-a7b7-4768-bf5c-d3033d01d446',
    creditedAccountId: '801ac684-1f66-4b73-9da9-511d4117e8c9',
    value: 5000,
  },
]

export { loginUser, authenticatedUser, transactions }
