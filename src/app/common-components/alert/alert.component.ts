import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message: string = '';
  @Input() color: string = '';

  type: string = '';

  types: ITypes = {
    success:'Success',
    info: 'Info',
    warning: 'Warning',
    danger: 'Error'
  }

  constructor() { }

  ngOnInit(): void {
    this.type = this.types[this.color as keyof ITypes];
  }

}

interface ITypes {
  success: string,
  info: string,
  warning: string,
  danger: string
}
