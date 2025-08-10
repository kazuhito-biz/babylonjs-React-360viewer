import {TransformNode, Vector3, Space} from "@babylonjs/core";
import {GUI3DManager, HolographicButton, SpherePanel} from "@babylonjs/gui";

/**
 * 空間内へ表示するボタン
 */
export class ImitationButton extends TransformNode {
  /**
   * ボタン表示用のパネル
   *
   * @type SpherePanel
   */
  panel;

  /**
   * コンストラクタ
   *
   * @param {string} name オブジェクト名
   * @param {Scene} scene シーン
   * @param {ImitationButtonInfo} imitationButtonInfo ボタンへ表示する情報
   */
  constructor(name, scene, imitationButtonInfo) {
    super(name, scene);

    let text = imitationButtonInfo.text;
    let message = imitationButtonInfo.message;
    let x = imitationButtonInfo.x;
    let y = imitationButtonInfo.y;

    let gui3DManager = new GUI3DManager(scene);

    // 縦方向は最大90度になるよう調整
    x = Math.max(Math.min(x, 90), -90) / 5.625;

    // 横方向は最大180度になるよう調整
    let absY = Math.abs(y);
    if (180 < absY) {
      y = 0 < y ? (-180 + (absY % 180)) : (180 - (absY % 180));
    }
    y = (y % 180) / 5.625;

    // 角度と移動量の計算
    let angle = Math.sqrt(x * x + y * y) / 10;
    let axis = new Vector3(x, y, 0);

    // 球形表示用のパネルを生成
    this.panel = new SpherePanel();
    this.panel.radius = 500;
    this.panel.margin = 0;
    gui3DManager.addControl(this.panel);

    // パネルへボタンを生成
    this.panel.blockLayout = true;
    let button = new HolographicButton("3D Button");
    button.text = text;
    button.scaling = new Vector3(50, 50, 50);
    button.onPointerClickObservable.add((e) => {
      alert(message);
    });
    this.panel.addControl(button);
    this.panel.blockLayout = false;

    // 角度の変更
    let pivot = new TransformNode("root");
    pivot.position = new Vector3(0, 0, 0);
    this.panel.node.parent = pivot;
    pivot.rotate(axis, angle, Space.WORLD);
  }

  dispose(doNotRecurse, disposeMaterialAndTextures) {
    super.dispose(doNotRecurse, disposeMaterialAndTextures);
    this.panel.dispose();
  }
}
