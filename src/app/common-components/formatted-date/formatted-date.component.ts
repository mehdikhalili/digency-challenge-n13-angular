import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formatted-date',
  templateUrl: './formatted-date.component.html',
  styleUrls: ['./formatted-date.component.css']
})
export class FormattedDateComponent implements OnInit {

  @Input() date: Date | undefined

  constructor() { }

  ngOnInit(): void {
  }

  get formattedDate(): string {
    if (this.date) {
      const date = new Date(this.date)
      let month: any = date.getMonth() + 1
      month = month >= 10 ? month : '0'+ month
      return date.getDate() + '/' + month + '/' + date.getFullYear()
    } else {
      return 'NONE'
    }
  }

}
