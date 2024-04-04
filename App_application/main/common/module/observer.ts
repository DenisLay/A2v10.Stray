export default class Observer {

    public source: string;

    public action: ((value: any) => {})

    public root: IRoot;

    update(value: any) {

    }
}