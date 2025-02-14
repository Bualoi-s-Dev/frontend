/* Do not change, this code is generated from Golang structs */
export enum PackageType {
    WEDDING_BLISS = "WEDDING_BLISS",
    BIRTHDAY_SHOOTS = "BIRTHDAY_SHOOTS",
    MATERNITY_GLOW = "MATERNITY_GLOW",
    FAMILY_PORTRAITS = "FAMILY_PORTRAITS",
    GRADUATION_MEMORIES = "GRADUATION_MEMORIES",
    NEWBORN_MOMENTS = "NEWBORN_MOMENTS",
    ENGAGEMENT_LOVE_STORY = "ENGAGEMENT_LOVE_STORY",
    CORPORATE_HEADSHOTS = "CORPORATE_HEADSHOTS",
    FASHION_EDITORIAL = "FASHION_EDITORIAL",
    TRAVEL_DIARIES = "TRAVEL_DIARIES",
    OTHER = "OTHER",
}

export enum BankName {
    KRUNG_THAI_BANK = "KRUNG_THAI_BANK",
    BANGKOK_BANK = "BANGKOK_BANK",
    SIAM_COMMERCIAL_BANK = "SIAM_COMMERCIAL_BANK",
    KASIKORN_BANK = "KASIKORN_BANK",
    TMB_THANACHART_BANK = "TMB_THANACHART_BANK",
    KRUNGSRI_BANK = "KRUNGSRI_BANK",
    GOVERNMENT_SAVINGS_BANK = "GOVERNMENT_SAVINGS_BANK",
    THAI_MILITARY_BANK = "THAI_MILITARY_BANK",
    UOB_THAILAND = "UOB_THAILAND",
    CIMB_THAILAND = "CIMB_THAILAND",
    STANDARD_CHARTERED = "STANDARD_CHARTERED",
    ICBC_THAILAND = "ICBC_THAILAND",
}

export interface Package {
    id?: string;
    ownerId?: string;
    title: string;
    type: PackageType;
    photo_urls: string[];
}

export interface PackageRequest {
    title?: string;
    type?: PackageType;
    photos?: string[];
}

export interface PackageStrictRequest {
    title: string;
    type: PackageType;
    photos: string[];
}

export interface User {
    id: string;
    email: string;
    name: string;
    gender: string;
    profile: string;
    phone: string;
    location: string;
    isPhotographer: boolean;
    bankName: BankName;
    bankAccount: string;
    lineID: string;
    facebook: string;
    instagram: string;
    showcasePackages: string[];
    packages: string[];
}
