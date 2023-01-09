import BusinessObject from "./BusinessObject";

export default class User extends BusinessObject{

	constructor(aname, aage){
		super();
        this.name = aname
        this.age = aage	
    }

	getName() {
		return this.name;
	}

	setName(aName) {
		this.name = aName;
	}

	getAge() {
		return this.age;
	}

	setAge(aAge) {
		this.age = aAge;
	}

    static fromJSON(user) {
		let results = null;
		if (Array.isArray(user)) {
			results = [];
			user.forEach((x) => {
				Object.setPrototypeOf(x, User.prototype);
				results.push(x);
			})
		} else {
			let x = user;
			Object.setPrototypeOf(x, User.prototype);
			results = x;
		}
		return results;
	}
}