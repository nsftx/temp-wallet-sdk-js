import { each } from 'lodash';
import Betslip from './Betslip';

const barcodePrefix = 'XX';
const barcodeSalt = 'abcdef0000';

const barcodesMock: Array<[number, string]> = [
  [1000, 'XX1X8MTTR'],
  [1001, 'XX1LNTN3K'],
  [1002, 'XX1B3PQ0C'],
  [1003, 'XX0P53UV3'],
  [1004, 'XX0JUNLT8'],
  [1005, 'XX05V88S5'],
  [1006, 'XX04NBU8S'],
  [1007, 'XX1S8T1CA'],
  [1008, 'XX0KN73NE'],
  [1009, 'XX2F3SXQ1'],
  [1010, 'XX1PQX95B'],
  [1011, 'XX25BE4SV'],
  [1012, 'XX0A46HOD'],
  [1013, 'XX0SLO8TT'],
  [1014, 'XX1KL82GM'],
  [1015, 'XX1807997'],
  [1016, 'XX0QDUNB0'],
  [1017, 'XX1OJK1GT'],
  [1018, 'XX10OP0HB'],
  [1019, 'XX2N96H5L'],
  [1020, 'XX0E5QIRR'],
  [1021, 'XX0AEDK0A'],
  [1022, 'XX15TNJMH'],
  [1023, 'XX1QOXL89'],
  [1024, 'XX24GE0U1'],
  [1025, 'XX0VC78DB'],
  [1026, 'XX2LXO4HS'],
  [1027, 'XX21R2WBG'],
  [1028, 'XX179M18T'],
  [1029, 'XX07EOH1N'],
  [1030, 'XX0PCIJVT'],
  [1031, 'XX0EL96GW'],
  [1032, 'XX2MGSR9H'],
  [1033, 'XX08VR4J3'],
  [1034, 'XX1PD11CW'],
  [1035, 'XX29NGKR3'],
  [1036, 'XX0XT1KH4'],
  [1037, 'XX2DCPX0B'],
  [1038, 'XX05WT7P5'],
  [1039, 'XX0PNN77H'],
  [1040, 'XX1VWUBFG'],
  [1041, 'XX2ARCESF'],
  [1042, 'XX20VXNOQ'],
  [1043, 'XX0DPJTP3'],
  [1044, 'XX1W5IWRT'],
  [1045, 'XX0VP2TK6'],
  [1046, 'XX22NWUNX'],
  [1047, 'XX1K8QE63'],
  [1048, 'XX154A63L'],
  [1049, 'XX2I8J6LQ'],
  [1050, 'XX1JBW6WA'],
  [1051, 'XX1X7OUA3'],
  [1052, 'XX1KRVPD8'],
  [1053, 'XX1DFUKCS'],
  [1054, 'XX22EWN6F'],
  [1055, 'XX1HXDG97'],
  [1056, 'XX0DOP5BW'],
  [1057, 'XX2BUDVKR'],
  [1058, 'XX10BIMH5'],
  [1059, 'XX1T501I5'],
  [1060, 'XX0U7EJKS'],
  [1061, 'XX2H5REPX'],
  [1062, 'XX0ORBW7V'],
  [1063, 'XX113T8S7'],
  [1064, 'XX1G9P5DF'],
  [1065, 'XX1VQCE5V'],
  [1066, 'XX1SWQOWK'],
  [1067, 'XX2FBVC54'],
  [1068, 'XX1FPSA01'],
  [1069, 'XX0N39CCQ'],
  [1070, 'XX0TVQLVD'],
  [1071, 'XX1P6LIMT'],
  [1072, 'XX0DF2A4V'],
  [1073, 'XX0AJSKRI'],
  [1074, 'XX0GDU5M9'],
  [1075, 'XX2A7U8W1'],
  [1076, 'XX10XDHN2'],
  [1077, 'XX1UKXMSO'],
  [1078, 'XX0BR18LK'],
  [1079, 'XX1L3L46F'],
  [1080, 'XX0N6UKI0'],
  [1081, 'XX23CORTC'],
  [1082, 'XX00IODLC'],
  [1083, 'XX1R8VRG5'],
  [1084, 'XX2ITPWMR'],
  [1085, 'XX0ITDHI3'],
  [1086, 'XX0GQ0LVM'],
  [1087, 'XX2D54SMW'],
  [1088, 'XX1MFAG5A'],
  [1089, 'XX0BBCFOL'],
  [1090, 'XX2134FW2'],
  [1091, 'XX16LA5KQ'],
  [1092, 'XX24W56A7'],
  [1093, 'XX0QB66WC'],
  [1094, 'XX2D0AUPT'],
  [1095, 'XX0OSB8FD'],
  [1096, 'XX149ROQX'],
  [1097, 'XX26M13ND'],
  [1098, 'XX2EF914F'],
  [1099, 'XX2BPSL5M'],
];

describe('Betslip', () => {
  it('should be instanceable', () => {
    const betslip = new Betslip({
      barcodePrefix,
      barcodeSalt,
    });

    expect(betslip).toBeInstanceOf(Betslip);
  });

  it('should produce valid barcodes', (done) => {
    const betslip = new Betslip({
      barcodePrefix,
      barcodeSalt,
    });

    each(barcodesMock, (barcodeMock) => {
      const barcode = betslip.getBarcode(barcodeMock[0]);
      expect(barcode).toEqual(barcodeMock[1]);
    });

    done();
  });

  it('should produce valid ids', (done) => {
    const betslip = new Betslip({
      barcodePrefix,
      barcodeSalt,
    });

    each(barcodesMock, (barcodeMock) => {
      const id = betslip.getId(barcodeMock[1]);
      expect(id).toEqual(barcodeMock[0]);
    });

    done();
  });
});
