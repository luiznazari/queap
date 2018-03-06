import 'mocha';
import { expect } from 'chai';
import { HintPattern, EnumHintPattern } from '.././src/app/core/models';

function testPattern(pattern: HintPattern, text: string, testString: string): boolean {
	return new RegExp(pattern.compile(text), pattern.flags).test(testString);
}

describe('HintPattern', () => {

	describe('match', () => {

		it('contains', () => {
			let contains = EnumHintPattern.CONTAINS;
			expect(testPattern(contains, 'a', 'a')).to.be.true;
		});

	});

});
