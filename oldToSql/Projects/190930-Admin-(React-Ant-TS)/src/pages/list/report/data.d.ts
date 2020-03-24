export interface System {
  errMsg: string,
  brand: string,
  model: string,
  pixelRatio: number,
  screenWidth: number,
  screenHeight: number,
  windowWidth: number,
  windowHeight: number,
  statusBarHeight: number,
  language: string,
  system: string,
  version: string,
  fontSizeSetting: string,
  platform: string,
  SDKVersion: string,
  windowTop: number,
  windowBottom: number,
}

export interface Version {
  prod: string,
  dev: string,
}

export interface ReportType {
  _id: string;
  system: System;
  phone: string;
  version: Version;
  module: string;
  exception: any;
  createdAt: string;
}
