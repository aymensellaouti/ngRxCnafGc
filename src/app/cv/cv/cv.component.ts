import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import {
  Observable,
  catchError,
  distinctUntilChanged,
  map,
  of,
  retry,
  share,
} from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable<Cv[]>;
  juniors$: Observable<Cv[]>;
  seniors$: Observable<Cv[]>;
  date = new Date();
  /* nbClick = 0; */
  constructor(
    /* private toastr: ToastrService */ private cvService: CvService
  ) {
    /* this.cvService.selectCv$.subscribe(() => this.nbClick++); */
    this.cvs$ = this.cvService.getCvs().pipe(
      /* share(), */
      retry({
        delay: 1500,
        count: 4,
      }),
      /* Opérateur qui permet d'intercepter les erreurs */
      catchError((e) => {
        /* this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`); */
        return of(this.cvService.getFakeCvs());
      })
    );
    this.juniors$ = this.cvs$.pipe(
      map((cvs) => cvs.filter((cv) => cv.age < 40))
    );
    this.seniors$ = this.cvs$.pipe(
      map((cvs) => cvs.filter((cv) => cv.age >= 40))
    );
    /* .subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    }); */
  }
}
