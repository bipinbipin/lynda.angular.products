import { Component, OnInit } from '@angular/core';
import { trigger,state, style, transition, animate, keyframes} from '@angular/animations'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('productsAnim', [
      state('active', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({transform: 'translateX(-30px)', opacity: '0'}),
        animate('700ms ease-in-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in-out', style({transform: 'translateX(-30px)', opacity: '0'}))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {

  products = [
    {"title": 'USB Car Charger', "description": 'My Description here'},
    {"title": 'iPhone Charger', "description": 'My Description here'},
    {"title": 'Jump Drive', "description": 'My Description here'},
    {"title": 'Wireless Mouse', "description": 'My Description here'}
  ]

  title: string = '';
  description: string = '';
  state = 'active';
  
  addProduct(value:any) {
    // PUSH TO ARRAY
    this.products.push({'title': value.title, 'description': value.description})
    
    // CLEAR THE INPUTS
    this.title = '';
    this.description = '';
  }

  removeProduct(product) {
    this.products.splice(product, 1);
  }



  
  constructor() { }

  ngOnInit() {
  }

}
