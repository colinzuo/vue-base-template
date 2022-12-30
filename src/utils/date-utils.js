export class DateUtils {
  static convertIsoStringToDisplay(dateIsoStr) {
    if (!dateIsoStr) {
      return '';
    }

    return `${dateIsoStr.slice(5, 10)} ${dateIsoStr.slice(11, 19)}`;
  }
}
