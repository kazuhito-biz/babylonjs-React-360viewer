import {Axis, Space, TransformNode, Vector3} from "@babylonjs/core";
import {GUI3DManager, HolographicButton} from "@babylonjs/gui";

/**
 * 空間内へ表示するボタン
 */
export class ImitationButton extends TransformNode {
  /**
   * ボタンを表示する半径
   *
   * @type {number}
   */
  static RADIUS = 500;

  /**
   * ボタンの大きさ
   *
   * @type {number}
   */
  static SCALE = 50;

  /**
   * ボタン表示用のコンポーネント
   *
   * @type HolographicButton
   */
  button;

  /**
   * コンストラクタ
   *
   * @param {string} name オブジェクト名
   * @param {Scene} scene シーン
   * @param {ImitationButtonInfo} imitationButtonInfo ボタンへ表示する情報
   */
  constructor(name, scene, imitationButtonInfo) {
    super(name, scene);
    let gui3DManager = new GUI3DManager(scene);

    // ボタン表示内容を取得
    let text = imitationButtonInfo.text;
    let message = imitationButtonInfo.message;

    // ボタン描画に必要な情報を取得
    let yawAngle = imitationButtonInfo.x;
    let pitchAngle = imitationButtonInfo.y;

    // ボタンの描画
    this.button = new HolographicButton("3D Button");
    gui3DManager.addControl(this.button);
    this.button.text = text;
    this.button.scaling = new Vector3(ImitationButton.SCALE, ImitationButton.SCALE, ImitationButton.SCALE);
    this.button.position = this.getPosition(yawAngle, pitchAngle);
    this.button.node.lookAt(Vector3.Zero());
    this.button.node.rotate(Axis.Y, Math.PI, Space.LOCAL);
    this.button.onPointerClickObservable.add((e) => {
      alert(message);
    });
  }

  /**
   * 球体上に表示するためのボタンの表示位置を取得
   *
   * @param {number} yawAngle 左右角度
   * @param {number} pitchAngle 上下角度
   * @returns {Vector3} ボタンの表示位置
   */
  getPosition(yawAngle, pitchAngle) {
    // 正規化された上下と左右の角度情報を取得
    let yaw = this.getRadian(this.getNormalizeAngle180(yawAngle));
    let pitch = this.getRadian(this.getClamp90(pitchAngle));

    // 三角関数が適用された角度情報を計算
    let cosPitch = Math.cos(pitch);
    let sinPitch = Math.sin(pitch);
    let sinYaw = Math.sin(yaw);
    let cosYaw = Math.cos(yaw);

    // 最終的な角度情報を計算
    let x = ImitationButton.RADIUS * cosPitch * sinYaw;
    let y = ImitationButton.RADIUS * sinPitch;
    let z = ImitationButton.RADIUS * cosPitch * cosYaw;
    return new Vector3(x, y, z);
  }

  /**
   * ラジアン角を取得
   *
   * @param {number} angle 元の角度
   * @returns {number} ラジアン角
   */
  getRadian(angle) {
    return angle * Math.PI / 180;
  }

  /**
   * 与えられた角度を180度に収まるように補正した値を取得
   *
   * @param {number} angle 元の角度
   * @returns {number} 補正された角度
   */
  getNormalizeAngle180(angle) {
    return (((angle + 180) % 360) - 180);
  }

  /**
   * 与えられた角度を90度に制限した値を取得
   *
   * @param {number} angle 元の角度
   * @returns {number} 制限された角度
   */
  getClamp90(angle) {
    return Math.max(Math.min(angle, 90), -90);
  }

  dispose(doNotRecurse, disposeMaterialAndTextures) {
    super.dispose(doNotRecurse, disposeMaterialAndTextures);
    this.button.dispose();
  }
}
