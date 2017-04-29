import { Pipe, PipeTransform } from '@angular/core';
import { StringUtils } from '../.././core/utils';

/**
 * Defines a Sort Pipe for sorting an array values. If a single value
 * is supplied, the supplied value will be returned.
 *
 * Examples:
 * - [2, 3, 1] | sort                => [1, 2, 3]
 * - [2, 3, 1] | sort : 'asc'        => [1, 2, 3]
 * - [2, 3, 1] | sort : 'desc'       => [3, 2, 1]
 * - ['2', '3', '1'] | sort : 'asc'  => ['1', '2', '3']
 * - ['2', '3', '1'] | sort : 'desc' => ['3', '2', '1']
 *
 * **Complex types:**
 * If a Complex Type are supplied (i.e. different of number or string),
 * it'll be evaluated as a string, i.e., SortPipe will use their '.toString()' method.
 * This behavior can be changed specifing the sort argument.
 *
 * Given the following Complex Types (T) with properties 'label' and 'value', where:
 * - t1 = { label: 'a', value: 300 };
 * - t2 = { label: 'a', value: 200 };
 * - t3 = { label: 'b', value: 100 };
 *
 * Examples:
 * - [t2, t3, t1] | sort                              => [t2, t3, t1]
 * - [t2, t3, t1] | sort : 'label'                    => [t2, t1, t3]
 * - [t2, t3, t1] | sort : 'label:asc'                => [t2, t1, t3]
 * - [t2, t3, t1] | sort : 'label:desc'               => [t3, t2, t1]
 * - [t2, t3, t1] | sort : 'value:desc'               => [t3, t2, t1]
 * - [t2, t3, t1] | sort : ['label:asc', 'value:asc'] => [t2, t1, t3]
 */
@Pipe({
	name: 'sort',
	pure: false
})
export class SortPipe implements PipeTransform {

	private static ASC = 'asc';
	private static SEPARATOR = ':';
	private static PROPERTY_REGEXP = /^[a-z_]+$/i;
	private static ORDER_REGEXP = /^(?:asc|desc)$/i; // asc
	private static PROPERTY_ORDER_REGEXP = /^[a-z_]+:(?:asc|desc)$/i; // property:asc

	private static toComparator = (sortString: string) => {
		if (SortPipe.ORDER_REGEXP.test(sortString)) {
			return new Comparator(sortString === SortPipe.ASC ? 1 : -1);

		} else if (SortPipe.PROPERTY_REGEXP.test(sortString)) {
			return new Comparator(1, (target: any) => target[sortString]);

		} else if (SortPipe.PROPERTY_ORDER_REGEXP.test(sortString)) {
			let split = sortString.split(SortPipe.SEPARATOR);
			let compareArgument = split[0];
			let order = split[1];
			return new Comparator(order === SortPipe.ASC ? 1 : -1, (target: any) => target[compareArgument]);

		} else {
			throw new SortError('[Sort Pipe] The sort argument must be either "asc", "desc", "property"'
				+ ', "property:asc" or "property:desc');
		}
	};

	transform(input: any, sort: string | string[] = SortPipe.ASC): any {
		if (!input || !sort) {
			throw new SortError('[Sort Pipe] Either input or sort arguments are invalid.');
		} else if (!Array.isArray(input)) {
			return input;
		}

		let sortArray = Array.isArray(sort) ? sort : [sort];
		if (sortArray.length === 0) {
			return input;
		}

		let comparators = sortArray.map(SortPipe.toComparator);

		return input.sort((a, b) => {
			for (let comparator of comparators) {
				let result = comparator.compare(a, b);
				if (result !== 0) {
					return result;
				}
			}
			return 0;
		});
	}

}

class SortError extends Error {

}

class Comparator {

	private static DEFAULT_SUPPLIER = (target: any) => target;

	private static compareValues(a: number | string, b: number | string): number {
		if (StringUtils.isNumber(a) && StringUtils.isNumber(b)) {
			return a === b ? 0 : (Number(a) > Number(b) ? 1 : -1);
		} else {
			a = a.toString().trim().toLowerCase();
			b = b.toString().trim().toLowerCase();
			return a === b ? 0 : (a > b ? 1 : -1);
		}
	}

	constructor(private order: number, private supplier: (target: any) => any = Comparator.DEFAULT_SUPPLIER) {
		this.supplier = supplier;
		this.order = order;
	}

	compare(a: number | string, b: number | string): number {
		return Comparator.compareValues(this.supplier(a), this.supplier(b)) * this.order;
	}

}
