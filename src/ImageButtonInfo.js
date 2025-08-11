/**
 * 表示する画像の情報
 */
export class ImageButtonInfo {
  /**
   * ボタンへ表示するテキスト
   *
   * @type string
   */
  text;

  /**
   * 画像ファイルの名前
   *
   * @type string
   */
  file_name;

  /**
   * コンストラクタ
   *
   * @param {string} text ボタンへ表示するテキスト
   * @param {string} file_name 画像ファイルの名前
   */
  constructor(text, file_name) {
    this.text = text;
    this.file_name = file_name;
  }
}