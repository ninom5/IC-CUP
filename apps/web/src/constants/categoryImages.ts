import {
  coupeSvg,
  hatchbackSvg,
  sedanSvg,
  suvSvg,
  cabrioletSvg,
} from "@assets/images";
import { CarCategoryEnum } from "enums";

export const categoryImages: Record<CarCategoryEnum, string> = {
  COUPE: coupeSvg,
  SEDAN: sedanSvg,
  SUV: suvSvg,
  CABRIOLET: cabrioletSvg,
  HATCHBACK: hatchbackSvg,
};
