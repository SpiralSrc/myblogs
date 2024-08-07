export interface ValidationResponse<T> {
  errors?: StringMap;
  success?: StringToBooleanMap;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}
