import { NappJS } from './napp';

export { NappJS } from './napp'
export { NappJSService, NappJSScript } from './model'

export const NewNappJS = config => {
    return new NappJS();
};