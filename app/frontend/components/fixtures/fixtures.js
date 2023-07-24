const applicantsResponse = [
  {
    id: 1,
    first_name: "Barney",
    last_name: "Stinson",
    culture_type_id: 2,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Please",
    },
  },
  {
    id: 2,
    first_name: "Ted",
    last_name: "Mosby",
    culture_type_id: 3,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 3,
    first_name: "Robin",
    last_name: "Scherbatsky",
    culture_type_id: 4,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 4,
    first_name: "Lilly",
    last_name: "Aldrin",
    culture_type_id: 5,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Carbon Neutral",
    },
  },
  {
    id: 5,
    first_name: "Marshall",
    last_name: "Eriksen",
    culture_type_id: 5,
    created_at: "2023-07-24T14:28:07.237Z",
    updated_at: "2023-07-24T14:28:07.237Z",
    culture_type: {
      name: "Carbon Neutral",
    },
  },
];

const companiesResponse = [
  {
    id: 1,
    name: "Please Incorporated",
    culture_type_id: 2,
    created_at: "2023-07-24T14:28:07.242Z",
    updated_at: "2023-07-24T14:28:07.242Z",
    culture_type: {
      name: "Please",
    },
  },
  {
    id: 2,
    name: "Clever Incorporated",
    culture_type_id: 3,
    created_at: "2023-07-24T16:26:28.361Z",
    updated_at: "2023-07-24T16:26:28.361Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 3,
    name: "Clever 2 Incorporated",
    culture_type_id: 4,
    created_at: "2023-07-24T14:28:07.242Z",
    updated_at: "2023-07-24T14:28:07.242Z",
    culture_type: {
      name: "Clever",
    },
  },
  {
    id: 4,
    name: "Carbon Neutral Incorporated",
    culture_type_id: 4,
    created_at: "2023-07-24T14:28:07.242Z",
    updated_at: "2023-07-24T14:28:07.242Z",
    culture_type: {
      name: "Carbon Neutral",
    },
  },
];

const cultureTypesResponse = [
  {
    id: 2,
    name: "Please",
    created_at: "2023-07-24T14:28:07.244Z",
    updated_at: "2023-07-24T14:28:07.244Z",
  },
  {
    id: 3,
    name: "Clever",
    created_at: "2023-07-24T14:28:07.244Z",
    updated_at: "2023-07-24T14:28:07.244Z",
  },
  {
    id: 4,
    name: "Carbon Neutral",
    created_at: "2023-07-24T14:28:07.244Z",
    updated_at: "2023-07-24T14:28:07.244Z",
  },
];

const matchesResponse = [
  {
    id: 1,
    applicant_id: 1,
    company_id: 1,
    created_at: "2023-07-24T16:35:38.803Z",
    updated_at: "2023-07-24T16:35:38.803Z",
    company: {
      name: "Please Incorporated",
    },
    applicant: {
      first_name: "Barney",
      last_name: "Stinson",
    },
  },
  {
    id: 2,
    applicant_id: 5,
    company_id: 3,
    created_at: "2023-07-24T16:35:38.948Z",
    updated_at: "2023-07-24T16:35:38.948Z",
    company: {
      name: "Clever 2 Incorporated",
    },
    applicant: {
      first_name: "Marshall",
      last_name: "Eriksen",
    },
  },
  {
    id: 3,
    applicant_id: 4,
    company_id: 3,
    created_at: "2023-07-24T16:35:39.073Z",
    updated_at: "2023-07-24T16:35:39.073Z",
    company: {
      name: "Clever 2 Incorporated",
    },
    applicant: {
      first_name: "Lilly",
      last_name: "Aldrin",
    },
  },
  {
    id: 4,
    applicant_id: 5,
    company_id: 4,
    created_at: "2023-07-24T16:35:39.198Z",
    updated_at: "2023-07-24T16:35:39.198Z",
    company: {
      name: "Carbon Neutral Incorporated",
    },
    applicant: {
      first_name: "Marshall",
      last_name: "Eriksen",
    },
  },
  {
    id: 5,
    applicant_id: 4,
    company_id: 4,
    created_at: "2023-07-24T16:35:39.322Z",
    updated_at: "2023-07-24T16:35:39.322Z",
    company: {
      name: "Carbon Neutral Incorporated",
    },
    applicant: {
      first_name: "Lilly",
      last_name: "Aldrin",
    },
  },
];

// export default async function mockFetch(url) {
//   switch (url) {
//     case "/api/v1/applicants": {
//       return {
//         ok: true,
//         status: 200,
//         json: async () => applicantsResponse,
//       };
//     }
//     case "/api/v1/companies": {
//       return {
//         ok: true,
//         status: 200,
//         json: async () => companiesResponse,
//       };
//     }
//     case "/api/v1/culture_types": {
//       return {
//         ok: true,
//         status: 200,
//         json: async () => cultureTypesResponse,
//       };
//     }
//     case "/api/v1/matches/match": {
//       return {
//         ok: true,
//         status: 200,
//         json: async () => matchesResponse,
//       };
//     }
//     default: {
//       throw new Error(`Unhandled request: ${url}`);
//     }
//   }
// }

export { applicantsResponse };
