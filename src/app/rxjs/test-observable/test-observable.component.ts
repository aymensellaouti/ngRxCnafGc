import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent {
  observable$: Observable<number>;
  constructor(private toaster: ToastrService) {
    this.observable$ = new Observable((observer) => {
      let i = 5;
      const intervalIndex = setInterval(() => {
        if (!i) {
          observer.complete();
          clearInterval(intervalIndex);
        }
        observer.next(i--);
      }, 1000);
    });
    this.observable$
      /* 5 4 3 2 1 */
      .subscribe((val) => {
        console.log(val);
      });
    /* 5 4 3 2 1 */
    this.observable$
      .pipe(
        map((valeur) => valeur * 3)
        /* 15 12 9 6 3 */
      )
      .subscribe({
        next: (x) => {
          this.toaster.info("" + x);
        },
        error: (e) => {
          this.toaster.error(e);
        },
        complete: () => {
          this.toaster.warning("Fin du flux");
        },
      });
  }
}
