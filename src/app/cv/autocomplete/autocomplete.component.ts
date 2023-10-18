import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
  Observable,
  Subscription,
  debounceTime,
  from,
  mergeMap,
  of,
  switchMap,
  tap,
  throttleTime,
} from "rxjs";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent implements OnInit {
  form!: FormGroup;

  constructor(private cvService: CvService) {}
  ngOnInit(): void {
    this.form = new FormGroup({ name: new FormControl() });
    const nameInput = this.form.controls["name"];
    nameInput.valueChanges
      .pipe(
        debounceTime(500),
        tap((valeur) => console.log(valeur)),
        switchMap((chaine) => this.cvService.getCvsByName(chaine)),
        tap((valeur) => console.log(valeur))
      )
      .subscribe();
  }
}
