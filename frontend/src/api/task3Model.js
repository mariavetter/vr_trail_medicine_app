import BusinessObject from "./BusinessObject";

export default class Task3 extends BusinessObject{

	constructor(aduration, awrongAssignment, aidrun){
		super()
        this.duration = aduration
        this.wrongAssignment = awrongAssignment
        this.idrun = aidrun	
    }

	getDuration() {
		return this.duration;
	}

    static fromJSON(task3) {
		let results = null;
		if (Array.isArray(task3)) {
			results = [];
			task3.forEach((x) => {
				Object.setPrototypeOf(x, Task3.prototype);
				results.push(x);
			})
		} else {
			let x = task3;
			Object.setPrototypeOf(x, Task3.prototype);
			results = x;
		}
		return results;
	}
}