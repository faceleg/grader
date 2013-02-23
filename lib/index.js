(function(exports){

    var A = 4;
        B = 3,
        C = 2,
        D = 1;

    function calculateMaintainabilityGrade(maintainability) {
        if (maintainability > 29) {
            return A;
        }
        if (maintainability > 19) {
            return B;
        }
        if (maintainability > 9) {
            return C;
        }
        return D;
    }

    function calculateCyclomaticGrade(cyclomatic) {
        if (cyclomatic < 11) {
            return A;
        }
        if (cyclomatic < 21) {
            return B;
        }
        if (cyclomatic < 51) {
            return C;
        }
        return D;
    }

    function calculateBugGrade(bugs) {
        if (bugs <= 0.7) {
            return A;
        }
        if (bugs <= 1.5) {
            return B;
        }
        if (bugs <= 2) {
            return C;
        }
        return D;
    }

    function calculateJSHintGrade(jsHint, lLoc) {
        var errorsPerLine = 0;

        if (jsHint.length) {
            errorsPerLine = jsHint.length / lLoc;
        }
        if (errorsPerLine <= 0.1) {
            return A;
        }
        if (errorsPerLine <= 0.25) {
            return B;
        }
        if (errorsPerLine <= 0.4) {
            return C;
        }
        return D;
    }

    function calculateAggregateGrade(cyclomatic, maintainability, bugs, jshint) {
        return (cyclomatic + maintainability + bugs + jshint) / 4;
    }

    /**
     * @param  {Object} report
     * @return {Object} Overall & individual letter & decimal grades
     */
    function calculateGrades(report) {
        var cyclomatic = calculateCyclomaticGrade(report.complexity.aggregate.complexity.cyclomatic),
            maintainability = calculateMaintainabilityGrade(report.complexity.maintainability),
            bugs = calculateBugGrade(report.complexity.aggregate.complexity.halstead.bugs);
            jshint = calculateJSHintGrade(report.jshint, report.complexity.aggregate.complexity.sloc.logical);

        var aggregate = calculateAggregateGrade(cyclomatic, maintainability, bugs, jshint);

        return {
            aggregate: {
                raw: aggregate,
                letter: this.letterGradeFromNumeric(aggregate)
            },
            cyclomatic: {
                raw: cyclomatic,
                letter: this.letterGradeFromNumeric(jshint)
            },
            maintainability: {
                raw: maintainability,
                letter: this.letterGradeFromNumeric(maintainability)
            },
            bugs: {
                raw: bugs,
                letter: this.letterGradeFromNumeric(bugs)
            },
            jshint: {
                raw: jshint,
                letter: this.letterGradeFromNumeric(jshint)
            }
        };
    }

    function letterGradeFromNumeric(numericGrade) {
        if (numericGrade <= A) {
            return 'A';
        }
        if (numericGrade <= B) {
            return 'B';
        }
        if (numericGrade <= C) {
            return 'C';
        }
        return 'D';
    }

    module.exports = {
        calculateGrades: calculateGrades,
        letterGradeFromNumeric: letterGradeFromNumeric,
        calculateAggregateGrade: calculateAggregateGrade
    };

})(typeof exports === 'undefined' ? this.grader = {} : exports);
