abstract class Component<T1, T2> {
  props: T1;
  state: T2;
  constructor(props: any) {
    this.props = props;
  }
  abstract render(): string;
}

interface ILog {
  getInfo(): string;
}
interface myComponentProps {
  value: number;
}
interface myComponentState {
  x: number;
}

class Mycomponent
  extends Component<myComponentProps, myComponentState>
  implements ILog
{
  constructor(props: any) {
    super(props);
  }
  render() {
    this.props.value;
    return `<myComponent />`;
  }
  getInfo() {
    return `组件：MyComponent，props：${this.props}，state：${this.state}`;
  }
}
const myComponents = new Mycomponent({ name: '我的组件' });
myComponents.render();
