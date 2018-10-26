
/*
for future update to emitter
so that it can watch anything passed
to it.
export type UpdateType = {
	name : string
	bound : Object | string
}
*/
export const _BIND_FAIL = "BIND_FAIL"
export interface Emitter {
	name : string;
	constructor(name : string);
	emit(ctx : Function) : Event;
	new? : SetConstructor;
	subscribe() : Promise<Update>;
}
export type Update = {
	type : string;
	data : Object;
};
export class Emitter implements Emitter{
	public name: string;
	constructor(name: string) {
		this.name = name;
	}
	emit(ctx: Function) : Event {
		return new Event("locationUpdate", <EventInit>{location : window.location.hash});
	}
	subscribe() {
		if(this.name === "locationUpdate") {
			const hash = window.location.hash;
			const sub = new Promise<Update>((res, reject) => {
				let chash = window.location.hash;
				while(hash === chash) {
					chash = window.location.hash;
				}
				let data : Update = {
					type : 'locationUpdate',
					data : chash
				};
				res(data);
			});

		} else {
			return new Promise<Update>((res,rej)=>{
				let data : Update = {
					type : _BIND_FAIL,
					data : "Unable to bind to specified Emitter"
				}
				rej(data);
			});
		}
	}
}
export type Paths = Array<{
	path : string;
	handler : Function;
	options? : Array<{}>
}>

export interface Subscriber {
	emitter : Emitter;
	constructor(name: string);
	recieve()

}
export class Subscriber implements Subscriber {
	emitter : Emitter;
	constructor(name: string) {
		this.emitter = new Emitter(name);
	}
	on
}
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
