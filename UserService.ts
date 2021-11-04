export default class UserService {
  a: number = 1;

  public sayHello(): void {
    console.log("Boo 👻");
    console.log(this);
  }
}

class Component {
  constructor(public _us: UserService) {}
}

// Dependency Injection

class Injector {
  private _container = new Map();

  constructor(private _providers: any[] = []) {
    _providers.forEach((service) =>
      this._container.set(service, new service())
    );
  }

  get(service: any) {
    const serviceInstance = this._container.get(service);
    if (!serviceInstance) {
      throw Error("No Providers Found 😢");
    }
    return serviceInstance;
  }

  set(service: any) {
    this._container.set(service, new service());
  }
}

// How it will work?

const injector = new Injector();
injector.set(UserService);
const component = new Component(injector.get(UserService));
component._us.sayHello();
