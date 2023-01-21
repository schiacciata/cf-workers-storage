import { IBaseClass, BaseClassOptions, getOptions, setOptions } from "../types/Base";

abstract class BaseManager implements IBaseClass {
    isEnabled: boolean;
    debug: boolean;
    context: ExecutionContext;
    constructor(options: BaseClassOptions) {
        this.isEnabled = options.isEnabled || true;
        this.debug = options.debug || false;
        this.context = options.context;
    };

    get(_opts: getOptions) {
        throw new Error('Not implemented');
    };

    set(_opts: setOptions<never>) {
        throw new Error('Not implemented');
    };
}

export default BaseManager;