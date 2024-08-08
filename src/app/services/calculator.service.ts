import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { addition, subtraction, multiplication, division, reset } from '../actions/calculator.action';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private screenValueSubject = new BehaviorSubject<string>('0'); // Store as string
  screenValue$ = this.screenValueSubject.asObservable();
  private currentOperator: string = '';
  private operand1: number | null = null;
  private hasDecimal: boolean = false;

  constructor(private store: Store<{ calculator: number }>) {
    // Subscribe to store changes to update screen value
    this.store.select('calculator').subscribe(value => {
      this.updateScreenValue(value.toString());
    });
  }

  onNumberClick(number: number) {
    const currentValue = this.screenValueSubject.value;
    const newValue = (currentValue === '0' || this.currentOperator) ? number.toString() : currentValue + number.toString();
    this.updateScreenValue(newValue);
    this.hasDecimal = false;
  }

  onOperatorClick(op: string) {
    if (op === '=') {
      if (this.currentOperator && this.operand1 !== null) {
        const operand2 = parseFloat(this.screenValueSubject.value);
        this.store.dispatch(this.getActionForOperator(this.currentOperator, this.operand1, operand2));
        this.currentOperator = '';
        this.operand1 = null;
        this.hasDecimal = false;
      }
    } else if (op === 'AC') {
      this.store.dispatch(reset());
      this.updateScreenValue('0');
      this.currentOperator = '';
      this.operand1 = null;
      this.hasDecimal = false;
    } else if (op === 'DEL') {
      const currentValue = this.screenValueSubject.value;
      this.updateScreenValue(currentValue.length > 1 ? currentValue.slice(0, -1) : '0');
    } else {
      if (this.operand1 === null) {
        this.operand1 = parseFloat(this.screenValueSubject.value);
      } else {
        this.onOperatorClick('=');
      }
      this.currentOperator = op;
      this.hasDecimal = false;
      this.updateScreenValue(this.screenValueSubject.value + ' ' + op + ' ');
    }
  }

  onDecimalClick() {
    if (!this.hasDecimal) {
      const currentValue = this.screenValueSubject.value;
      this.updateScreenValue(`${currentValue}.`);
      this.hasDecimal = true;
    }
  }

  private updateScreenValue(value: string) {
    this.screenValueSubject.next(value);
  }

  private getActionForOperator(operator: string, num1: number, num2: number) {
    switch (operator) {
      case '+':
        return addition({ num1, num2 });
      case '-':
        return subtraction({ num1, num2 });
      case '*':
        return multiplication({ num1, num2 });
      case '/':
        return division({ num1, num2 });
      default:
        return reset(); // Fallback action
    }
  }

  onReset() {
    this.updateScreenValue('0');
    this.currentOperator = '';
    this.operand1 = null;
    this.hasDecimal = false;
  }
}
