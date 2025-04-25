import { test, Days, DaysAsWords } from './01_basic_types';

console.log('hello from TS', test);

console.log(Days.Tuesday, DaysAsWords.Tuesday);

for (const day of Object.values(DaysAsWords)) {
	console.log(day);
}
