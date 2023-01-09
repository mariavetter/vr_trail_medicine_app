import BusinessObject from "./BusinessObject";

export default class Task1 extends BusinessObject{

	constructor(aduration, awrongtiles, aidrun){
		super()
        this.duration = aduration
		this.wrongtiles = awrongtiles
        this.idrun = aidrun	
    }

	getDuration() {
		return this.duration;
	}

    static fromJSON(task1) {
		let results = null;
		if (Array.isArray(task1)) {
			results = [];
			task1.forEach((x) => {
				Object.setPrototypeOf(x, Task1.prototype);
				results.push(x);
			})
		} else {
			let x = task1;
			Object.setPrototypeOf(x, Task1.prototype);
			results = x;
		}
		return results;
	}
}