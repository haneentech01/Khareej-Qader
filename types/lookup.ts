/**
 * أنواع الـ Lookup data (بيانات القوائم المنسدلة).
 */

export interface Country {
  nationality: string;
  countryCode: string;
  iso: string;
}

export interface University {
  id: string | number;
  un_name: string;
  type: string;
}

export interface Major {
  id: string | number;
  name: string;
}

export interface CourseListItem {
  id: number;
  name: string;
  description: string;
}

export interface StateListItem {
  id: number;
  name: string;
  state_code: string;
  capital: string;
}
