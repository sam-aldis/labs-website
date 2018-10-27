/*

Author: Sam Alds
Org : ukjp-labs
Email: samaldis@ukjp-labs.com
Description:
A Lightweight Router using Angular style passive Emmiters

*/
import {
	EventEmitter, Subscriber
} from './emitter';

namespace Router {


export type Paths = Array<{
	path : string;
	handler : Function;
	options? : Array<{}>
}>

export interface Router  {
	subscriber : Subscriber;
	paths : Paths;
	constructor(paths: Paths);
}

export class Router implements Router {
	public paths : Paths;
	public subscriber : Subscriber;
	constructor(paths : Paths) {
		this.paths = paths;
		this.subscriber = new Subscriber('locationUpdate');
	}

}
