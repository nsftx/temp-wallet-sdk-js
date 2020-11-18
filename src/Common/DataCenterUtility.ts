import { DataCenter } from './Enums';

export class DataCenterUtility {
  public parseDataCenter(value: string): DataCenter {
    let dc: DataCenter;

    switch (value) {
      case 'dc1_london':
        dc = DataCenter.UK;
        break;
      case 'dc2_serbia':
        dc = DataCenter.RS;
        break;
      case 'dc7_topbet':
        dc = DataCenter.RS2;
        break;
      case 'dc4_ro':
        dc = DataCenter.RO;
        break;
      case 'dc6_ro2':
        dc = DataCenter.RO2;
        break;
      default:
        dc = DataCenter.UK;
    }

    return dc;
  }
}
