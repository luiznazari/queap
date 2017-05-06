/** The Queap Application constants */
interface QueapApp {

	/** Define the application's enviroment properties. */
	properties: any;

}

declare const queap: QueapApp;
declare module "queap" {
    export = queap;
}

interface Event {

	/**
	 * Cancels and prevent this event from propagating.
	 */
	stop(): void;

}

interface Map<K, V> {

	/**
	 * Applies a function against an accumulator each element in the map and return a single result.
	 * 
	 * @param reducingFunction Function to execute on each element on each entry in the map,
	 * 			taking two arguments: <br><ul>
	 * 			<li><b>accumulator:</b> The accumulator accumulates the reducingFunction's return values;
	 * 				it is the accumulated value previously returned in the last invocation
	 * 				of the reducingFunction, or initialValue, if supplied.</li>
	 * 			<li><b>currentValue:</b> The current element being processed in the map.</li></ul>
	 * @param initialValue [Optional] Value to use as the first argument to the first call of the
	 * 			reducingFunction. If no initial value is supplied, the first element in the map will be
	 * 			used.
	 * @return a single result with the accumulator's final value.
	 */
	reduce<R>(reducingFunction: (accumulator: R, currentValue: V) => R, initialValue?: R): R;

	/**
	 * Applies a function against an accumulator and each entry in the map and return an array as result.
	 * 
	 * @param reducingFunction Function to execute on each element on each entry in the map, taking
	 * 			two arguments:<br><ul>
	 * 			<li><b>accumulator:</b> The accumulator accumulates the reducingFunction's return values;
	 * 				it is the accumulated value previously returned in the last invocation
	 * 				of the reducingFunction, or initialValue, if supplied.</li>
	 * 			<li><b>currentValue:</b> The current element being processed in the map's entry.</li></ul>
	 * @param initialValue [Optional] Value to use as the first argument to the first call of each
	 * 			entry in the reducingFunction. If no initial value is supplied, the first element
	 * 			in the map's entry will be used.
	 * @return an array containing each entry accumulator's final value.
	 */
	reduceValues<R>(reducingFunction: (accumulator: R, currentValue: V) => R, initialValue?: R): R[];

	/**
	 * Transforms this map into an array, concatenating all values.
	 * 
	 * @return an array containing all map's values.
	 */
	toArray(): V[];

}

interface Array<T> {

	/**
	 * Transforms this list into a map grouping the elements by an grouping function.
	 * 
	 * @param groupingFunction: Function used to create a key based on an element,
	 * 			taking one argument:<br><ul>
	 * 			<li><b>element:</b> The current element being processed in the array.</li></ul>
	 * @return the resulting map of applying the groupingFunction at every element in the array.
	 */
	groupBy<K>(groupingFunction: (element: T) => K): Map<K, T>;

}

interface log {

	info(msg: string): void;

	warn(msg: string): void;

    error(msg: string): void;

}

/**
 * Test a variable and return it's boolean value.
 * 
 * @param b the variable to be tested
 * @return true if the variable is true, 'true', 1 or '1', false otherwise.
 */
declare function parseBoolean(b: any): boolean;
