import { isNumber, isString, padStart } from 'lodash';
import { Skip32 } from '../Utility';
import { BetslipOptions } from './Interfaces';

const BASECONVERT_TO = 10;
const BASECONVERT_FROM = 34;

const baseConvert = (base: number | string, fromBase: number, toBase: number): string => {
  return parseInt(base.toString(), fromBase | 0).toString(toBase | 0);
};

class Betslip {
  private barcodeCypher: Skip32;

  private options: BetslipOptions;

  constructor(options: BetslipOptions) {
    if (!isString(options.barcodePrefix)) {
      throw new Error('BetslipBarcodeInvalidPrefixTypeError');
    }

    this.options = options;
    this.barcodeCypher = new Skip32(options.barcodeSalt);
  }

  public getBarcode(id: number): string {
    if (!isNumber(id)) {
      throw new Error('BetslipBarcodeInvalidIdTypeError');
    }

    const encryptedId = this.barcodeCypher.encrypt(id);
    const convertedId = baseConvert(encryptedId, BASECONVERT_TO, BASECONVERT_FROM).toUpperCase();
    const barcodeValue = padStart(convertedId, 7, '0');
    const barcode = `${this.options.barcodePrefix}${barcodeValue}`;

    return barcode;
  }

  public getBarcodePrefix(): string {
    return this.options.barcodePrefix;
  }

  public getId(barcode: string): number {
    if (!isString(barcode)) {
      throw new Error('BetslipBarcodeInvalidBarcodeTypeError');
    }

    const hashValue = barcode.substring(2);
    const hashConverted = baseConvert(hashValue, BASECONVERT_FROM, BASECONVERT_TO).toUpperCase();
    const id = this.barcodeCypher.decrypt(hashConverted);

    return id;
  }
}

export default Betslip;
