import * as React from 'react';

interface IState {
    months: string[],
    currentMonthNum: number | null;
    currentYear: number | null;
}

class MonthSelectorDropdown extends React.Component<any, any> {
    
    public state: IState = {
        months: [],
        currentMonthNum: null,
        currentYear: null
    }
    
	constructor(props) {
		super(props);

        this.state.currentMonthNum = props.state.user.lastBudgetState.monthSelector.month;
        this.state.currentYear = props.state.user.lastBudgetState.monthSelector.year;
        this.state.months = this.arrangeMonthsForDropdown(this.getMonthsForDropdown());
	}
    
	public render() {

        const { months } = this.state;

		return (
			<section className="MonthSelectorDropdown">
                <button className="btn-caret MonthSelectorDropdown__caret-btn js-caret-btn--left" onClick={this.scrollMonthDropdown}>
                    <i className="fa fa-caret-left" />
                </button>
                {months.map((month: any, i) => {
                    return this.MonthDropdownSelectBox(month)
                })}
                <button className="btn-caret MonthSelectorDropdown__caret-btn js-caret-btn--right" onClick={this.scrollMonthDropdown}>
                    <i className="fa fa-caret-right" />
                </button>
            </section>
		);
    }

    public scrollMonthDropdown = (event) => {
        if (event.target.classList.contains('js-caret-btn--right')) {
            this.arrangeMonthsForDropdown(this.getMonthsForDropdown(), 'next');
        } else if (event.target.classList.contains('js-caret-btn--left')) {
            this.arrangeMonthsForDropdown(this.getMonthsForDropdown(), 'prev');
        } else {
            console.warn('Error with month selector next/prev buttons');
        }
    }

    private arrangeMonthsForDropdown(months, direction?: string) {
        try {
            if (direction) {
                const currentFirstDropdownMonth: any = this.state.months[0],
                    monthsCopy = months.map(m => m);
                let indexOfCurrentFirst = months.findIndex(month => {
                    return month.month === currentFirstDropdownMonth.month && month.year === currentFirstDropdownMonth.year;
                });
    
                if (indexOfCurrentFirst === 0 && direction === 'prev') {
                    return;
                } else if (indexOfCurrentFirst === 12 && direction === 'next') {
                    return;
                }
    
                if (direction === 'next') {
                    indexOfCurrentFirst++;
                    
                } else if (direction === 'prev') {
                    indexOfCurrentFirst--;
                }
    
                const newMonths = monthsCopy.splice(indexOfCurrentFirst, 7);
                this.setState({months: newMonths});
            } else {
                const selectedIndex = months.findIndex(month => month.selected === true),
                    newMonths = months.filter(month => month.selected === true),
                    {after, indexAfter} = addAfter(selectedIndex + 1, 3),
                    {before, indexBefore} = addBefore(selectedIndex - 3, 3)

                let k = 0;
                while (before.length < 3 && k < (3 - before.length)) {
                    const month = addAfter(indexAfter + k, 1);
                    const monthToAdd = month.after[0];
                    after.push(monthToAdd);
                    k++;
                }

                let j = 0;
                while (after.length < 3 && j < (3 - after.length)) {
                    const month = addBefore(indexBefore + (after.length + j), 1);
                    const monthToAdd = month.before[0];
                    before.splice(j, 0, monthToAdd);
                    j++;
                }
                
                after.forEach(month => newMonths.push(month));
                before.reverse().forEach(month => newMonths.unshift(month));
                return newMonths;
            }
        } catch(err) {
            console.warn('Error with month selector carousel ::', err);
        }

        function addAfter(index, increment) {
            return {
                after: months.slice(index, index + increment),
                indexAfter: index + increment
            };
        }

        function addBefore(index, increment) {
            if (index < 0) {
                increment = increment + index;
                index = 0;
            }
            return {
                before: months.slice(index, index + increment),
                indexBefore: index - increment
            }
        }
    }

    private getMonthsForDropdown() {
        const { months, state } = this.props,
            { month: selectedMonth, year: selectedYear} = state.user.lastBudgetState.monthSelector,
            monthsForDropdown: any = [],
            signUpDate: Date = new Date(state.user.signupDate),
            currentDate: Date = new Date();

        // add current month and 6 future months
        let monthNumToAddA = currentDate.getMonth(),
            toNextYear = false;
        for (let i = 0; i < 7; i++) {
            if (monthNumToAddA > 11) {
                monthNumToAddA = 0;
                toNextYear = true;
            };
            monthsForDropdown.push({
                month: months[monthNumToAddA],
                year: toNextYear ? currentDate.getFullYear() + 1 : currentDate.getFullYear(),
                selected: false,
                current: i === 0 ? true : false,
                future: i > 0 ? true : false,
                monthNum: monthNumToAddA
            })
            monthNumToAddA++;
        }

        // add previous months (up to 12 months)
        let monthsToBeAdded = 12;
        if (currentDate.getFullYear() - signUpDate.getFullYear() === 0) {
            monthsToBeAdded = 0;
        }
        monthsToBeAdded = monthsToBeAdded + (currentDate.getMonth() - signUpDate.getMonth());
        if (monthsToBeAdded > 12) {
            monthsToBeAdded = 12;
        }

        // loop as many times as there are monthsToBeAdded, and add the month and year to the array
        let monthNumToAddB = currentDate.getMonth() - 1,
            toPrevYear = false;
        for (let i = 0; i < monthsToBeAdded; i++) {
            if (monthNumToAddB < 0) {
                monthNumToAddB = 11; // December is month 11 in the 0 based array
                toPrevYear = true;
            }
            monthsForDropdown.unshift({
                month: months[monthNumToAddB],
                year: toPrevYear ? currentDate.getFullYear() - 1 : currentDate.getFullYear(),
                selected: false,
                current: false,
                monthNum: monthNumToAddB
            });
            monthNumToAddB--;
        }

        return monthsForDropdown.map(obj => {
            if (obj.month === months[selectedMonth] && obj.year === selectedYear) {
                obj.selected = true;
            }
            return obj;
        });
    }

    private MonthDropdownSelectBox(month) {
        const monthAbbreviation = month.month.slice(0, 3);
        let className = month.selected ? 'MonthSelectorDropdown__month-box month-box--selected' : 'MonthSelectorDropdown__month-box';
        if (month.future) {
            className = className += ' month-box--future'
        }
        return (
            <div className={className} onClick={this.monthSelectBoxClickHandler} data-month-num={month.monthNum} key={month.month + month.year} >
                <span className="month-box__month">{monthAbbreviation}</span>
                <span className="month-box__year">{month.year}</span>
            </div>
        )
    }

    private monthSelectBoxClickHandler = (event) => {
        this.props.setMonthSelectorMinimizedState();
        this.props.methods.financial.changeMonth(event);
    }
}

export default MonthSelectorDropdown;
