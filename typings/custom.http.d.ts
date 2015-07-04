declare module "angular2/http" {
  /**
   * Creates `Request` instances with default values.
   *
   * The Request's interface is inspired by the Request constructor defined in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#request-class),
   * but is considered a static value whose body can be accessed many times. There are other
   * differences in the implementation, but this is the most significant.
   */
  class Request implements  IRequest {

    /**
     * Http method with which to perform the request.
     *
     * Defaults to GET.
     */
    method: RequestMethods;
    mode: RequestModesOpts;
    credentials: RequestCredentialsOpts;

    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class). <a href='/angular2/angular2/Headers'><code>Headers</code></a> class reference.
     */
    headers: Headers;

    /**
     * Url of the remote resource
     */
    url: string;

    /**
     * Returns the request's body as string, assuming that body exists. If body is undefined, return
     * empty
     * string.
     */
    text(): String;
  }


  /**
   * Creates `Response` instances with default values.
   *
   * Though this object isn't
   * usually instantiated by end-users, it is the primary object interacted with when it comes time to
   * add data to a view.
   *
   * #Example
   *
   * ```
   * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
   * ```
   *
   * The Response's interface is inspired by the Request constructor defined in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
   * can be accessed many times. There are other differences in the implementation, but this is the
   * most significant.
   */
  class Response implements  IResponse {

    /**
     * One of "basic", "cors", "default", "error, or "opaque".
     *
     * Defaults to "default".
     */
    type: ResponseTypes;

    /**
     * True if the response's status is within 200-299
     */
    ok: boolean;

    /**
     * URL of response.
     *
     * Defaults to empty string.
     */
    url: string;

    /**
     * Status code returned by server.
     *
     * Defaults to 200.
     */
    status: number;

    /**
     * Text representing the corresponding reason phrase to the `status`, as defined in [ietf rfc 2616
     * section 6.1.1](https://tools.ietf.org/html/rfc2616#section-6.1.1)
     *
     * Defaults to "OK"
     */
    statusText: string;

    /**
     * Non-standard property
     *
     * Denotes how many of the response body's bytes have been loaded, for example if the response is
     * the result of a progress event.
     */
    bytesLoaded: number;

    /**
     * Non-standard property
     *
     * Denotes how many bytes are expected in the final response body.
     */
    totalBytes: number;

    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     */
    headers: Headers;

    /**
     * Not yet implemented
     */
    blob(): Blob;

    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    json(): JSON;

    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    text(): string;

    /**
     * Not yet implemented
     */
    arrayBuffer(): ArrayBuffer;
  }


  /**
   * Performs http requests using `XMLHttpRequest` as the default backend.
   *
   * `Http` is available as an injectable class, with methods to perform http requests. Calling
   * `request` returns an
   * [Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md),
   * which will emit a single <a href='/angular2/angular2/Response'><code>Response</code></a> when a response is
   * received.
   *
   * #Example
   *
   * ```
   * import {Http, httpInjectables} from 'angular2/http';
   * @Component({selector: 'http-app', appInjector: [httpInjectables]})
   * @View({templateUrl: 'people.html'})
   * class PeopleComponent {
   *   constructor(http: Http) {
   *     http('people.json')
   *       // Call map on the response observable to get the parsed people object
   *       .map(res => res.json())
   *       // Subscribe to the observable to get the parsed people object and attach it to the
   *       // component
   *       .subscribe(people => this.people = people);
   *   }
   * }
   * ```
   *
   * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
   * <a href='/angular2/angular2/XHRBackend'><code>XHRBackend</code></a> in this case), which could be mocked with dependency injection by replacing
   * the <a href='/angular2/angular2/XHRBackend'><code>XHRBackend</code></a> binding, as in the following example:
   *
   * #Example
   *
   * ```
   * import {MockBackend, BaseRequestOptions, Http} from 'angular2/http';
   * var injector = Injector.resolveAndCreate([
   *   BaseRequestOptions,
   *   MockBackend,
   *   bind(Http).toFactory(
   *       function(backend, defaultOptions) {
   *         return new Http(backend, defaultOptions);
   *       },
   *       [MockBackend, BaseRequestOptions])
   * ]);
   * var http = injector.get(Http);
   * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
   * ```
   */
  class Http {

    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a <a href='/angular2/angular2/Request'><code>Request</code></a> instance. If the first argument is a url, an optional <a href='/angular2/angular2/RequestOptions'><code>RequestOptions</code></a>
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of <a href='/angular2/angular2/BaseRequestOptions'><code>BaseRequestOptions</code></a> before performing the request.
     */
    request(url: string | Request, options?: IRequestOptions): Rx.Observable<Response>;

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: IRequestOptions): any;

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): any;

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): any;

    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: IRequestOptions): any;

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: URLSearchParams | FormData | Blob | string, options?: IRequestOptions): any;

    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: IRequestOptions): any;
  }


  /**
   * Creates <a href='/angular2/angular2/XHRConnection'><code>XHRConnection</code></a> instances.
   *
   * This class would typically not be used by end users, but could be
   * overridden if a different backend implementation should be used,
   * such as in a node backend.
   *
   * #Example
   *
   * ```
   * import {Http, MyNodeBackend, httpInjectables, BaseRequestOptions} from 'angular2/http';
   * @Component({
   *   appInjector: [
   *     httpInjectables,
   *     bind(Http).toFactory((backend, options) => {
   *       return new Http(backend, options);
   *     }, [MyNodeBackend, BaseRequestOptions])]
   * })
   * class MyComponent {
   *   constructor(http:Http) {
   *     http('people.json').subscribe(res => this.people = res.json());
   *   }
   * }
   * ```
   */
  class XHRBackend implements  ConnectionBackend {
    createConnection(request: Request): XHRConnection;
  }


  /**
   * Creates connections using `XMLHttpRequest`. Given a fully-qualified
   * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
   * request.
   *
   * This class would typically not be created or interacted with directly inside applications, though
   * the <a href='/angular2/angular2/MockConnection'><code>MockConnection</code></a> may be interacted with in tests.
   */
  class XHRConnection implements  Connection {
    request: Request;

    /**
     * Response
     * [Subject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/subject.md)
     * which emits a single <a href='/angular2/angular2/Response'><code>Response</code></a> value on load event of `XMLHttpRequest`.
     */
    response: Rx.Subject<Response>;
    readyState: ReadyStates;

    /**
     * Calls abort on the underlying XMLHttpRequest.
     */
    dispose(): void;
  }


  /**
   * Injectable version of <a href='/angular2/angular2/RequestOptions'><code>RequestOptions</code></a>.
   *
   * #Example
   *
   * ```
   * import {Http, BaseRequestOptions, Request} from 'angular2/http';
   * ...
   * class MyComponent {
   *   constructor(baseRequestOptions:BaseRequestOptions, http:Http) {
   *     var options = baseRequestOptions.merge({body: 'foobar'});
   *     var request = new Request('https://foo', options);
   *     http.request(request).subscribe(res => this.bars = res.json());
   *   }
   * }
   *
   * ```
   */
  class BaseRequestOptions extends  RequestOptions {
  }


  /**
   * Creates a request options object with default properties as described in the [Fetch
   * Spec](https://fetch.spec.whatwg.org/#requestinit) to be optionally provided when instantiating a
   * <a href='/angular2/angular2/Request'><code>Request</code></a>. This class is used implicitly by <a href='/angular2/angular2/Http'><code>Http</code></a> to merge in provided request
   * options with the default options specified here. These same default options are injectable via
   * the <a href='/angular2/angular2/BaseRequestOptions'><code>BaseRequestOptions</code></a> class.
   */
  class RequestOptions implements  IRequestOptions {

    /**
     * Http method with which to execute the request.
     *
     * Defaults to "GET".
     */
    method: RequestMethods;

    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     */
    headers: Headers;

    /**
     * Body to be used when creating the request.
     */
    body: URLSearchParams | FormData | Blob | string;
    mode: RequestModesOpts;
    credentials: RequestCredentialsOpts;
    cache: RequestCacheOpts;

    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values.
     */
    merge(opts?: IRequestOptions): RequestOptions;
  }


  /**
   * Alias to the `request` method of <a href='/angular2/angular2/Http'><code>Http</code></a>, for those who'd prefer a simple function instead
   * of an object. In order to get TypeScript type information about the `HttpFactory`, the <a href='*'>IHttp</a> interface can be used as shown in the following example.
   *
   * #Example
   *
   * ```
   * import {httpInjectables, HttpFactory, IHttp} from 'angular2/http';
   * @Component({
   *   appInjector: [httpInjectables]
   * })
   * @View({
   *   templateUrl: 'people.html'
   * })
   * class MyComponent {
   *  constructor(@Inject(HttpFactory) http:IHttp) {
   *    http('people.json').subscribe(res => this.people = res.json());
   *  }
   * }
   * ```
   */
  function HttpFactory(backend: XHRBackend, defaultOptions: BaseRequestOptions): any;


  /**
   * Provides an interface to provide type information for <a href='/angular2/angular2/HttpFactory'><code>HttpFactory</code></a> when injecting.
   *
   * #Example
   *
   * ```
   * * import {httpInjectables, HttpFactory, IHttp} from 'angular2/http';
   * @Component({
   *   appInjector: [httpInjectables]
   * })
   * @View({
   *   templateUrl: 'people.html'
   * })
   * class MyComponent {
   *  constructor(@Inject(HttpFactory) http:IHttp) {
   *    http('people.json').subscribe(res => this.people = res.json());
   *  }
   * }
   * ```
   */
  interface IHttp {
  }

  interface IRequestOptions {
    method: RequestMethods;
    headers: Headers;
    body: URLSearchParams | FormData | Blob | string;
    mode: RequestModesOpts;
    credentials: RequestCredentialsOpts;
    cache: RequestCacheOpts;
  }

  interface IRequest {
    method: RequestMethods;
    mode: RequestModesOpts;
    credentials: RequestCredentialsOpts;
  }

  interface IResponse {
    headers: Headers;
    ok: boolean;
    status: number;
    statusText: string;
    type: ResponseTypes;
    url: string;
    totalBytes: number;
    bytesLoaded: number;
    blob(): Blob;
    arrayBuffer(): ArrayBuffer;
    text(): string;
    json(): Object;
  }

  interface Connection {
    readyState: ReadyStates;
    request: IRequest;
    response: Rx.Subject<IResponse>;
    dispose(): void;
  }

  interface ConnectionBackend {
    createConnection(observer: any, config: IRequest): Connection;
  }


  /**
   * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
   * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class). The only known
   * difference from the spec is the lack of an `entries` method.
   */
  class Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    forEach(fn: Function): any;
    get(header: string): string;
    has(header: string): any;
    keys(): any;
    set(header: string, value: string | List<string>): void;
    values(): any;
    getAll(header: string): Array<string>;
    entries(): any;
  }

  class URLSearchParams {
    paramsMap: Map<string, List<string>>;
    rawParams: string;
    has(param: string): boolean;
    get(param: string): string;
    getAll(param: string): List<string>;
    append(param: string, val: string): void;
    toString(): string;
    delete(param: any): void;
  }


  /**
   * Provides a basic set of injectables to use the <a href='/angular2/angular2/Http'><code>Http</code></a> service in any application.
   *
   * #Example
   *
   * ```
   * import {httpInjectables, Http} from 'angular2/http';
   * @Component({selector: 'http-app', appInjector: [httpInjectables]})
   * @View({template: '{{data}}'})
   * class MyApp {
   *   constructor(http:Http) {
   *     http.request('data.txt').subscribe(res => this.data = res.text());
   *   }
   * }
   * ```
   */
  var httpInjectables : List<any> ;

  enum RequestModesOpts {
    Cors,
    NoCors,
    SameOrigin
  }

  enum RequestCacheOpts {
    Default,
    NoStore,
    Reload,
    NoCache,
    ForceCache,
    OnlyIfCached
  }

  enum RequestCredentialsOpts {
    Omit,
    SameOrigin,
    Include
  }

  enum RequestMethods {
    GET,
    POST,
    PUT,
    DELETE,
    OPTIONS,
    HEAD,
    PATCH
  }

  enum ReadyStates {
    UNSENT,
    OPEN,
    HEADERS_RECEIVED,
    LOADING,
    DONE,
    CANCELLED
  }

  enum ResponseTypes {
    Basic,
    Cors,
    Default,
    Error,
    Opaque
  }
}