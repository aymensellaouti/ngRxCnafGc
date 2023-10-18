import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { Observable, catchError, of, retry } from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable<Cv[]>;
  selectedCv: Cv | null = null;
  date = new Date();

  constructor(private toastr: ToastrService, private cvService: CvService) {
    this.cvs$ = this.cvService.getCvs().pipe(
      retry({
        delay: 1500,
        count: 4,
      }),
      /* Opérateur qui permet d'intercepter les erreurs */
      catchError((e) => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      })
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

  getSelectedCv(cv: Cv) {
    this.selectedCv = cv;
  }
}
