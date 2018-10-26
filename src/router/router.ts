

interface Emitter {
	name : string;
	constructor(name : string);
	emit(ctx : Function) : Event;
	new : Function;
	subscribe() : Promise<string>;
}

class Emitter implements Emitter{
	public name: string;
	constructor(name: string) {
		this.name = name;
	}
	emit(ctx: Function) : Event {
		return new Event("locationUpdate", <EventInit>{location : window.location.hash});
	}
	subscribe() {
		const hash = window.location.hash;
		return new Promise<string>((res, reject) => {
			let chash = window.location.hash;
			while(hash === chash) {
				chash = window.location.hash;
			}
			res(chash);
		});
	}
}

interface Router  {
	constructor()
}
