export class StyleClassObject {
  [className: string]: { // TODO (S.Panfilov) fix typing, it's gonna be StyleClass
    [propertyName: string]: string | Number
  }
}