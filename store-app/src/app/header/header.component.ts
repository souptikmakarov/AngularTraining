import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {
  @Input() text: string;
  today = Date.now();
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("HeaderComponent ngOnChanges() ", changes);
  }

}
