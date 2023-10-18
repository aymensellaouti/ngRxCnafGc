import { Component } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  scan,
  takeWhile,
} from "rxjs";
import { ProductService } from "../services/product.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
export interface ApiResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Settings {
  limit: number;
  skip: number;
}

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  setting = { limit: 12, skip: 0 };
  products$!: Observable<Product[]>;
  settings$: BehaviorSubject<Settings> = new BehaviorSubject(this.setting);
  constructor(private productService: ProductService) {
    /* Concat  */
    /* il faut un type d'observable qui me déclenche à la demande un nouveau flux */
    /* Au click sur le bouton on va déclencher une nouvelle donnée dans le flux */
    /* Pour arreter le flux avec takeWhill */
    this.products$ = this.settings$.pipe(
      concatMap((setting) => this.productService.getProducts(setting)),
      map((apiResponse) => apiResponse.products),
      takeWhile((products) => !!products.length),
      takeUntilDestroyed(),
      scan((oldProducts, newProducts) => [...oldProducts, ...newProducts])
    );
  }

  more() {
    this.setting.skip += this.setting.limit;
    this.settings$.next(this.setting);
  }
}
