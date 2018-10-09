import 'mocha';
import { expect } from 'chai';
import { HintPattern, EnumHintPattern } from '.././src/app/core/models';

function testPattern(pattern: HintPattern, text: string, testString: string): boolean {
	return new RegExp(pattern.compile(text), pattern.flags).test(testString);
}

describe('HintPattern', () => {

	describe('contains', () => {
		const contains = EnumHintPattern.CONTAINS;

		it('contains a', () => {
			expect(testPattern(contains, 'a', 'a')).to.be.true;
		});

		it('do not contains a', () => {
			expect(testPattern(contains, 'uehue huehueheuheu huehue', 'a')).to.be.false;
			expect(testPattern(contains, 'Auehue huehueheuheu huehue', 'a')).to.be.false;
		});

	});

});
