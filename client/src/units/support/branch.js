export function coverIDToFullName(value) {
    switch (value) {
        case 1: return "Thai Van Lung 1";
        case 2: return "Annex";
        case 3: return "Hai Ba Trung 1";
        case 4: return "Le Thanh Ton";
        case 5: return "Kim Ma 1";
        case 6: return "";
        case 7: return "Da Nang";
        case 8: return "Kim Ma 2";
        case 9: return "Thai Van Lung 2";
        case 10: return "";
        case 11: return "Phnom Penh";
        case 12: return "Linh Lang";
        case 13: return "Hai Phong";
        case 14: return "Myanmar";
        case 15: return "Kim Ma 3";
        case 91: return "Test 2";
        case 99: return "Test 1";
        default: return "";
    }
}

export const BRANCH_HAVE_NOTE_MASSAGE = [3, 4, 8, 9, 13, 14, 15, 99];
