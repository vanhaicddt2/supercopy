const CONSTANTS = {
    listBranchNoMassager: [3, 4, 8, 12, 15, 99],
    listBranchBreakFastWithMenu: [1],
    LIST_BLOCK_GUEST_NAME: [
        "LOCK", "KEEP",
        "AZTVL1", "AZTVL2", "AZLTT",
        "AZDN", "AZHP",
        "AZKM1", "AZKM2", "AZKM3", "AZHBT1", "AZLL", "AZLL2",
        "THAI VAN LUNG 1", "THAI VAN LUNG 2", "THAI VAN LUNG1", "THAI VAN LUNG2", "LE THANH TON",
        "KIM MA", "LINH LANG", "HAI BA TRUNG",
        "DA NANG", "HAI PHONG"
    ],
    LIST_GUEST_ID_BLOCK: [
        "6375c01ca808c1b418a0b148",   // KM3
        "6375f9dcf339c59c9b77c402",    // KM2
        "6528b400c94485acf4a0778d",    // KM2 v2
        "6375f9e5f339c59c9b77c405",    // LL
        "6375f9eaf339c59c9b77c408",    // HBt1
        "6375f9f0f339c59c9b77c40b",    // TVL1
        "6375f9f4f339c59c9b77c40e",    // TVL2
        "6375f9f8f339c59c9b77c411",   // LTT
        "6375f9fdf339c59c9b77c414",   // DN
        "6375fa01f339c59c9b77c417",  // HP
        "6375fa05f339c59c9b77c41a",  // CAM
        "637601aa8862f1ab0adb1796", // LOCK ROOM
        "652c90cfbfbc0ba470bffb23", // KM3 - 99
        "652c90f4bfbc0ba470bffb24", // KM2- 99
        "652c9107bfbc0ba470bffb26", // LL  -99
        "652c90fdbfbc0ba470bffb25", // HBT1 - 99
        "652c9140bfbc0ba470bffb2a", // TVL1 - 99
        "652c9146bfbc0ba470bffb2b", // TVL2 - 99
        "652c914fbfbc0ba470bffb2c", // LTT - 99
        "652c911dbfbc0ba470bffb27", // DN - 99
        "652c9129bfbc0ba470bffb28", // HP - 99
        "652c9138bfbc0ba470bffb29", // CAM - 99
        "652c92aabfbc0ba470bffb2d", // LOCK ROOM
    ],
    vat_discount: {
        start: "2022-01-28",
        end: "2022-12-31",
        vatRate: 1.08
    },
    branchNumberToShortName: {
        "1": "AZTVL1",
        "3": "AZHBT1",
        "4": "AZLTT",
        "7": "AZDN",
        "8": "AZKM2",
        "9": "AZTVL2",
        "11": "AZPP",
        "12": "AZLL",
        "13": "AZHP",
        "14": "AZMM",
        "15": "AZKM3",
        "96": "AZTEST4",
        "97": "AZTEST3",
        "98": "AZTEST2",
        "99": "AZTEST",
    },
    branchNameToBranchNumber: {
        "THAI VAN LUNG 1": 1,
        "AZUMAYA ANNEX": 1,
        "HAI BA TRUNG 1": 3,
        "LE THANH TON": 4,
        "DA NANG": 7,
        "KIM MA 2": 8,
        "THAI VAN LUNG 2": 9,
        "PHNOM PENH": 11,
        "LINH LANG": 12,
        "HAI PHONG": 13,
        "KIM MA 3": 15,
        "HA NOI": 3,
        "HO CHI MINH": 1,
        "TEST": 99
    },
    branchCompanyToShortName: {
        "Az Thai Van Lung 1": "AZTVL1",
        "3": "AZHBT1",
        "AZ Le Than Tong": "AZLTT",
        "Az Le Thanh Ton": "AZLTT",
        "AZ Da Nang": "AZDN",
        "AZ Kim Ma 2": "AZKM2",
        "Az Thai Van Lung 2": "AZTVL2",
        "AZUMAYA PHNOM PENH": "AZPP",
        "AZ Linh Lang": "AZLL",
        "Az Hai Phong": "AZHP",
        "14": "AZMM",
        "AZ Kim Ma 3": "AZKM3",
        "96": "AZTEST4",
        "97": "AZTEST3",
        "98": "AZTEST2",
        "99": "AZTEST",
    },
    branchNumberToArea: {
        "1": "AZHCM",
        "3": "AZHN",
        "4": "AZHCM",
        "7": "AZHP_DN",
        "8": "AZHN",
        "9": "AZHCM",
        "11": "AZCAM_PP",
        "12": "AZHN",
        "13": "AZHP_DN",
        "14": "AZCAM_PP",
        "15": "AZHN",
        "96": "AZTEST4",
        "97": "AZTEST3",
        "98": "AZHCM",
        "99": "AZTEST",
    },
    // areaNameVietNamToMail: {
    //     "Ha Noi":"managerhanoi@azumayavietnam.com",
    //     "Ho Chi Minh": "manager@azumayavietnam.dom",
    //     "Hai Phong": "managerhaiphong@azumayavietnam.com",
    //     "Da Nang": "managerdanang@azumayavietnam.com",
    //     "Phnom Penh": "areamanager@azumayacambodia.com",
    // },
}

module.exports = CONSTANTS;
