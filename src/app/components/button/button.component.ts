import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculatorService } from '../../services/calculator.service';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [AsyncPipe],
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  screenValue$: Observable<string>;

  constructor(
    private store: Store<{ calculator: number }>,
    private calculatorService: CalculatorService
  ) {
    this.screenValue$ = this.calculatorService.screenValue$;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const key = event.key;

    if (!isNaN(Number(key))) {
      this.calculatorService.onNumberClick(parseInt(key, 10));
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.calculatorService.onOperatorClick(key);
    } else if (key === '.') {
      this.calculatorService.onDecimalClick();
    } else if (key === 'Enter') {
      this.calculatorService.onOperatorClick('=');
    } else if (key === 'Escape') {
      this.calculatorService.onOperatorClick('AC');
    } else if (key === 'Backspace') {
      this.calculatorService.onOperatorClick('DEL');
    }
  }

  onNumberClick(number: number) {
    this.calculatorService.onNumberClick(number);
  }

  onOperatorClick(op: string) {
    this.calculatorService.onOperatorClick(op);
  }

  onDecimalClick() {
    this.calculatorService.onDecimalClick();
  }

  onReset() {
    this.calculatorService.onReset();
  }
}
