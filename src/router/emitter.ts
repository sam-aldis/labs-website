/*
for future update to emitter
so that it can watch anything passed
to it.
export type UpdateType = {
	name : string
	bound : Object | string
}
*/
export namespace EventEmitter {
	// consts and enums for errors etc.
	export enum EventType {
		BIND_FAIL,
		NEW_DATA,
		BIND_OK,
		UPDATE_REQ,
		SUBSCRIBE_AGAIN,
	}
	// interfaces for classes if anyone wants to extend them
	export interface _Subscriber {
		emitter : Emitter;
		constructor(name: string);
	}
	export interface _Emitter {
		prop : Watched
		constructor(name : string);
		emit(ctx : Function) : Event;
		new? : SetConstructor;
		subscribe() : Promise<Update>;
	}
	// Types for the Emmiters and Recievers to share
	export type Watched = String  | Event | EventTarget;
	export type Update = {
		type : EventType;
		data : Object;
		extra? : {}
	};
	export class Emitter implements _Emitter{
		public prop: Watched;
		constructor(property: Watched) {
			this.prop = property;
		}
		toEvent(val) {
			if(typeof val === typeof String) {
				for(let i in UIEvent[val]) {

				}
			}
		}
		emit(ctx: Function) : Event {
			return new Event("locationUpdate", <EventInit>{location : window.location.hash});
		}
		subscribe() {
			try {
				if(typeof this.prop === typeof String){
					console.info("Watching an Evaluated String is SUPER Dangerous, I hope you know what your doing!");
					return new Promise<Update>((res,rej) => {
						let cur : string = <string>eval(<string>this.prop);
						let newval : string = cur;
						while(cur === newval){
							newval = eval(<string>this.prop)
						}
						let data : Update = {
							type : EventType.NEW_DATA,
							data : newval,
						}
					})
				}

				const sub = new Promise<Update>((res, reject) => {
					let current = this.prop.valueOf();
					let chash = this.prop.valueOf();
					while(current === chash) {
						chash =this.prop.valueOf();
					}
					let data : Update = {
						type : EventType.NEW_DATA,
						data : chash,
						extra : {
							status :  EventType.SUBSCRIBE_AGAIN
						}
					};
					res(data);
				});

			} catch(e) {
				return new Promise<Update>((res,rej)=>{
					let data : Update = {
						type : EventType.BIND_FAIL,
						data : "Unable to bind to specified Emitter"
					}
					rej(data);
				});
			}
		}
	}

	export class Subscriber implements _Subscriber {
		emitter : Emitter;
		constructor(name: string) {
			let forBind = new Emitter
			this.emitter = Emitter.bind(this);
			this.emitter.subscribe()
		}
		on() {

		}
	}
}

export class Subscriber extends EventEmitter.Subscriber {

}
export class Emitter extends EventEmitter.Emitter {

}
export const EventType = EventEmitter.EventType;
export type Update = EventEmitter.Update;
export type WatchedItem = EventEmitter.Watched;
