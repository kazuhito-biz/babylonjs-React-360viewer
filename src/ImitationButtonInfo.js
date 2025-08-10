/**
 * 空間内へ表示するボタンへの表示情報
 */
export class ImitationButtonInfo {
  /**
   * ボタンへ表示するテキスト
   *
   * @type string
   */
  text;

  /**
   * ボタン押下時に表示するテキスト
   *
   * @type string
   */
  message;

  /**
   * ボタン表示位置のX座標
   *
   * @type int
   */
  x;

  /**
   * ボタン表示位置のY座標
   *
   * @type int
   */
  y;

  /**
   * コンストラクタ
   *
   * @param {string} text ボタンへ表示するテキスト
   * @param {string} message ボタン押下時に表示するテキスト
   * @param {int} x ボタン表示位置のX座標
   * @param {int} y ボタン表示位置のY座標
   */
  constructor(text, message, x, y) {
    this.text = text;
    this.message = message;
    this.x = x;
    this.y = y;
  }
}
