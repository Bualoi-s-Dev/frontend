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
export enum UserRole {
  Photographer = "Photographer",
  Customer = "Customer",
  Guest = "Guest",
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
export enum DayName {
  SUN = "SUN",
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
  SAT = "SAT",
}
export enum BusyTimeType {
  Photographer = "Photographer",
  Appointment = "Appointment",
}
export enum AppointmentStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Canceled = "Canceled",
  Completed = "Completed",
}
export enum PaymentStatus {
  Unpaid = "Unpaid",
  Wait = "Wait",
  InProcess = "InProcess",
  Paid = "Paid",
  Completed = "Completed",
}
export interface PackageRequest {
  title?: string;
  type?: PackageType;
  photos?: string[];
}
export interface Subpackage {
  id: string;
  packageId: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  isInf: boolean;
  repeatedDay: DayName[];
  availableStartTime: string;
  availableEndTime: string;
  availableStartDay: string;
  availableEndDay: string;
}
export interface PackageResponse {
  id: string;
  ownerId: string;
  title: string;
  type: PackageType;
  photoUrls: string[];
  subPackages: Subpackage[];
}
export interface UserRequest {
  name?: string;
  gender?: string;
  profile?: string;
  phone?: string;
  location?: string;
  role?: UserRole;
  description?: string;
  bankName?: BankName;
  bankAccount?: string;
  lineID?: string;
  facebook?: string;
  instagram?: string;
  showcasePackages?: string[];
}
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  gender: string;
  profile: string;
  phone: string;
  location: string;
  role: UserRole;
  description: string;
  bankName: BankName;
  bankAccount: string;
  lineID: string;
  facebook: string;
  instagram: string;
  showcasePackages: PackageResponse[];
  photographerPackages: PackageResponse[];
  photographerRatings: RatingResponse[];
}
export interface SubpackageRequest {
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  isInf?: boolean;
  repeatedDay?: string[];
  availableStartTime?: string;
  availableEndTime?: string;
  availableStartDay?: string;
  availableEndDay?: string;
}
export interface BusyTime {
  id: string;
  photographerId: string;
  type: BusyTimeType;
  startTime: string;
  endTime: string;
  isValid: boolean;
}
export interface SubpackageResponse {
  id: string;
  packageId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  isInf: boolean;
  repeatedDay: string[];
  availableStartTime: string;
  availableEndTime: string;
  availableStartDay: string;
  availableEndDay: string;
  busyTimes: BusyTime[];
  busyTimeMap: {[key: string]: BusyTime[]};
}

export interface BusyTimeRequest {
  type?: BusyTimeType;
  startTime?: string;
  endTime?: string;
  isValid?: boolean;
}

export interface BusyTimeStrictRequest {
  type: BusyTimeType;
  startTime: string;
  endTime: string;
  isValid: boolean;
}
export interface AppointmentRequest {
  startTime?: string;
  location?: string;
}
export interface AppointmentStrictRequest {
  startTime: string;
  location: string;
}
export interface AppointmentUpdateStatusRequest {
  status: AppointmentStatus;
}
export interface AppointmentResponse {
  id: string;
  customerId: string;
  photographerId: string;
  packageId: string;
  subpackageId: string;
  busyTimeId: string;
  status: AppointmentStatus;
  location: string;
  price: number;
}
export interface AppointmentDetail {
  id: string;
  packageId: string;
  subpackageId: string;
  customerId: string;
  photographerId: string;
  packageName: string;
  subpackageName: string;
  customerName: string;
  photographerName: string;
  price: number;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  location: string;
}
export interface CreateAppointmentResponse {
  appointment: AppointmentResponse;
  busyTime: BusyTime;
}
export interface RatingRequest {
  rating: number;
  review?: string;
}
export interface RatingResponse {
  id: string;
  customerId: string;
  photographerId: string;
  rating: number;
  review: string;
  createdTime: Date;
}
export interface PhotographerPayment {
  status: PaymentStatus;
  balanceTransactionId?: string;
}
export interface CustomerPayment {
  status: PaymentStatus;
  checkoutId?: string;
  paymentIntentId?: string;
}
export interface Payment {
  id: string;
  appointmentId: string;
  customer: CustomerPayment;
  photographer: PhotographerPayment;
}
export interface PaymentResponse {
  payment: Payment;
  appointment: AppointmentDetail;
  package: PackageResponse;
}

export interface PaymentURL {
  url: string;
}