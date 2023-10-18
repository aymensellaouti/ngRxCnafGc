import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { Observable, combineLatest, map, tap, timer } from "rxjs";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent {
  @Input() time = 1000;
  images: string[] = [
    "404.png",
    "as.jpg",
    "cv.png",
    "rotating_card_profile.png",
    "rotating_card_profile2.png",
    "rotating_card_profile3.png",
  ];
  images$: Observable<Photo[]>;
  slider$!: Observable<string>;
  constructor(private http: HttpClient) {
    /* Flux renvoyant un tableau de Photos */
    this.images$ = this.http.get<Photo[]>(
      "https://jsonplaceholder.typicode.com/photos"
    );
    /* 0  1  2  3  4  5  6  7  8  ... */
    //this.slider$ = timer(0, this.time).pipe(
    /*       tap((x) => console.log("apres timer:" + x)),
     */
    //map(
    /*   (index) => this.images[index % (this.images.length - 1)]
      ) */
    /* 404.png as.jpg cv.png ... */
    /*       tap((valeur) => console.log("apres timer:" + valeur))
     */
    //);
    this.slider$ = combineLatest([this.images$, timer(0, this.time)]).pipe(
      /*  tap(([images, index]) => console.log({ images, index })), */
      map(([images, index]) => images[index % (images.length - 1)].url)
    );
  }
}
