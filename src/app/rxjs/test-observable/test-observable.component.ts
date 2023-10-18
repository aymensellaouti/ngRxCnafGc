import { Component, OnDestroy } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription, filter, map, take } from "rxjs";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent implements OnDestroy {
  observable$: Observable<number>;
  subscribtion: Subscription = new Subscription();
  constructor(private toaster: ToastrService) {
    /* Cold Observable  */
    this.observable$ = new Observable((observer) => {
      let i = 5;
      const intervalIndex = setInterval(() => {
        if (!i) {
          observer.complete();
          clearInterval(intervalIndex);
        }
        /* La source de données est dans l'observable */
        observer.next(i--);
      }, 1000);
    });
    this.subscribtion.add(
      this.observable$
        /* 5 4 3 2 1 */
        .subscribe((val) => {
          console.log(val);
        })
    );
    /* 5 4 3 2 1 */
    this.subscribtion.add(
      this.observable$
        .pipe(
          map((valeur) => valeur * 3),
          /* 15 12 9 6 3 */
          filter((valeur) => valeur % 2 == 0),
          /* 12 6 */
          take(1)
          /* 12 */
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
        })
    );
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
