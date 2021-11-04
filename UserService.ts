/**
 * Class which will be provided via Dependency injection
 */
export default class UserService {
  a: number = 1;

  public sayHello(): void {
    console.log("Boo 👻");
    console.log(this);
  }
}

/**
 * Class using the dependency
 */
class Component {
  constructor(public _us: UserService) {}
}

/**
 * Injectior class contains an array which holds the list of provided dependencies and its objects in a key-value pair structure
 * We will pass the list of classes in the constructor which we need to use in DI
 * We can also add a class to DI via the set method
 * get method will help us get/fetch the object of the class we need, so we won't need to create a new object
 */
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

// Creating object of injector and setting passing UserService in set method
const injector = new Injector();
injector.set(UserService);

/**
 * Creating an onject of component class and as we can see, we are not creating a new Object for UserService
 * rather we are getting the object that already exist in Injector class
 */
const component = new Component(injector.get(UserService));
component._us.sayHello();
