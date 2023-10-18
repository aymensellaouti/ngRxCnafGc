import { Component } from "@angular/core";
import { Observable, from, of, tap, timer } from "rxjs";

@Component({
  selector: "app-from-of",
  templateUrl: "./from-of.component.html",
  styleUrls: ["./from-of.component.css"],
})
export class FromOfComponent {
  from$: Observable<any>;
  of$: Observable<any>;
  timeout$: Observable<number>;
  interval$: Observable<number>;
  constructor() {
    this.from$ = from([1, 2, 3]);
    this.from$.subscribe((val) => console.log(val));
    this.of$ = of([1, 2, 3]);
    this.of$.subscribe((val) => console.log(val));
    this.timeout$ = timer(1000).pipe(tap((x) => console.log("timout " + x)));
    this.interval$ = timer(0, 1000).pipe(
      tap((x) => console.log("interval " + x))
    );
    /*     this.timeout$.subscribe();
    this.interval$.subscribe(); */
  }
}
