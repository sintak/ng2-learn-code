/**
 * 为T类型对象添加一个editing属性
 */
export class EditItem<T> {
  editing: boolean;
  constructor (public item: T) {}
}
