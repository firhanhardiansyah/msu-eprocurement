export const usePurchase = () => {
  // Dummy vendor data
  const listVendor = ref([
    {
      id: 1,
      name: "Karyawan HG",
    },
    {
      id: 2,
      name: "HASNUR RESOURCE TERMINAL, PT",
    },
    {
      id: 3,
      name: "AKR CORPORINDO.TBK, PT",
    },
    {
      id: 4,
      name: "YANI NANDA TARA, PT",
    },
    {
      id: 5,
      name: "ELLYA TOURS & TREVEL",
    },
    {
      id: 6,
      name: "SHA SOLO, PT",
    },
    {
      id: 7,
      name: "HARKAT ABADI, PT",
    },
    {
      id: 8,
      name: "ZAM-ZAM AIR MULIA, CV",
    },
  ]);

  // Dummy vendor data
  const listAccount = ref([
    {
      id: 1,
      name: "Cost of Revenue MSU Shcool",
    },
    {
      id: 2,
      name: "Cost of Revenue Project Dry Hire",
    },
    {
      id: 3,
      name: "Cost of Revenue Project Fuel Transport",
    },
    {
      id: 4,
      name: "Cost of Revenue Project Hauling",
    },
    {
      id: 5,
      name: "Cost of Revenue Project Lubrycant Seller",
    },
    {
      id: 6,
      name: "Cost of Revenue Project Project Material Seller",
    },
    {
      id: 7,
      name: "Cost of Revenue Project Tyre Seller",
    },
  ]);

  // Dummy company data
  const listCompany = ref([
    {
      id: 1,
      name: "MAGMA SIGMA UTAMA, PT",
    },
    {
      id: 2,
      name: "SINERGI SIGRA SEJAHTERA, PT",
    },
    {
      id: 3,
      name: "MITRA SIGRA UTAMA, PT",
    },
  ]);

  // Dummy warehouse data
  const listWarehouse = ref([
    {
      id: 1,
      name: "Kantor Jakarta: Good Receipts",
    },
  ]);

  // Dummy warehouse data
  const listLocation = ref([
    {
      id: 1,
      name: "Jakarta",
    },
  ]);

  // Dummy warehouse data
  const listAssessmentCriteria = ref([
    {
      id: 1,
      name: "Kriteria Penilaian",
    },
  ]);

  return {
    listVendor,
    listAccount,
    listCompany,
    listWarehouse,
    listLocation,
    listAssessmentCriteria,
  };
};
