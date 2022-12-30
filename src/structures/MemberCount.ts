class MemberCount {
	current: number | null = null;
	previous: number | null = null;
	// "previous" is only used for reporting checks
	// inside the ready.ts event

	incrementCurrent() {
		if (this.current) this.current++;
	}
	decrementCurrent() {
		if (this.current) this.current--;
	}
	setCurrent(input: number | null) {
		this.current = input;
	}

	setPrevious(input: number | null) {
		this.previous = input;
	}
}

export { MemberCount };
