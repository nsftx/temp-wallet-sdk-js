export class DateTimeUtil {
  public static getUnixTimestamp(): number {
    return Math.round((new Date()).getTime() / 1000);
  }
}
