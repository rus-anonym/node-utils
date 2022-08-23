class UtilsLogical {
    /**
     * Logical AND
     * Conjunction
     * Logical multiplication, the expression "AND"
     * The conjunction returns true only when both arguments are true, otherwise false
     *
     * @param {boolean} a - First value
     * @param {boolean} b - Second value
     * @returns {boolean} - Result
     * @example
     * logical.AND(true, true) // => true
     * logical.AND(true, false); // => true
     * logical.AND(false, false); // => false
     * logical.AND(false, true); // => true
     */
    public AND(a: boolean, b: boolean): boolean {
        return a && b;
    }

    /**
     * Logical OR
     * Disjunction.
     * Logical addition, the expression "OR". Also called "weak disjunction".
     * Returns false only when both arguments are false, otherwise true.
     *
     * @param {boolean} a - First value
     * @param {boolean} b - Second value
     * @returns {boolean} - Result
     * @example
     * logical.OR(true, true) // => true
     * logical.OR(true, false); // => true
     * logical.OR(false, false); // => false
     * logical.OR(false, true); // => true
     */
    public OR(a: boolean, b: boolean): boolean {
        return a || b;
    }

    /**
     * Logical ANOT
     * Returns true only when both arguments are true, otherwise false
     *
     * @param {boolean} a - First value
     * @param {boolean} b - Second value
     * @returns {boolean} - Result
     * @example
     * logical.ANOT(true, true) // => true
     * logical.ANOT(true, false); // => false
     * logical.ANOT(false, true); // => false
     * logical.ANOT(false, false); // => false
     */
    public ANOT(a: boolean, b: boolean): boolean {
        return a === true && b === true;
    }

    /**
     * Logical NOR
     * Otherwise Pierce's arrow, the expression "NOR"
     * Returns true only when both arguments are simultaneously false
     *
     * @param {boolean} a - First value
     * @param {boolean} b - Second value
     * @returns {boolean} - Result
     * @example
     * logical.NOR(true, true) // => false
     * logical.NOR(true, false); // => false
     * logical.NOR(false, false); // => true
     * logical.NOR(false, true); // => false
     */
    public NOR(a: boolean, b: boolean): boolean {
        return a === false && b === false;
    }

    /**
     * Logical exclusive XOR
     * Strong disjunction
     * Exclusive disjunction, "XOR" expression.
     * Returns true only when only one is true and the other is false.
     *
     * @param {boolean} a - First value
     * @param {boolean} b - Second value
     * @returns {boolean} - Result
     * @example
     * logical.XOR(true, true) // => false
     * logical.XOR(true, false); // => true
     * logical.XOR(false, false); // => false
     * logical.XOR(false, true); // => true
     */
    public XOR(a: boolean, b: boolean): boolean {
        return a ? !b : b;
    }

    /**
     * Logical NOT
     * Denial
     * Inversion, negation, "NOT" expression.
     * Returns the opposite value: for false - true, for true - false.
     *
     * @param {boolean} a - First value
     * @returns {boolean} - Result
     * @example
     * logical.NOT(true) // => false
     * logical.NOT(false); // => true
     */
    public NOT(a: boolean): boolean {
        return !a;
    }

    /**
     * Logical EQ
     * Equivalence
     * Identity, equality, "EQ" expression.
     * Returns true only when both arguments are equal to false or true at the same time.
     *
     * @param {boolean} a - First value
     * @param {boolean} b - Second value
     * @returns {boolean} - Result
     * @example
     * logical.EQ(true, true) // => false
     * logical.EQ(true, false); // => false
     * logical.EQ(false, false); // => true
     * logical.EQ(false, true); // => true
     */
    public EQ(a: boolean, b: boolean): boolean {
        return a === b;
    }

    /**
     * Logical IMP
     * Implication
     * Expresses the dependence of cause and effect.
     * That is, it returns false only when the first argument is true and the second argument is false.
     *
     * @param {boolean} a - First value
     * @param {boolean} b - Second value
     * @returns {boolean} - Result
     * @example
     * logical.IMP(true, true) // => true
     * logical.IMP(true, false); // => false
     * logical.IMP(false, false); // => true
     * logical.IMP(false, true); // => true
     */
    public IMP(a: boolean, b: boolean): boolean {
        return a === true && b === false ? false : true;
    }
}

export default UtilsLogical;
