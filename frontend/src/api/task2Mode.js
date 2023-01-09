import BusinessObject from "./BusinessObject";

export default class Task2 extends BusinessObject{

	constructor(aduration, awrongtiles, adurationTiletoTile, aidrun){
		super()
        this.duration = aduration
        this.wrongtiles = awrongtiles
		this.durationTiletoTile = adurationTiletoTile
        this.idrun = aidrun	
    }

	getDuration() {
		return this.duration;
	}
	
	getWrongTiles() {
		return this.wrongtiles;
	}	

	getDurationTiletoTile() {
		return this.durationTiletoTile;
	}	

    static fromJSON(task2) {
		let results = null;
		if (Array.isArray(task2)) {
			results = [];
			task2.forEach((x) => {
				Object.setPrototypeOf(x, Task2.prototype);
				results.push(x);
			})
		} else {
			let x = task2;
			Object.setPrototypeOf(x, Task2.prototype);
			results = x;
		}
		return results;
	}
}