import { Component, Input, OnDestroy } from "@angular/core";
import { Cv } from "../model/cv";
import { EmbaucheService } from "../services/embauche.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-cv-card",
  templateUrl: "./cv-card.component.html",
  styleUrls: ["./cv-card.component.css"],
})
export class CvCardComponent implements OnDestroy {
  constructor(
    private embaucheService: EmbaucheService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
    this.cv$ = this.cvService.selectCv$.pipe(takeUntil(this.signal$));
  }

  @Input() cv: Cv | null = null;
  cv$: Observable<Cv>;
  private signal$ = new Subject();
  embaucher() {
    if (this.cv) {
      if (this.embaucheService.embauche(this.cv)) {
        this.toastr.success(
          `${this.cv?.firstname} ${this.cv?.name} a été pré embauché`
        );
      } else {
        this.toastr.warning(
          `${this.cv?.firstname} ${this.cv?.name} est déjà pré embauché`
        );
      }
    }
  }
  ngOnDestroy(): void {
    this.signal$.next("stop your subscription its over :S");
    this.signal$.complete();
  }
}
