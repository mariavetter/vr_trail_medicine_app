import BusinessObject from "./BusinessObject";

export default class Run extends BusinessObject{

	constructor(adate, auser_iduser){
		super();
        this.date = adate
        this.user_iduser = auser_iduser
    }

	getDate() {
		return this.date;
	}

	setDate(adate) {
		this.date = adate;
	}

	getUserId() {
		return this.date;
	}

	setUserId(auser_iduser) {
		this.user_iduser = auser_iduser;
	}

    static fromJSON(run) {
		let results = null;
		if (Array.isArray(run)) {
			results = [];
			run.forEach((x) => {
				Object.setPrototypeOf(x, Run.prototype);
				results.push(x);
			})
		} else {
			let x = run;
			Object.setPrototypeOf(x, Run.prototype);
			results = x;
		}
		return results;
	}
}